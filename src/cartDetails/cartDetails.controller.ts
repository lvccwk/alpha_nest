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
import { CartDetailsService } from './cartDetails.service';
import { CreateCartDetailDto } from './dto/create-cartDetails.dto';
import { UpdateCartDetailDto } from './dto/update-cartDetails.dto';
import { CartDetail } from './entities/cartDetails.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('cartDetails')
@Controller('cartDetails')
export class CartDetailsController {
	constructor(private readonly cartDetailsService: CartDetailsService,
		private readonly jwtService: JwtService) {}
	
	@Post()
	async create(@Body() createCartDetailDto: CreateCartDetailDto) {
		console.log("Test1")
		return await this.cartDetailsService.create(createCartDetailDto);
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	async findAll(@Param('id') id: string): Promise<CartDetail[]> {
		return await this.cartDetailsService.findAll(+id);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.cartDetailsService.findOne(+id);
	}

	@Put(':id')
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
