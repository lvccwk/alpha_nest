import { Module } from '@nestjs/common';
import { ChatroomHistorysService } from './chatroomHistorys.service';
import { ChatroomHistorysController } from './chatroomHistorys.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [ChatroomHistorysController],
  providers: [ChatroomHistorysService, PrismaService],
})
export class ChatroomHistorysModule {}
