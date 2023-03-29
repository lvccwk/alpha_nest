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
import { FollowedTeachersService } from './followedTeachers.service';
import { CreateFollowedTeacherDto } from './dto/create-followedTeachers.dto';
import { UpdateFollowedTeacherDto } from './dto/update-followedTeachers.dto';
import { FollowedTeacher } from './entities/followedTeachers.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('followedTeachers')
@Controller('followedTeachers')
export class FollowedTeachersController {
	constructor(private readonly followedTeachersService: FollowedTeachersService) {}

	@Post()
	async create(@Body() createFollowedTeacherDto: CreateFollowedTeacherDto) {
		return await this.followedTeachersService.create(createFollowedTeacherDto);
	}

	@Get()
	async findAll(): Promise<FollowedTeacher[]> {
		return await this.followedTeachersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.followedTeachersService.findOne(+id);
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateFollowedTeacherDto: UpdateFollowedTeacherDto
	) {
		return this.followedTeachersService.update(id, updateFollowedTeacherDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.followedTeachersService.remove(id);
	}
}
