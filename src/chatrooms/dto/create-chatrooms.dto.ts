import { OmitType, PartialType } from '@nestjs/swagger';
import { Chatroom } from '../entities/chatrooms.entity';

export class CreateChatroomDto extends OmitType(Chatroom, ['id'] as const) {}
