import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	Put
} from '@nestjs/common';
import { TeacherSubjectsService } from './teacherSubjects.service';
import { CreateTeacherSubjectDto } from './dto/create-teacherSubjects.dto';
import { UpdateTeacherSubjectDto } from './dto/update-teacherSubjects.dto';
import { TeacherSubject } from './entities/teacherSubjects.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TeacherSubjects')
@Controller('TeacherSubjects')
export class TeacherSubjectsController {
	constructor(private readonly teacherSubjectsService: TeacherSubjectsService) {}

	@Post()
	async create(@Body() createTeacherDto: CreateTeacherSubjectDto) {
		return await this.teacherSubjectsService.create(createTeacherDto);
	}

	@Get()
	async findAll(): Promise<TeacherSubject[]> {
		return await this.teacherSubjectsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.teacherSubjectsService.findOne(+id);
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateTeacherDto: CreateTeacherSubjectDto
	) {
		return this.teacherSubjectsService.update(id, updateTeacherDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.teacherSubjectsService.remove(id);
	}
}
