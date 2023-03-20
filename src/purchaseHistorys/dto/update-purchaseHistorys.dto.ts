import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseHistoryDto } from './create-purchaseHistorys.dto';

export class UpdatePurchaseHistoryDto extends PartialType(
  CreatePurchaseHistoryDto,
) {}
