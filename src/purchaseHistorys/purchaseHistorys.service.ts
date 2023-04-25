import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePurchaseHistoryDto } from './dto/create-purchaseHistorys.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchaseHistorys.dto';
import { PurchaseHistory } from './entities/purchaseHistorys.entity';
import { PurchaseHistorys } from '@prisma/client';

@Injectable()
export class PurchaseHistorysService {
	constructor(private prisma: PrismaService) {}

	async create(createPurchaseHistoryDto: CreatePurchaseHistoryDto): Promise<PurchaseHistorys> {
		try {
			let purchaseHistoryDetail = await this.prisma.purchaseHistorys.create({
				data: {
					product_id: createPurchaseHistoryDto.product_id,
					student_id: createPurchaseHistoryDto.student_id
				}
			});
			return purchaseHistoryDetail;
		} catch (e) {
			console.log(e);
		}
	}

	async findAll(): Promise<PurchaseHistory[]> {
		return await this.prisma.purchaseHistorys.findMany();
	}

	async findOne(student_id: number) {
		if (isNaN(student_id)) throw new NotFoundException('Number should not be NaN!');

		let foundCartDetail = await this.prisma.purchaseHistorys.findMany({
			where: { student_id },
			include: {
				product: true
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updatePurchaseHistoryDto: UpdatePurchaseHistoryDto) {
		let foundCartDetail = await this.prisma.purchaseHistorys.update({
			where: { id },
			data: {
				product_id: updatePurchaseHistoryDto.product_id,
				student_id: updatePurchaseHistoryDto.student_id
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return ` Cart: #${id} info has been updated`;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.purchaseHistorys.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return `Cart:#${id} has been deleted`;
	}
}
