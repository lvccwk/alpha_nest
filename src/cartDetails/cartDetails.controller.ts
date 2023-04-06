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
	UseGuards,
	Req,
	Res,
	HttpStatus
} from '@nestjs/common';
import { CartDetailsService } from './cartDetails.service';
import { CreateCartDetailDto } from './dto/create-cartDetails.dto';
import { UpdateCartDetailDto } from './dto/update-cartDetails.dto';
import { CartDetail } from './entities/cartDetails.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/auth.guard';
import { JwtService } from '@nestjs/jwt';
import Stripe from 'stripe';
import { Response } from 'express';
import { InjectStripe } from 'nestjs-stripe';

@ApiTags('cartDetails')
@Controller('cartDetails')
export class CartDetailsController {
	lineItems: any[];

	constructor(
		private readonly cartDetailsService: CartDetailsService,
		private readonly jwtService: JwtService
	) {}

	@Post()
	async create(@Body() createCartDetailDto: CreateCartDetailDto) {
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
	remove(@Param('id', ParseIntPipe) id: any) {
		return this.cartDetailsService.remove(id);
	}

	@Get('/stripe/:id')
	async redirectToCheckout(@Param('id', ParseIntPipe) cart_id: number, @Res() res: Response) {
		try {
			const cartDetails = await this.cartDetailsService.findCheckOut(cart_id);

			this.lineItems = Array.from([cartDetails]).map((item: any) => {
				return {
					price_data: {
						currency: 'hkd',
						product_data: {
							name: item.image
						},
						unit_amount: item.price
					},
					quantity: 1
				};
			});
			console.log(cartDetails);

			return res.status(HttpStatus.OK).json({
				message: 'ok'
			});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}
}
