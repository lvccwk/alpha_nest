import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDetailDto } from './create-cartdetails.dto';

export class UpdateCartDetailDto extends PartialType(CreateCartDetailDto) {}
