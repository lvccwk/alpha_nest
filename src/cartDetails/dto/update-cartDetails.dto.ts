import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDetailDto } from './create-cartDetails.dto';

export class UpdateCartDetailDto extends PartialType(CreateCartDetailDto) {}
