import { OmitType, PartialType } from '@nestjs/swagger';
import { CartDetail } from '../entities/cartDetails.entity';

export class CreateCartDetailDto extends OmitType(CartDetail, [
  'id',
] as const) {}
