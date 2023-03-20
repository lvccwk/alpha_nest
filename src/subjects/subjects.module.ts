import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService, PrismaService],
})
export class SubjectsModule {}
