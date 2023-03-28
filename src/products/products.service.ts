import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}
	async create(createProductDto: CreateProductDto): Promise<string> {
		let teacher = await this.prisma.products.create({
			data: {
				name: createProductDto.name,
				price: createProductDto.price,
				product_type: createProductDto.product_type,
				avg_rating: createProductDto.avg_rating,
				file_url: createProductDto.file_url,
				image: createProductDto.image,
				user_id: createProductDto.user_id,
				subject_id: createProductDto.subject_id
			}
		});
		console.log(teacher);

		return 'ok';
	}

	async findAll(): Promise<Product[]> {
		// const user = await this.prisma.users.findMany();
		// return user;
		return await this.prisma.products.findMany({
			include: {
				product_rating: true,
				purchase_history: true,
				cart_detail: true
			}
		});
	}

	async findOne(id: number) {
		let foundProduct = await this.prisma.products.findUnique({
			where: { id },
			include: {
				product_rating: true,
				purchase_history: true,
				cart_detail: true
			}
		});
		if (!foundProduct) throw new NotFoundException('Product not found!');
		return foundProduct;
	}

	async update(id: number, updateProductDto: UpdateProductDto) {
		let foundProduct = await this.prisma.products.update({
			where: { id },
			data: {
				name: updateProductDto.name,
				price: updateProductDto.price,
				product_type: updateProductDto.product_type,
				avg_rating: updateProductDto.avg_rating,
				file_url: updateProductDto.file_url,
				image: updateProductDto.image,
				user_id: updateProductDto.user_id,
				subject_id: updateProductDto.subject_id
			}
		});
		if (!foundProduct) throw new NotFoundException('Product not found!');
		return ` Product: #${id} info has been updated`;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedProduct = await this.prisma.products.delete({ where: { id } });
		if (!deletedProduct) throw new NotFoundException('Product not found!');
		return `Product:#${id} has been deleted`;
		// return deletedUser;
	}
}
