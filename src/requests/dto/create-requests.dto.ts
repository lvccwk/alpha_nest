import { OmitType, PartialType } from '@nestjs/swagger';
import { Request } from '../entities/requests.entity';

export class CreateRequestDto extends OmitType(Request, ['id'] as const) {}
