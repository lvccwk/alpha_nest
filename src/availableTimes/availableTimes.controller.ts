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
	UseGuards
} from '@nestjs/common';
import { AvailableTimeService } from './availableTimes.service';
import { CreateAvailableTimesDto } from './dto/create-availableTimes.dto';
import { UpdateAvailableTimesDto } from './dto/update-availableTimes.dto';
import { AvailableTime } from './entities/availableTimes.entity';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as jwtSimple from 'jwt-simple';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/users/auth.guard';

@ApiTags('availableTimes')
@Controller('availableTimes')
export class AvailableTimeController {
	constructor(
		private readonly availableTimeService: AvailableTimeService,
		private readonly jwtService: JwtService
	) {}

	@Post()
	async create(@Body() createCartDetailDto: CreateAvailableTimesDto) {
		return await this.availableTimeService.create(createCartDetailDto);
	}
	@UseGuards(AuthGuard)
	@Get()
	async findAll(): Promise<AvailableTime[]> {
		return await this.availableTimeService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.availableTimeService.findOne(+id);
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateAvailableTimesDto: UpdateAvailableTimesDto
	) {
		return this.availableTimeService.update(id, updateAvailableTimesDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.availableTimeService.remove(id);
	}
}
