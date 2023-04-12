import { Module } from '@nestjs/common';
import { RequestService } from './requests.service';
import { RequestController } from './requests.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';

@Module({
	controllers: [RequestController],
	providers: [RequestService, PrismaService, JwtService, JwtStrategy]
})
export class RequestModule {}
