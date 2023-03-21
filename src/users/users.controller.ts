import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.remove(id);
	}

	@Post('/logout')
	async logout(@Body() reqData: { email: string; password: string }): Promise<any> {
		const user = await this.usersService.login({
			email: reqData.email,
			password: reqData.password
		});

		if (!user) {
			// Create a user
		}

		// 1. Get a User.id, email, username by email

		// 2. Make a JWT

		return user;
	}

	@Post('/login')
	async login(@Body() reqData: { email: string; password: string }): Promise<any> {
		const user = await this.usersService.login({
			email: reqData.email,
			password: reqData.password
		});

		if (!user) {
			// Create a user
		}

		// 1. Get a User.id, email, username by email

		// 2. Make a JWT

		return user;
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

		if (!user) {
			// Create a user
		}

		// 1. Get a User.id, email, username by email

		// 2. Make a JWT

		return user;
	}
}
