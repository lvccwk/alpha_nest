import { Module } from '@nestjs/common';
import { ChatoomParticipantsService } from './chatoomParticipants.service';
import { ChatoomParticipantsController } from './chatoomParticipants.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [ChatoomParticipantsController],
  providers: [ChatoomParticipantsService, PrismaService],
})
export class ChatoomParticipantsModule {}
