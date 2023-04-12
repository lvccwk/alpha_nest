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
	Logger,
	UseGuards
} from '@nestjs/common';
import { RequestService } from './requests.service';
import { CreateRequestDto } from './dto/create-requests.dto';
import { UpdateRequestDto } from './dto/update-requests.dto';
import { Request } from './entities/requests.entity';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as jwtSimple from 'jwt-simple';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/users/auth.guard';

@ApiTags('requests')
@Controller('requests')
export class RequestController {
	logger = new Logger('HTTP');
	constructor(
		private readonly requestService: RequestService,
		private readonly jwtService: JwtService
	) {}

	@Post()
	async create(@Body() createRequestDto: CreateRequestDto) {
		return await this.requestService.create(createRequestDto);
	}

	@UseGuards(AuthGuard)
	@Get()
	async findAll(): Promise<Request[]> {
		return await this.requestService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.requestService.findOne(+id);
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateRequestDto: UpdateRequestDto) {
		return this.requestService.update(id, updateRequestDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.requestService.remove(id);
	}
}
