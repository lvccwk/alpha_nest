import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-carts.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {}
