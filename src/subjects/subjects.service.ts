import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateSubjectDto } from './dto/create-subjects.dto';
import { UpdateSubjectDto } from './dto/update-subjects.dto';
import { Subject } from './entities/subjects.entity';

@Injectable()
export class SubjectsService {
	constructor(private prisma: PrismaService) {}
	async create(createSubjectDto: CreateSubjectDto): Promise<string> {
		let subject = await this.prisma.subjects.create({
			data: {
				name: createSubjectDto.name,
				chinese_name: createSubjectDto.chinese_name,
				user_id: createSubjectDto.user_id
			}
		});
		console.log(subject);

		return 'ok';
	}

	async findAll(): Promise<Subject[]> {
		// const user = await this.prisma.users.findMany();
		// return user;
		return await this.prisma.subjects.findMany({
			include: {
				product: true,
				timetable: true
			}
		});
	}

	async findOne(id: number) {
		let foundSubject = await this.prisma.subjects.findUnique({
			where: { id },
			include: {
				product: true,
				timetable: true
			}
		});
		if (!foundSubject) throw new NotFoundException('Subject not found!');
		return foundSubject;
	}

	async update(id: number, updateSubjectDto: UpdateSubjectDto) {
		let foundSubject = await this.prisma.subjects.update({
			where: { id },
			data: {
				name: updateSubjectDto.name,
				chinese_name: updateSubjectDto.chinese_name,
				user_id: updateSubjectDto.user_id
			}
		});
		if (!foundSubject) throw new NotFoundException('User not found!');
		return ` subject: #${id} info has been updated`;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedSubject = await this.prisma.subjects.delete({ where: { id } });
		if (!deletedSubject) throw new NotFoundException('User not found!');
		return `subject:#${id} has been deleted`;
		// return deletedUser;
	}
}
