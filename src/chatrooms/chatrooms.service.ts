import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateChatroomDto } from './dto/create-chatrooms.dto';
import { UpdateChatroomDto } from './dto/update-chatrooms.dto';
import { Chatroom } from './entities/chatrooms.entity';

@Injectable()
export class ChatroomsService {
	constructor(private prisma: PrismaService) {}
	async create(createCartDetailDto: CreateChatroomDto): Promise<string> {
		let cartDetail = await this.prisma.chatrooms.create({
			data: {
				name: createCartDetailDto.name,
				user_id: createCartDetailDto.user_id
			}
		});
		console.log(cartDetail);
		return 'ok';
	}

	async findAll(): Promise<Chatroom[]> {
		return await this.prisma.chatrooms.findMany({
			include: {
				chatroom_history: true,
				chatroom_participant: true
			}
		});
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.chatrooms.findUnique({
			where: { id },
			include: {
				chatroom_history: true,
				chatroom_participant: true
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updateChatroomDto: UpdateChatroomDto) {
		let foundCartDetail = await this.prisma.chatrooms.update({
			where: { id },
			data: {
				name: updateChatroomDto.name,
				user_id: updateChatroomDto.user_id
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return ` Cart: #${id} info has been updated`;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.chatrooms.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return `Cart:#${id} has been deleted`;
	}
}
