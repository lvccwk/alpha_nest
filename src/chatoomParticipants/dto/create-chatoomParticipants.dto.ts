import { OmitType, PartialType } from '@nestjs/swagger';
import { ChatoomParticipant } from '../entities/chatoomParticipants.entity';

export class CreateChatoomParticipantDto extends OmitType(ChatoomParticipant, [
  'id',
] as const) {}
