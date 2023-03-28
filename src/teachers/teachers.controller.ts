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
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teachers.dto';
import { UpdateTeacherDto } from './dto/update-teachers.dto';
import { Teacher } from './entities/teachers.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) {}

	@Post()
	async create(@Body() createTeacherDto: CreateTeacherDto) {
		return await this.teachersService.create(createTeacherDto);
	}

	@Get()
	async findAll(): Promise<Teacher[]> {
		return await this.teachersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.teachersService.findOne(+id);
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
		return this.teachersService.update(id, updateTeacherDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.teachersService.remove(id);
	}
}
