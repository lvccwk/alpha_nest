import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTeacherSubjectDto } from './dto/create-teacherSubjects.dto';
import { UpdateTeacherSubjectDto } from './dto/update-teacherSubjects.dto';
import { TeacherSubject } from './entities/teacherSubjects.entity';

@Injectable()
export class TeacherSubjectsService {
	constructor(private prisma: PrismaService) {}
	async create(createTeacherSubjectDto: CreateTeacherSubjectDto): Promise<string> {
		let teacher = await this.prisma.teacherSubjects.create({
			data: {
				teacher_id: createTeacherSubjectDto.teacher_id,
				subject_id: createTeacherSubjectDto.subject_id
			}
		});
		console.log(teacher);

		return 'ok';
	}

	async findAll(): Promise<TeacherSubject[]> {
		// const user = await this.prisma.users.findMany();
		// return user;
		return await this.prisma.teacherSubjects.findMany();
		// include: {
		// 	user: true
		// }
	}

	async findOne(id: number) {
		let foundSubject = await this.prisma.teacherSubjects.findUnique({
			where: { id },
			include: {
				subject: true,
				teacher: true
			}
		});
		if (!foundSubject) throw new NotFoundException('Subject not found!');
		return foundSubject;
	}

	async update(id: number, updateTeacherSubjectDto: UpdateTeacherSubjectDto) {
		let foundUser = await this.prisma.teacherSubjects.update({
			where: { id },
			data: {
				teacher_id: updateTeacherSubjectDto.teacher_id,
				subject_id: updateTeacherSubjectDto.subject_id
			}
		});
		if (!foundUser) throw new NotFoundException('User not found!');
		return ` subject: #${id} info has been updated`;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedUser = await this.prisma.teacherSubjects.delete({ where: { id } });
		if (!deletedUser) throw new NotFoundException('User not found!');
		return `subject:#${id} has been deleted`;
		// return deletedUser;
	}
}
