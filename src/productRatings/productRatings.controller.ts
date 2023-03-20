import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CartDetailsService } from './productRatings.service';
import { CreateCartDetailDto } from './dto/create-productRatings.dto';
import { UpdateCartDetailDto } from './dto/update-productRatings.dto';
import { ProductRating } from './entities/productRatings.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('productRatings')
@Controller('productRatings')
export class CartDetailsController {
	constructor(private readonly cartDetailsService: CartDetailsService) {}

	@Post()
	async create(@Body() createCartDetailDto: CreateCartDetailDto) {
		return await this.cartDetailsService.create(createCartDetailDto);
	}

	@Get()
	async findAll(): Promise<ProductRating[]> {
		return await this.cartDetailsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.cartDetailsService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCartDetailDto: UpdateCartDetailDto
	) {
		return this.cartDetailsService.update(id, updateCartDetailDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.cartDetailsService.remove(id);
	}
}
