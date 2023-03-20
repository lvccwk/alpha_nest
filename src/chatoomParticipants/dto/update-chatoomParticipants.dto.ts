import { PartialType } from '@nestjs/mapped-types';
import { CreateChatoomParticipantDto } from './create-chatoomParticipants.dto';

export class UpdateChatoomParticipantDto extends PartialType(
  CreateChatoomParticipantDto,
) {}
