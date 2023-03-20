import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductRatingDto } from './dto/create-productRatings.dto';
import { UpdateProductRatingDto } from './dto/update-productRatings.dto';
import { ProductRating } from './entities/productRatings.entity';

@Injectable()
export class ProductRatingsService {
	constructor(private prisma: PrismaService) {}
	async create(createProductRatingDto: CreateProductRatingDto): Promise<string> {
		let cartDetail = await this.prisma.productRatings.create({
			data: {
				product_id: createProductRatingDto.product_id,
				student_id: createProductRatingDto.student_id,
				rating: createProductRatingDto.rating
			}
		});
		console.log(cartDetail);
		return 'ok';
	}

	async findAll(): Promise<ProductRating[]> {
		return await this.prisma.productRatings.findMany();
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.productRatings.findUnique({
			where: { id }
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updateProductRatingDto: UpdateProductRatingDto) {
		let foundCartDetail = await this.prisma.productRatings.update({
			where: { id },
			data: {
				product_id: updateProductRatingDto.product_id,
				student_id: updateProductRatingDto.student_id,
				rating: updateProductRatingDto.rating
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return ` Cart: #${id} info has been updated`;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.productRatings.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return `Cart:#${id} has been deleted`;
		// return deletedUser;
	}
}
