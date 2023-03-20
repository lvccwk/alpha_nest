import { OmitType, PartialType } from '@nestjs/swagger';
import { ProductRating } from '../entities/productRatings.entity';

export class CreateProductRatingDto extends OmitType(ProductRating, ['id'] as const) {}
