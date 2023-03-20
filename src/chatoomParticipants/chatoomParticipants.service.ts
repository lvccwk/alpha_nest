import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateChatoomParticipantDto } from './dto/create-chatoomParticipants.dto';
import { UpdateChatoomParticipantDto } from './dto/update-chatoomParticipants.dto';
import { ChatoomParticipant } from './entities/chatoomParticipants.entity';

@Injectable()
export class ChatoomParticipantsService {
  constructor(private prisma: PrismaService) {}
  async create(
    createChatoomParticipantDto: CreateChatoomParticipantDto,
  ): Promise<string> {
    let cartDetail = await this.prisma.chatoomParticipants.create({
      data: {
        chatroom_id: createChatoomParticipantDto.chatroom_id,
        user_id: createChatoomParticipantDto.user_id,
      },
    });
    console.log(cartDetail);
    return 'ok';
  }

  async findAll(): Promise<ChatoomParticipant[]> {
    return await this.prisma.chatoomParticipants.findMany();
  }

  async findOne(id: number) {
    let foundCartDetail = await this.prisma.chatoomParticipants.findUnique({
      where: { id },
    });
    if (!foundCartDetail) throw new NotFoundException('Cart not found!');
    return foundCartDetail;
  }

  async update(
    id: number,
    updateChatoomParticipantDto: UpdateChatoomParticipantDto,
  ) {
    let foundCartDetail = await this.prisma.chatoomParticipants.update({
      where: { id },
      data: {
        chatroom_id: updateChatoomParticipantDto.chatroom_id,
        user_id: updateChatoomParticipantDto.user_id,
      },
    });
    if (!foundCartDetail) throw new NotFoundException('Cart not found!');
    return ` Cart: #${id} info has been updated`;
    // return foundUser;
  }

  async remove(id: number) {
    let deletedCartDetail = await this.prisma.chatoomParticipants.delete({
      where: { id },
    });
    if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
    return `Cart:#${id} has been deleted`;
    // return deletedUser;
  }
}
