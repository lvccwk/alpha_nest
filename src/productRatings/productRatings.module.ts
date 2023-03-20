import { Module } from '@nestjs/common';
import { CartDetailsService } from './productRatings.service';
import { CartDetailsController } from './productRatings.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [CartDetailsController],
  providers: [CartDetailsService, PrismaService],
})
export class ProductRatingsModule {}
