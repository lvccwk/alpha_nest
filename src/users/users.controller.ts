import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	Res,
	UseGuards,
	Req,
	NotFoundException,
	HttpStatus,
	Put,
	Logger
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { generate } from 'rxjs';
import { UserRegister } from 'src/model/user-register';
import { JwtAuthGuard, Public } from '../../utils/jwt-auth.guard';

import { Response } from 'express';
import jwt from '../../utils/jwt';
import * as jwtSimple from 'jwt-simple';

@ApiTags('users')
@Controller('users')
export class UsersController {
	logger = new Logger('HTTP');

	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}
	// @UseGuards(JwtAuthGuard)
	@Public()
	@Get()
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	@Put('/:id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		console.log('called update username');
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.remove(id);
		// return id;
	}

	@Post('/register')
	async register(
		@Body()
		reqData: {
			user_type: string;
			username: string;
			email: string;
			password: string;
			image: string;
		}
	): Promise<any> {
		const user = await this.usersService.register({
			user_type: reqData.user_type,
			username: reqData.username,
			email: reqData.email,
			password: reqData.password,
			image: reqData.image
		});

		return user;
	}

	// @Post('/register')
	// async register(@Body() userRegister: UserRegister) {
	// 	return await this.usersService.register(userRegister);
	// }

	@Post('/login')
	async login(@Body() reqData: { email: string; password: string }): Promise<any> {
		const token = await this.usersService.login({
			email: reqData.email,
			password: reqData.password
		});

		console.log('token :', token);
		// if (!user) {
		// 	// Create a user
		// }

		// const token = jwtSimple.encode(payLoad, jwt.jwtSecret);
		// console.log(token);
		// 1. Get a User.id, email, username by email

		// 2. Make a JWT

		return token;
	}

	@Post('login/facebook')
	async loginFacebook(@Body() req: any, @Res() res: Response) {
		try {
			if (!req.code) {
				return res.status(HttpStatus.UNAUTHORIZED).json({ msg: 'Wrong Code!' });
			}
			const { code } = req;
			const fetchResponse = await fetch(`https://graph.facebook.com/oauth/access_token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					client_id: `${process.env.FACEBOOK_CLIENT_ID}`,
					client_secret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
					code: `${code}`,
					redirect_uri: `${process.env.REACT_PUBLIC_HOSTNAME}/facebook-callback`
				})
			});
			const data = await fetchResponse.json();
			if (!data.access_token) {
				return res
					.status(HttpStatus.UNAUTHORIZED)
					.json({ msg: 'Failed to get access token!' });
			}
			const profileResponse = await fetch(
				`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${data.access_token}`
			);
			const profileData = await profileResponse.json();

		  let user:User = await this.usersService.findByEmail(profileData.email); 
		  console.log({profileData})
		  if (!user) {
			user = await this.usersService.create({
				user_type: "student",
				username: profileData.name,
				email: profileData.email,
				password: "",
				image: profileData.picture.data.url,
				is_deleted: false
			}); 
		  } 
		  const payload = {
			id: user.id,
			username: user.username,
			email: user.email,
			image: user.image,
			
		  };
		  console.log({
			payload
		})
		  const token = jwtSimple.encode(payload, jwt.jwtSecret); 
		  return res.status(HttpStatus.OK).json({
			payload: payload,
			token: token,
		  });
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}
}
