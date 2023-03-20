import { Module } from '@nestjs/common';
import { PrivateMessagesService } from './privateMessages.service';
import { PrivateMessagesController } from './privateMessages.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [PrivateMessagesController],
  providers: [PrivateMessagesService, PrismaService],
})
export class PrivateMessagesModule {}
