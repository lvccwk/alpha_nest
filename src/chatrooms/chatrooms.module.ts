import { Module } from '@nestjs/common';
import { ChatroomsService } from './chatrooms.service';
import { ChatroomController } from './chatrooms.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [ChatroomController],
  providers: [ChatroomsService, PrismaService],
})
export class ChatroomsModule {}
