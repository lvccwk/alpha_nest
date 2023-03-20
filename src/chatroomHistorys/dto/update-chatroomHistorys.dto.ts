import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomHistoryDto } from './create-chatroomHistorys.dto';

export class UpdateChatroomHistoryDto extends PartialType(
  CreateChatroomHistoryDto,
) {}
