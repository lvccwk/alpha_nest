import { Module } from '@nestjs/common';
import { ChatroomParticipantsService } from './chatroomParticipants.service';
import { ChatroomParticipantsController } from './chatroomParticipants.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
	controllers: [ChatroomParticipantsController],
	providers: [ChatroomParticipantsService, PrismaService]
})
export class ChatroomParticipantsModule {}
