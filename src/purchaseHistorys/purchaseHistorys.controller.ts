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
import { PurchaseHistorysService } from './purchaseHistorys.service';
import { CreatePurchaseHistoryDto } from './dto/create-purchaseHistorys.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchaseHistorys.dto';
import { PurchaseHistory } from './entities/purchaseHistorys.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('purchaseHistorys')
@Controller('purchaseHistorys')
export class PurchaseHistorysController {
	constructor(private readonly purchaseHistorysService: PurchaseHistorysService) {}

	@Post()
	async create(@Body() createPurchaseHistoryDto: CreatePurchaseHistoryDto) {
		return await this.purchaseHistorysService.create(createPurchaseHistoryDto);
	}

	@Get()
	async findAll(): Promise<PurchaseHistory[]> {
		return await this.purchaseHistorysService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.purchaseHistorysService.findOne(+id);
	}

	@Put(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updatePurchaseHistoryDto: UpdatePurchaseHistoryDto
	) {
		return this.purchaseHistorysService.update(id, updatePurchaseHistoryDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.purchaseHistorysService.remove(id);
	}
}
