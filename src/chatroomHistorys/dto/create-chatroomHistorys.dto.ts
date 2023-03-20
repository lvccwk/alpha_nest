import { OmitType, PartialType } from '@nestjs/swagger';
import { ChatroomHistory } from '../entities/chatroomHistorys.entity';

export class CreateChatroomHistoryDto extends OmitType(ChatroomHistory, [
  'id',
] as const) {}
