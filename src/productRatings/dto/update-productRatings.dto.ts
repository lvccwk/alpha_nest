import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDetailDto } from './create-productRatings.dto';

export class UpdateCartDetailDto extends PartialType(CreateCartDetailDto) {}
