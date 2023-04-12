import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCartDetailDto } from './dto/create-cartDetails.dto';
import { UpdateCartDetailDto } from './dto/update-cartDetails.dto';
import { CartDetail } from './entities/cartDetails.entity';
import { CartDetails } from '@prisma/client';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { CartDetailsController } from './cartDetails.controller';

@Injectable()
export class CartDetailsService {
	// cartDetailsController = new CartDetailsController()
	constructor(private prisma: PrismaService, @InjectStripe() private readonly stripe: Stripe) {}

	async create(createCartDetailDto: CreateCartDetailDto): Promise<CartDetails> {
		console.log({
			cart_id: createCartDetailDto.cart_id,
			product_id: createCartDetailDto.product_id,
			is_buying: createCartDetailDto.is_buying
		});
		try {
			let cartDetail = await this.prisma.cartDetails.create({
				data: {
					cart_id: createCartDetailDto.cart_id,
					product_id: createCartDetailDto.product_id,
					is_buying: createCartDetailDto.is_buying
				}
			});
			console.log(cartDetail);
			return cartDetail;
		} catch (e) {
			console.log(e);
		}
	}

	async findAll(cart_id: number): Promise<CartDetail[]> {
		return await this.prisma.cartDetails.findMany({
			where: { cart_id, is_buying: true },
			include: {
				product: true
			}
		});
	}

	async findOne(cart_id: number): Promise<CartDetail[]> {
		return await this.prisma.cartDetails.findMany({
			where: { cart_id, is_buying: true },
			include: {
				product: true,
				cart: true
			}
		});
	}

	async findCheckOut(cart_id: number) {
		try {
			const foundCartDetail = await this.prisma.cartDetails.findMany({
				where: { cart_id, is_buying: true },
				include: {
					product: true,
					cart: true
				}
			});
			if (!foundCartDetail) {
				throw new NotFoundException('Cart not found!');
			}
			console.log('foundCartDetail', foundCartDetail);
			return foundCartDetail;
		} catch (e) {
			throw new NotFoundException(e);
		}
	}

	async update(id: number, updateCartDetailDto: UpdateCartDetailDto) {
		let foundCartDetail = await this.prisma.cartDetails.update({
			where: { id },
			data: {
				product_id: updateCartDetailDto.product_id,
				cart_id: updateCartDetailDto.cart_id,
				is_buying: updateCartDetailDto.is_buying
			}
		});

		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async remove(cart_id: number) {
		let deletedCartDetail = await this.prisma.cartDetails.deleteMany({
			where: { cart_id , is_buying: true }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return deletedCartDetail;
	}

	async createCheckoutSession(lineItems: any[], successUrl: string, cancelUrl: string) {
		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: lineItems,
			mode: 'payment',
			success_url: successUrl,
			cancel_url: cancelUrl
		});
		return session;
	}
}
