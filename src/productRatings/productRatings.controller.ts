import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductRatingsService } from './productRatings.service';
import { CreateProductRatingDto } from './dto/create-productRatings.dto';
import { UpdateProductRatingDto } from './dto/update-productRatings.dto';
import { ProductRating } from './entities/productRatings.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('productRatings')
@Controller('productRatings')
export class ProductRatingsController {
	constructor(private readonly productRatingsService: ProductRatingsService) {}

	@Post()
	async create(@Body() createProductRatingDto: CreateProductRatingDto) {
		return await this.productRatingsService.create(createProductRatingDto);
	}

	@Get()
	async findAll(): Promise<ProductRating[]> {
		return await this.productRatingsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productRatingsService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateProductRatingDto: UpdateProductRatingDto
	) {
		return this.productRatingsService.update(id, updateProductRatingDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.productRatingsService.remove(id);
	}
}
