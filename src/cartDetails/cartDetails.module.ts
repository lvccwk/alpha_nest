import { Module } from '@nestjs/common';
import { CartDetailsService } from './cartDetails.service';
import { CartDetailsController } from './cartDetails.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [CartDetailsController],
  providers: [CartDetailsService, PrismaService],
})
export class CartDetailsModule {}
