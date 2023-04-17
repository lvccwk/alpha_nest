import { Module } from '@nestjs/common';
import { AvailableTimeService } from './availableTimes.service';
import { AvailableTimeController } from './availableTimes.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [AvailableTimeController],
	providers: [AvailableTimeService, PrismaService, JwtService, JwtStrategy]
})
export class AvailableTimesModule {}
