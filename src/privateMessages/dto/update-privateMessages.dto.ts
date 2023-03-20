import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivateMessageDto } from './create-privateMessages.dto';

export class UpdatePrivateMessageDto extends PartialType(
  CreatePrivateMessageDto,
) {}
