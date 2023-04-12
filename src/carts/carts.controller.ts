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

	@UseGuards(AuthGuard)
	@Get('/isBuying/:id')
	findIsBuying(@Param('id') student_id: string) {
		return this.cartsService.findIsBuying(+student_id);
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	findOne(@Param('id') student_id: string) {
		return this.cartsService.findOne(+student_id);
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
