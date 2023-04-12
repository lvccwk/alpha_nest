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
import { AvailableTimeService } from './availableTimes.service';
import { CreateAvailableTimesDto } from './dto/create-availableTimes.dto';
import { UpdateAvailableTimesDto } from './dto/update-availableTimes.dto';
import { AvailableTime } from './entities/availableTimes.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('availabletimes')
@Controller('availabletimes')
export class AvailableTimeController {
	constructor(private readonly availableTimeService: AvailableTimeService) {}

	@Post()
	async create(@Body() createCartDetailDto: CreateAvailableTimesDto) {
		return await this.availableTimeService.create(createCartDetailDto);
	}

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
