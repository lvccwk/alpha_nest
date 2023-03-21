import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto): Promise<string> {
		let foundUser = await this.prisma.users.create({
			data: {
				user_type: createUserDto.user_type,
				username: createUserDto.username,
				email: createUserDto.email,
				password: createUserDto.password,
				image: createUserDto.image
			}
		});
		console.log(foundUser);

		return 'ok';
	}

	async findAll(): Promise<User[]> {
		return await this.prisma.users.findMany({
			include: {
				subject: true,
				product: true,
				purchase_history: true,
				cart: true,
				teacher: true,
				timetable: true,
				product_rating: true,
				chatroom: true,
				chatroom_participant: true,
				private_message_from_user: true,
				private_message_to_user: true
			}
		});
	}

	async findOne(id: number) {
		let foundUser = await this.prisma.users.findUnique({
			where: { id },
			include: {
				subject: true,
				product: true,
				purchase_history: true,
				cart: true,
				teacher: true,
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
				image: updateUserDto.image
			}
		});
		if (!foundUser) throw new NotFoundException('User not found!');
		return `#${id} user info has been updated`;
	}

	async remove(id: number) {
		let deletedUser = await this.prisma.users.delete({ where: { id } });
		if (!deletedUser) throw new NotFoundException('User not found!');
		return `#${id} user has been deleted`;
	}

	async login(data: { email: string; password: string }) {
		return await this.prisma.users.findFirst({
			where: data
		});
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
