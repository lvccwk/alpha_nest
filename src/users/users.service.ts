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
		// const user = await this.prisma.users.findMany();
		// return user;
		return await this.prisma.users.findMany({
			include: {
				subject: true,
				product: true,
				purchase_history: true,
				cart: true,
				teacher: true,
				timetable: true,
				product_rating: true,
				chartoom: true,
				chatoom_participant: true,
				private_message: true
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
				chartoom: true,
				chatoom_participant: true,
				private_message: true
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
		// return foundUser;
	}

	async remove(id: number) {
		let deletedUser = await this.prisma.users.delete({ where: { id } });
		if (!deletedUser) throw new NotFoundException('User not found!');
		return `#${id} user has been deleted`;
		// return deletedUser;
	}
}
