import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { PrismaService } from 'nestjs-prisma';
import { CartsController } from './carts.controller';

@Module({
  controllers: [CartsController],
  providers: [CartsService, PrismaService],
})
export class CartsModule {}
