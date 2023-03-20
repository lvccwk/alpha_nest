import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomDto } from './create-chatrooms.dto';

export class UpdateChatroomDto extends PartialType(CreateChatroomDto) {}
