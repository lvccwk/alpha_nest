import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateChatroomParticipantDto } from './dto/create-chatroomParticipants.dto';
import { UpdateChatroomParticipantDto } from './dto/update-chatroomParticipants.dto';
import { ChatroomParticipant } from './entities/chatroomParticipants.entity';

@Injectable()
export class ChatroomParticipantsService {
	constructor(private prisma: PrismaService) {}
	async create(createChatroomParticipantDto: CreateChatroomParticipantDto): Promise<string> {
		let cartDetail = await this.prisma.chatroomParticipants.create({
			data: {
				chatroom_id: createChatroomParticipantDto.chatroom_id,
				user_id: createChatroomParticipantDto.user_id
			}
		});
		console.log(cartDetail);
		return 'ok';
	}

	async findAll(): Promise<ChatroomParticipant[]> {
		return await this.prisma.chatroomParticipants.findMany();
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.chatroomParticipants.findUnique({
			where: { id }
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updateChatroomParticipantDto: UpdateChatroomParticipantDto) {
		let foundCartDetail = await this.prisma.chatroomParticipants.update({
			where: { id },
			data: {
				chatroom_id: updateChatroomParticipantDto.chatroom_id,
				user_id: updateChatroomParticipantDto.user_id
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return ` Cart: #${id} info has been updated`;
		// return foundUser;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.chatroomParticipants.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return `Cart:#${id} has been deleted`;
		// return deletedUser;
	}
}
