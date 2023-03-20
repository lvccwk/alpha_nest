import { Module } from '@nestjs/common';
import { TimetablesService } from './timetable.service';
import { TimetablesController } from './timetable.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [TimetablesController],
  providers: [TimetablesService, PrismaService],
})
export class TimetablesModule {}
