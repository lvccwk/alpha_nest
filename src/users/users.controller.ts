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
	Put
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { generate } from 'rxjs';
import { UserRegister } from 'src/model/user-register';
import { JwtAuthGuard, Public } from '../../utils/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
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
}
