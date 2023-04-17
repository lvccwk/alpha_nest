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
	HttpStatus,
	Query
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
	// private stripe: Stripe;

	constructor(
		private readonly cartDetailsService: CartDetailsService,
		private readonly jwtService: JwtService,
		@InjectStripe() private readonly stripe: Stripe
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

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.cartDetailsService.findOne(+id);
	// }

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

	@Delete('/drop/:id')
	drop(@Param('id', ParseIntPipe) id: any) {
		return this.cartDetailsService.drop(id);
	}

	@UseGuards(AuthGuard)
	@Get('/stripe/:id')
	async redirectToCheckout(@Param('id', ParseIntPipe) cart_id: number, @Res() res: Response) {
		try {
			const cartDetails = await this.cartDetailsService.findCheckOut(cart_id);

			const lineItems =
				Array.from([cartDetails]) &&
				cartDetails.map((item: any) => {
					return {
						price_data: {
							currency: 'HKD',
							product_data: {
								name: item.product.name
							},
							unit_amount: item.product.price * 100
						},
						quantity: 1
					};
				});
			console.log(`lineItems`, lineItems);
			console.log(cartDetails);

			const session = await this.stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				mode: 'payment',
				line_items: lineItems,
				success_url: `${process.env.REACT_PUBLIC_HOSTNAME}/success.html`,
				cancel_url: `${process.env.REACT_PUBLIC_HOSTNAME}/fail.html`
			});

			return res.status(HttpStatus.OK).json({
				url: session.url
			});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}
}
