import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCartDetailDto } from './dto/create-cartDetails.dto';
import { UpdateCartDetailDto } from './dto/update-cartDetails.dto';
import { CartDetail } from './entities/cartDetails.entity';
import { CartDetails } from '@prisma/client';

@Injectable()
export class CartDetailsService {
	constructor(private prisma: PrismaService) {}
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
			where: { cart_id },
			include: {
				product: true,
				cart: true
			}
		});
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.cartDetails.findUnique({
			where: { id },
			include: {
				product: true,
				cart: true
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
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
		return ` Cart: #${id} info has been updated`;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.cartDetails.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return `Cart:#${id} has been deleted`;
		// return deletedUser;
	}
}
