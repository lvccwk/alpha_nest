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

@ApiTags('cartDetails')
@Controller('cartDetails')
export class CartDetailsController {
	constructor(
		private readonly cartDetailsService: CartDetailsService,
		private readonly jwtService: JwtService,
		private readonly stripe: Stripe
	) {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: '2022-11-15'
		});
	}

	@Post()
	async create(@Body() createCartDetailDto: CreateCartDetailDto) {
		console.log('Test1');
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

	@Get('/stripe/:id')
	async redirectToCheckout(@Req() req: any, @Res() res: Response) {
		try {
			const userId = Number(req.session.user.id);
			const cartDetails = await this.cartDetailsService.findOne(userId);

			const lineItems = Array.from([cartDetails]).map((item: any) => {
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

			const session = await this.stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				mode: 'payment',
				line_items: lineItems,
				success_url: `${process.env.SERVER_URL}/success.html`,
				cancel_url: `${process.env.SERVER_URL}/fail.html`
			});
			return res.status(HttpStatus.OK).json({
				url: session.url
			});
		} catch (e) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: e.toString() });
		}
	}
}
