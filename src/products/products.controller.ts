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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { Product } from './entities/products.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	async create(@Body() createProductDto: CreateProductDto) {
		return await this.productsService.create(createProductDto);
	}

	@Get()
	async findAll(): Promise<Product[]> {
		return await this.productsService.findAll();
	}

	@Get('/Course')
	async findCourse(): Promise<Product[]> {
		return await this.productsService.findCourse("course");
	}

	@Get('/Note')
	async findNote(): Promise<Product[]> {
		return await this.productsService.findNote("note");
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productsService.findOne(+id);
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.update(id, updateProductDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.remove(id);
	}
}
