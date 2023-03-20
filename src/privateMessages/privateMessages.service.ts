import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePrivateMessageDto } from './dto/create-privateMessages.dto';
import { UpdatePrivateMessageDto } from './dto/update-privateMessages.dto';
import { PrivateMessage } from './entities/privateMessages.entity';

@Injectable()
export class PrivateMessagesService {
  constructor(private prisma: PrismaService) {}
  async create(
    createPrivateMessageDto: CreatePrivateMessageDto,
  ): Promise<string> {
    let cartDetail = await this.prisma.privateMessages.create({
      data: {
        from_id: createPrivateMessageDto.from_id,
        content: createPrivateMessageDto.content,
      },
    });
    console.log(cartDetail);
    return 'ok';
  }

  async findAll(): Promise<PrivateMessage[]> {
    return await this.prisma.privateMessages.findMany();
  }

  async findOne(id: number) {
    let foundCartDetail = await this.prisma.privateMessages.findUnique({
      where: { id },
    });
    if (!foundCartDetail) throw new NotFoundException('Cart not found!');
    return foundCartDetail;
  }

  async update(id: number, updatePrivateMessageDto: UpdatePrivateMessageDto) {
    let foundCartDetail = await this.prisma.privateMessages.update({
      where: { id },
      data: {
        from_id: updatePrivateMessageDto.from_id,
        content: updatePrivateMessageDto.content,
      },
    });
    if (!foundCartDetail) throw new NotFoundException('Cart not found!');
    return ` Cart: #${id} info has been updated`;
    // return foundUser;
  }

  async remove(id: number) {
    let deletedCartDetail = await this.prisma.privateMessages.delete({
      where: { id },
    });
    if (!deletedCartDetail) throw new NotFoundException('Cart not found!');
    return `Cart:#${id} has been deleted`;
    // return deletedUser;
  }
}
