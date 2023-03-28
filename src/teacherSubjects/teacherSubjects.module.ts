import { Module } from '@nestjs/common';
import { TeacherSubjectsService } from './teacherSubjects.service';
import { TeacherSubjectsController } from './teacherSubjects.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
	controllers: [TeacherSubjectsService],
	providers: [TeacherSubjectsService, PrismaService]
})
export class TeacherSubjectsModule {}
