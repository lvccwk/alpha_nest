import { OmitType, PartialType } from '@nestjs/swagger';
import { PrivateMessage } from '../entities/privateMessages.entity';

export class CreatePrivateMessageDto extends OmitType(PrivateMessage, [
  'id',
] as const) {}
