import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePrivateMessageDto } from './dto/create-privateMessages.dto';
import { UpdatePrivateMessageDto } from './dto/update-privateMessages.dto';
import { PrivateMessage } from './entities/privateMessages.entity';
import * as Pusher from 'pusher';

@Injectable()
export class PrivateMessagesService {
	pusher: Pusher;
	constructor(private prisma: PrismaService) {
		this.pusher = new Pusher({
			appId: '1581303',
			key: '65bf1de8c33b8354835a',
			secret: '606ce6c6b60f4f895b48',
			cluster: 'ap1',
			useTLS: true
		});
	}

	async trigger(channel: string, event: string, data: any) {
		await this.pusher.trigger(channel, event, data);
	}

	async create(createPrivateMessageDto: CreatePrivateMessageDto): Promise<string> {
		let cartDetail = await this.prisma.privateMessages.create({
			data: {
				from_id: createPrivateMessageDto.to_id,
				content: createPrivateMessageDto.content,
				to_id: createPrivateMessageDto.from_id
			}
		});
		console.log(cartDetail);
		return JSON.stringify({ cartDetail });
	}

	async findAll(receipt: number, sender: number): Promise<PrivateMessage[]> {
		return await this.prisma.privateMessages.findMany({
			where: {
				OR: [
					{ from_id: receipt, to_id: sender },
					{ from_id: sender, to_id: receipt }
				]
			}
		});
	}

	async findOne(id: number) {
		let foundCartDetail = await this.prisma.privateMessages.findUnique({
			where: { id }
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return foundCartDetail;
	}

	async update(id: number, updatePrivateMessageDto: UpdatePrivateMessageDto) {
		let foundCartDetail = await this.prisma.privateMessages.update({
			where: { id },
			data: {
				from_id: updatePrivateMessageDto.from_id,
				content: updatePrivateMessageDto.content
			}
		});
		if (!foundCartDetail) throw new NotFoundException('Cart not found!');
		return ` Cart: #${id} info has been updated`;
	}

	async remove(id: number) {
		let deletedCartDetail = await this.prisma.privateMessages.delete({
			where: { id }
		});
		if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
		return `Cart:#${id} has been deleted`;
	}
}
