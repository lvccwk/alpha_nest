import { Module } from '@nestjs/common';
import { AvailableTimeService } from './availableTimes.service';
import { AvailableTimeController } from './availableTimes.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
	controllers: [AvailableTimeController],
	providers: [AvailableTimeService, PrismaService]
})
export class AvailableTimesModule {}
