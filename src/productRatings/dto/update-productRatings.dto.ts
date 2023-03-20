import { PartialType } from '@nestjs/mapped-types';
import { CreateProductRatingDto } from './create-productRatings.dto';

export class UpdateProductRatingDto extends PartialType(CreateProductRatingDto) {}
