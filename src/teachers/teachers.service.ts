import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTeacherDto } from './dto/create-teachers.dto';
import { UpdateTeacherDto } from './dto/update-teachers.dto';
import { Teacher } from './entities/teachers.entity';
import { Teachers, Prisma } from '@prisma/client';
let a: Prisma.TeachersCreateInput
@Injectable()
export class TeachersService {
	constructor(private prisma: PrismaService) {}
	async create(createTeacherDto: CreateTeacherDto): Promise<Teachers> {
		console.log(createTeacherDto);
		let teacher = await this.findByUserId(createTeacherDto.user_id);
		
		try{
			if (!teacher){
				let teacher = await this.prisma.teachers.create({
					data: {
						// rating: null,
						user_id: createTeacherDto.user_id,
						info: createTeacherDto.info
					}
				});
	
				console.log(teacher);
			}

	
			return teacher;
		} catch (e) {
			console.log(e);
		}
		
	}

	async findByUserId(user_id: number) {
		let foundTeacher = await this.prisma.teachers.findUnique({
			where: { user_id },
			include: {
				user: true
			}
		});
		//if (!foundTeacher) throw new NotFoundException('Subject not found!');
		return foundTeacher;
	}

	async findAll(): Promise<Teacher[]> {
		// const user = await this.prisma.users.findMany();
		// return user;
		return await this.prisma.teachers.findMany({
			include: {
				user: true,
				teacher_subject: true,
				product: true
			}
		});
	}

	async findOne(id: number) {
		let foundSubject = await this.prisma.teachers.findUnique({
			where: { id },
			include: {
				user: true
			}
		});
		if (!foundSubject) throw new NotFoundException('Subject not found!');
		return foundSubject;
	}

	async update(id: number, updateTeacherDto: UpdateTeacherDto) {
		let foundUser = await this.prisma.teachers.update({
			where: { id },
			data: {
				user_id: updateTeacherDto.user_id,
				info: updateTeacherDto.info,
				rating: updateTeacherDto.rating
			}
		});
		if (!foundUser) throw new NotFoundException('User not found!');
		return ` subject: #${id} info has been updated`;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedUser = await this.prisma.teachers.delete({ where: { id } });
		if (!deletedUser) throw new NotFoundException('User not found!');
		return `subject:#${id} has been deleted`;
		// return deletedUser;
	}
}
