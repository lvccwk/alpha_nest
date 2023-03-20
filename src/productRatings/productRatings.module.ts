import { Module } from '@nestjs/common';
import { ProductRatingsService } from './productRatings.service';
import { ProductRatingsController } from './productRatings.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
	controllers: [ProductRatingsController],
	providers: [ProductRatingsService, PrismaService]
})
export class ProductRatingsModule {}
