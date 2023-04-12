import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-requests.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
