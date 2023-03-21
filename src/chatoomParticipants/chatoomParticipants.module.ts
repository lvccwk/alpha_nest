import { Module } from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';
import { ChatroomParticipantsController } from './chatoomParticipants.controller';
import { ChatroomParticipantsService } from './chatoomParticipants.service';

@Module({
	controllers: [ChatroomParticipantsController],
	providers: [ChatroomParticipantsService, PrismaService]
})
export class ChatroomParticipantsModule {}
