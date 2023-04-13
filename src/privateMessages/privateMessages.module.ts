import { Module } from '@nestjs/common';
import { PrivateMessagesService } from './privateMessages.service';
import { PrivateMessagesController } from './privateMessages.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';

@Module({
	controllers: [PrivateMessagesController],
	providers: [PrivateMessagesService, PrismaService, JwtService, JwtStrategy]
})
export class PrivateMessagesModule {}
