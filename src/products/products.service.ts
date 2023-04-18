import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { Product } from './entities/products.entity';
import { json } from 'body-parser';

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}
	async create(createProductDto: CreateProductDto): Promise<string> {
		console.log({ createProductDto });
		let teacher = await this.prisma.products.create({
			data: {
				name: createProductDto.name,
				price: Number(createProductDto.price),
				product_type: String(createProductDto.product_type),
				avg_rating: createProductDto.avg_rating,
				file_url: createProductDto.file_url,
				image: createProductDto.image,
				subject_id: Number(createProductDto.subject_id),
				teacher_id: Number(createProductDto.teacher_id),
				info: createProductDto.info
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
				cart_detail: true,
				teacher: {
					include: {
						user: true
					}
				}
			}
		});
	}

	async findCourse(product_type: string): Promise<Product[]> {
		// const user = await this.prisma.users.findMany();
		// return user
		return await this.prisma.products.findMany({
			where: { product_type, is_onsale: true },
			include: {
				product_rating: true,
				purchase_history: true,
				cart_detail: true,
				teacher: {
					include: {
						user: true
					}
				}
			}
		});
	}

	async findNote(product_type: string): Promise<Product[]> {
		// const user = await this.prisma.users.findMany();
		// return user;
		return await this.prisma.products.findMany({
			where: { product_type, is_onsale: true },
			include: {
				product_rating: true,
				purchase_history: true,
				cart_detail: true,
				teacher: {
					include: {
						user: true
					}
				}
			}
		});
	}

	async findOne(id: number) {
		let foundProduct = await this.prisma.products.findUnique({
			where: { id },
			include: {
				product_rating: true,
				purchase_history: true,
				cart_detail: true,
				teacher: {
					include: {
						user: true
					}
				}
			}
		});
		if (!foundProduct) throw new NotFoundException('Product not found!');
		return foundProduct;
	}

	async findTeacherProduct(teacher_id: number) {
		let foundProduct = await this.prisma.products.findMany({
			where: { teacher_id }
			// include: {
			// 	product_rating: true,
			// 	purchase_history: true,
			// 	cart_detail: true,
			// 	teacher: {
			// 		include: {
			// 			user: true
			// 		}
			// 	}
			// }
		});
		if (!foundProduct) throw new NotFoundException('Product not found!');
		return foundProduct;
	}

	async update(id: number, updateProductDto: UpdateProductDto) {
		let foundProduct = await this.prisma.products.update({
			where: { id },
			data: {
				name: updateProductDto.name,
				price: Number(updateProductDto.price),
				product_type: updateProductDto.product_type,
				avg_rating: updateProductDto.avg_rating,
				file_url: updateProductDto.file_url,
				image: updateProductDto.image,
				subject_id: updateProductDto.subject_id,
				teacher_id: updateProductDto.teacher_id,
				info: updateProductDto.info,
				is_onsale: updateProductDto.is_onsale
			}
		});
		if (!foundProduct) throw new NotFoundException('Product not found!');
		return foundProduct;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedProduct = await this.prisma.products.delete({ where: { id } });
		if (!deletedProduct) throw new NotFoundException('Product not found!');
		return `Product:#${id} has been deleted`;
		// return deletedUser;
	}
}
