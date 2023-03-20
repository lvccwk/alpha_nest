import { OmitType, PartialType } from '@nestjs/swagger';
import { PurchaseHistory } from '../entities/purchaseHistorys.entity';

export class CreatePurchaseHistoryDto extends OmitType(PurchaseHistory, [
  'id',
] as const) {}
