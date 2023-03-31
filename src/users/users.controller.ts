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
	Logger,
	Request,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { generate } from 'rxjs';
import { UserRegister } from 'src/model/user-register';
import { JwtAuthGuard, Public } from '../../utils/jwt-auth.guard';

import e, { Response } from 'express';
import * as jwtSimple from 'jwt-simple';
import { JwtService } from '@nestjs/jwt';
import { request } from 'http';

// AWS S3 Upload
import { initFormidable } from '../../upload/upload';
import IncomingForm from 'formidable/Formidable';
import { uploadToS3 } from '../../upload/aws-s3-upload';
import fs from 'fs';
import { File } from 'formidable';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AuthGuard } from './auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
	logger = new Logger('HTTP');

	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}
	// @UseGuards(JwtAuthGuard)

	// @UseGuards(AuthGuard('jwt'))
	@Get('/all')
	async findAll(@Request() req): Promise<User[]> {
		// const x = req.user.id;
		return await this.usersService.findAll();
	}

	// @UseGuards(AuthGuard('jwt'))
	@UseGuards(AuthGuard)
	@Get('/')
	findOne(@Request() req: any) {
		// return req.user;
		return this.usersService.findOne(req.user.id);
	}

	@UseGuards(AuthGuard)
	@Put('/')
	update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(req.user.id, updateUserDto);
	}

	@UseGuards(AuthGuard)
	@Delete('/:id')
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

			let user: User = await this.usersService.findByEmail(profileData.email);
			console.log({ profileData });
			if (!user) {
				user = await this.usersService.create({
					user_type: 'student',
					username: profileData.name,
					email: profileData.email,
					password: '',
					image: profileData.picture.data.url,
					is_deleted: false
				});
			}
			const payload = {
				id: user.id,
				username: user.username,
				email: user.email,
				image: user.image
			};
			console.log({
				payload
			});
			const token = jwtSimple.encode(payload, process.env.JWT_SECRET);
			return res.status(HttpStatus.OK).json({
				id: user.id,
				token: token
			});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}

	@Post('/file')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file, @Body() body, @Res() res: Response) {
		const fileName = file.originalname;
		try {
			// 	console.log('form');
			// 	const form: IncomingForm = initFormidable();
			// 	console.log('form1');

			// 	form.parse(req, async (err, fields, files) => {
			// 		req.body = fields;
			// 		// console.log({fields})
			// 		console.log({ files });

			// 		let file: File = Array.isArray(files.test123) ? files.test123[0] : files.test123;
			// 		let fileName = file ? file.newFilename : undefined;

			// 		// // Upload file to AWS S3

			// add timestamp in file name
			const accessPath = await uploadToS3({
				Bucket: 'alphafile',
				Key: `${fileName}`,
				ContentType: `${file.mimetype}`,
				Body: file.buffer
			});
			console.log(accessPath);
			res.json({ accessPath: accessPath });
			// 	});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}
}
