import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	Put,
	UseGuards,
	Logger,
	Request
} from '@nestjs/common';
import { FollowedTeachersService } from './followedTeachers.service';
import { CreateFollowedTeacherDto } from './dto/create-followedTeachers.dto';
import { UpdateFollowedTeacherDto } from './dto/update-followedTeachers.dto';
import { FollowedTeacher } from './entities/followedTeachers.entity';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../users/auth.guard';

@ApiTags('followedTeachers')
@Controller('followedTeachers')
export class FollowedTeachersController {
	logger = new Logger('HTTP');
	constructor(private readonly followedTeachersService: FollowedTeachersService) {}

	// @UseGuards(AuthGuard)
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

	// @UseGuards(AuthGuard)
	@Delete()
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.followedTeachersService.remove(id);
	}
}
