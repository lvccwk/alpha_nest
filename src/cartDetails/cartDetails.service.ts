import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCartDetailDto } from './dto/create-cartDetails.dto';
import { UpdateCartDetailDto } from './dto/update-cartDetails.dto';
import { CartDetail } from './entities/cartDetails.entity';

@Injectable()
export class CartDetailsService {
	constructor(private prisma: PrismaService) {}
	async create(createCartDetailDto: CreateCartDetailDto): Promise<string> {
		let cartDetail = await this.prisma.cartDetails.create({
			data: {
				product_id: createCartDetailDto.product_id,
				cart_id: createCartDetailDto.cart_id
			}
		});
		console.log(cartDetail);
		return 'ok';
	}

	async findAll(): Promise<CartDetail[]> {
		return await this.prisma.cartDetails.findMany();
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.cartDetails.findUnique({
			where: { id }
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updateCartDetailDto: UpdateCartDetailDto) {
		let foundCartDetail = await this.prisma.cartDetails.update({
			where: { id },
			data: {
				product_id: updateCartDetailDto.product_id,
				cart_id: updateCartDetailDto.cart_id
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
