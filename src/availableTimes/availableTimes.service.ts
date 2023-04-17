import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateAvailableTimesDto } from './dto/create-availableTimes.dto';
import { UpdateAvailableTimesDto } from './dto/update-availableTimes.dto';
import { AvailableTime } from './entities/availableTimes.entity';

@Injectable()
export class AvailableTimeService {
	constructor(private prisma: PrismaService) {}
	async create(createCartDetailDto: CreateAvailableTimesDto): Promise<string> {
		let cartDetail = await this.prisma.availableTimes.create({
			data: {
				teacher_id: createCartDetailDto.teacher_id,
				time_slot: createCartDetailDto.time_slot,
				time_during: createCartDetailDto.time_during
			}
		});
		console.log(cartDetail);
		return 'ok';
	}

	async findAll(): Promise<AvailableTime[]> {
		return await this.prisma.availableTimes.findMany({
			include: {
				teacher: true,
				reqest: true
				// chatroom_participant: true
			}
		});
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.availableTimes.findUnique({
			where: { id },
			include: {
				teacher: true,
				reqest: true
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updateAvailableTimesDto: UpdateAvailableTimesDto) {
		let foundCartDetail = await this.prisma.availableTimes.update({
			where: { id },
			data: {
				teacher_id: updateAvailableTimesDto.teacher_id,
				time_slot: updateAvailableTimesDto.time_slot,
				time_during: updateAvailableTimesDto.time_during
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		// return ` Cart: #${id} info has been updated`;
		return foundCartDetail;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.availableTimes.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		// return `Cart:#${id} has been deleted`;
		return deletedCartDetail;
	}
}
