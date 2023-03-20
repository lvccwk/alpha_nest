import { OmitType, PartialType } from '@nestjs/swagger';
import { Product } from '../entities/products.entity';

export class CreateProductDto extends OmitType(Product, ['id'] as const) {}
