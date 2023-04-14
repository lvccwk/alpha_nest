import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFollowedTeacherDto } from './dto/create-followedTeachers.dto';
import { UpdateFollowedTeacherDto } from './dto/update-followedTeachers.dto';
import { FollowedTeacher } from './entities/followedTeachers.entity';

@Injectable()
export class FollowedTeachersService {
	constructor(private prisma: PrismaService) {}
	async create(createFollowedTeacherDto: CreateFollowedTeacherDto): Promise<string> {
		let bookmarkDetail = await this.prisma.followedTeachers.create({
			data: {
				user_id: createFollowedTeacherDto.user_id,
				teacher_id: createFollowedTeacherDto.teacher_id
			}
		});
		console.log(bookmarkDetail);
		return JSON.stringify(bookmarkDetail);
	}

	async findAll(user_id): Promise<FollowedTeacher[]> {
		return await this.prisma.followedTeachers.findMany({
			where: {
				user_id: user_id
			},
			include: {
				teacher: true,
				user: true
			}
		});
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.followedTeachers.findUnique({
			where: { id },
			include: {
				teacher: true,
				user: true
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updateFollowedTeacherDto: UpdateFollowedTeacherDto) {
		let foundCartDetail = await this.prisma.followedTeachers.update({
			where: { id },
			data: {
				user_id: updateFollowedTeacherDto.user_id,
				teacher_id: updateFollowedTeacherDto.teacher_id
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return ` Cart: #${id} info has been updated`;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.followedTeachers.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return `Cart:#${id} has been deleted`;
		// return deletedUser;
	}
}
