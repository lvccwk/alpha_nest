import { OmitType, PartialType } from '@nestjs/swagger';
import { ProductRating } from '../entities/productRatings.entity';

export class CreateCartDetailDto extends OmitType(ProductRating, ['id'] as const) {}
