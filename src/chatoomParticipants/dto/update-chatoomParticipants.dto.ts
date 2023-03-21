import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomParticipantDto } from './create-chatoomParticipants.dto';

export class UpdateChatroomParticipantDto extends PartialType(CreateChatroomParticipantDto) {}
