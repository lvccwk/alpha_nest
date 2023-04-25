import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateRequestDto } from './dto/create-requests.dto';
import { UpdateRequestDto } from './dto/update-requests.dto';
import { Request } from './entities/requests.entity';

@Injectable()
export class RequestService {
	constructor(private prisma: PrismaService) {}
	async create(createRequestDto: CreateRequestDto): Promise<string> {
		let cartDetail = await this.prisma.requests.create({
			data: {
				status: createRequestDto.status,
				user_id: createRequestDto.user_id,
				teacher_id: createRequestDto.teacher_id,
				available_time_id: createRequestDto.available_time_id
			}
		});
		console.log(cartDetail);
		return 'ok';
	}

	async findAll(): Promise<Request[]> {
		return await this.prisma.requests.findMany({
			include: {
				teacher: true,
				user: true,
				available_time: true
			}
		});
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.requests.findUnique({
			where: { id },
			include: {
				teacher: true,
				user: true,
				available_time: true
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updateRequestDto: UpdateRequestDto) {
		let foundCartDetail = await this.prisma.requests.update({
			where: { id },
			data: {
				status: updateRequestDto.status,
				user_id: updateRequestDto.user_id,
				teacher_id: updateRequestDto.teacher_id,
				available_time_id: updateRequestDto.available_time_id
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.requests.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return deletedCartDetail;
	}
}
