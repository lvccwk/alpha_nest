import { OmitType, PartialType } from '@nestjs/swagger';
import { ChatroomParticipant } from '../entities/chatoomParticipants.entity';

export class CreateChatroomParticipantDto extends OmitType(ChatroomParticipant, ['id'] as const) {}
