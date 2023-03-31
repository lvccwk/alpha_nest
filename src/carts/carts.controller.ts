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
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-carts.dto';
import { UpdateCartDto } from './dto/update-carts.dto';
import { Cart } from './entities/carts.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
	constructor(private readonly cartsService: CartsService) {}

	@Post()
	async create(@Body() createCartDto: CreateCartDto) {
		return await this.cartsService.create(createCartDto);
	}

	// @Get()
	// async findAll(): Promise<Cart[]> {
	// 	return await this.cartsService.findAll();
	// }

	@UseGuards(AuthGuard)
	@Get('/')
	findOne(@Param() id: string) {
		return this.cartsService.findOne(+id);
	}

	@Put(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateCartDto: UpdateCartDto) {
		return this.cartsService.update(id, updateCartDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.cartsService.remove(id);
	}
}
