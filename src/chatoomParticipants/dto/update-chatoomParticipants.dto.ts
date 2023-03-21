import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomParticipantDto } from './create-chatroomParticipants.dto';

export class UpdateChatroomParticipantDto extends PartialType(CreateChatroomParticipantDto) {}
