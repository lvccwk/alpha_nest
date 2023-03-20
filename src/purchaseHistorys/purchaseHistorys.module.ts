import { Module } from '@nestjs/common';
import { PurchaseHistorysService } from './purchaseHistorys.service';
import { PurchaseHistorysController } from './purchaseHistorys.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [PurchaseHistorysController],
  providers: [PurchaseHistorysService, PrismaService],
})
export class PurchaseHistorysModule {}
