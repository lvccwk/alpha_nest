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
import { TimetablesService } from './timetable.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { Timetable } from './entities/timetable.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('timetables')
@Controller('timetables')
export class TimetablesController {
	constructor(private readonly timetablesService: TimetablesService) {}

	@Post()
	async create(@Body() createTimetableDto: CreateTimetableDto) {
		return await this.timetablesService.create(createTimetableDto);
	}

	@Get()
	async findAll(): Promise<Timetable[]> {
		return await this.timetablesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.timetablesService.findOne(+id);
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateTimetableDto: UpdateTimetableDto) {
		return this.timetablesService.update(id, updateTimetableDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.timetablesService.remove(id);
	}
}
