import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateChatroomHistoryDto } from './dto/create-chatroomHistorys.dto';
import { UpdateChatroomHistoryDto } from './dto/update-chatroomHistorys.dto';
import { ChatroomHistory } from './entities/chatroomHistorys.entity';

@Injectable()
export class ChatroomHistorysService {
  constructor(private prisma: PrismaService) {}
  async create(
    createChatroomHistoryDto: CreateChatroomHistoryDto,
  ): Promise<string> {
    let cartDetail = await this.prisma.chatroomHistorys.create({
      data: {
        content: createChatroomHistoryDto.content,
        chatroom_id: createChatroomHistoryDto.chatroom_id,
      },
    });
    console.log(cartDetail);
    return 'ok';
  }

  async findAll(): Promise<ChatroomHistory[]> {
    return await this.prisma.chatroomHistorys.findMany();
  }

  async findOne(id: number) {
    let foundCartDetail = await this.prisma.chatroomHistorys.findUnique({
      where: { id },
    });
    if (!foundCartDetail) throw new NotFoundException('Cart not found!');
    return foundCartDetail;
  }

  async update(id: number, updateChatroomHistoryDto: UpdateChatroomHistoryDto) {
    let foundCartDetail = await this.prisma.chatroomHistorys.update({
      where: { id },
      data: {
        content: updateChatroomHistoryDto.content,
        chatroom_id: updateChatroomHistoryDto.chatroom_id,
      },
    });
    if (!foundCartDetail) throw new NotFoundException('Cart not found!');
    return ` Cart: #${id} info has been updated`;
    // return foundUser;
  }

  async remove(id: number) {
    let deletedCartDetail = await this.prisma.chatroomHistorys.delete({
      where: { id },
    });
    if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
    return `Cart:#${id} has been deleted`;
    // return deletedUser;
  }
}
