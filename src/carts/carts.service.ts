import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCartDto } from './dto/create-carts.dto';
import { UpdateCartDto } from './dto/update-carts.dto';
import { Cart } from './entities/carts.entity';

@Injectable()
export class CartsService {
	constructor(private prisma: PrismaService) {}
	async create(createCartDto: CreateCartDto): Promise<string> {
		let chatroom = await this.prisma.carts.create({
			data: {
				student_id: createCartDto.student_id
			}
		});
		console.log(chatroom);
		return 'ok';
	}

	async findIsBuying(student_id: number) {
		let foundCart = await this.prisma.carts.findUnique({
			where: { student_id },
			include: {
				cart_detail: {
					where: { is_buying: true },
					include: { product: true },
					orderBy: { created_at: 'asc' } // order by created_at in ascending order
				}
			}
		});
		if (!foundCart) throw new NotFoundException('Cart not found!');
		return foundCart;
	}

	async findOne(student_id: number) {
		if (isNaN(student_id)) throw new NotFoundException('Number should not be NaN!');
		let foundCart = await this.prisma.carts.findUnique({
			where: { student_id },
			include: {
				cart_detail: {
					include: { product: true },
					orderBy: { created_at: 'desc' } // order by created_at in descending order
				}
			}
		});
		if (!foundCart) throw new NotFoundException('Cart not found!');
		return foundCart;
	}

	async update(id: number, updateCartDto: UpdateCartDto) {
		let foundChatroom = await this.prisma.carts.update({
			where: { id },
			data: {
				student_id: updateCartDto.student_id
			}
		});
		if (!foundChatroom) throw new NotFoundException('Cart not found!');
		// return ` Cart: #${id} info has been updated`;
		return foundChatroom;
	}

	async remove(id: number) {
		let deletedChatroom = await this.prisma.carts.delete({ where: { id } });
		if (!deletedChatroom) throw new NotFoundException('Cart not found!');
		// return `Cart:#${id} has been deleted`;
		return deletedChatroom;
	}
}
