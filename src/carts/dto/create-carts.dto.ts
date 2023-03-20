import { OmitType, PartialType } from '@nestjs/swagger';
import { Cart } from '../entities/carts.entity';

export class CreateCartDto extends OmitType(Cart, ['id'] as const) {}
