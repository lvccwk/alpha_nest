import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async create(createUserDto: CreateUserDto): Promise<Users> {
		console.log({
			user_type: createUserDto.user_type,
			username: createUserDto.username,
			email: createUserDto.email,
			password: createUserDto.password,
			image: createUserDto.image,
			is_deleted: createUserDto.is_deleted
		});

		let foundUser = await this.prisma.users.create({
			data: {
				user_type: createUserDto.user_type,
				username: createUserDto.username,
				email: createUserDto.email,
				password: createUserDto.password,
				image: createUserDto.image,
				is_deleted: createUserDto.is_deleted,

				cart: {
					create: {}
				}
			}
		});
		console.log(foundUser);

		return foundUser;
	}

	async findAll(): Promise<User[]> {
		return await this.prisma.users.findMany({
			include: {
				followed_teachers: true,
				product: true,
				purchase_history: true,
				cart: true,
				timetable: true,
				product_rating: true,
				chatroom: true,
				chatroom_participant: true,
				private_message_from_user: true,
				private_message_to_user: true
			}
		});
	}

	async findByEmail(email: string) {
		let foundUser = await this.prisma.users.findUnique({
			where: { email }
		});
		// if (!foundUser) throw new NotFoundException('User not found!');
		return foundUser;
	}

	async findUnique(id: number) {
		let foundUser = await this.prisma.users.findUnique({
			where: { id },
			include: {
				followed_teachers: { include: { teacher: true } }
			}
		});
		if (!foundUser) throw new NotFoundException('User not found!');
		return foundUser;
	}

	async findOne(id: number) {
		let foundUser = await this.prisma.users.findUnique({
			where: { id },
			include: {
				followed_teachers: true,
				product: true,
				purchase_history: true,
				cart: true,
				timetable: true,
				product_rating: true,
				chatroom: true,
				chatroom_participant: true,
				private_message_from_user: true,
				private_message_to_user: true
			}
		});
		if (!foundUser) throw new NotFoundException('User not found!');
		return foundUser;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		let foundUser = await this.prisma.users.update({
			where: { id },
			data: {
				user_type: updateUserDto.user_type,
				username: updateUserDto.username,
				email: updateUserDto.email,
				password: updateUserDto.password,
				image: updateUserDto.image,
				is_deleted: updateUserDto.is_deleted
			}
		});
		if (foundUser) {
			console.log('yesUSER', foundUser);
		} else {
			console.log('noUSER');
		}
		if (!foundUser) throw new NotFoundException('User not found!');
		return `#${id} user info has been updated`;
	}

	async remove(id: number) {
		let deletedUser = await this.prisma.users.delete({ where: { id } });
		if (!deletedUser) throw new NotFoundException('User not found!');
		return `#${id} user has been deleted`;
	}

	async login(data: { email: string; password: string }) {
		const user = await this.prisma.users.findFirst({
			where: data
		});

		if (user) {
			const payLoad = {
				id: user.id,
				username: user.username
			};
			const token = this.jwtService.sign(payLoad, {
				secret: process.env.JWT_SECRET
			});
			return token;
		}
		return '';
	}

	async register(data: {
		user_type: string;
		username: string;
		email: string;
		password: string;
		image: string;
	}) {
		return await this.prisma.users.create({
			data: {
				user_type: data.user_type,
				username: data.username,
				email: data.email,
				password: data.password,
				image: data.image
			}
		});
	}
}
