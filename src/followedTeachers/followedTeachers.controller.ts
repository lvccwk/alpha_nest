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
	Request,
	Query
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
	constructor(
		private readonly followedTeachersService: FollowedTeachersService,
		private readonly jwtService: JwtService
	) {}

	@UseGuards(AuthGuard)
	@Post()
	async create(@Body() createFollowedTeacherDto: CreateFollowedTeacherDto) {
		console.log("line37",createFollowedTeacherDto);
		return await this.followedTeachersService.create(createFollowedTeacherDto);
	}

	@Get('/all')
	async findAll(@Body() user_id: number): Promise<FollowedTeacher[]> {
		return await this.followedTeachersService.findAll(user_id);
	}

	// @UseGuards(AuthGuard)
	@Get('/:id')
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
	
	@Delete()
	remove(@Body() obj) {
		return this.followedTeachersService.remove(obj.user_id, obj.teacher_id);
	}
}
