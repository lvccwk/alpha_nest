import { ApiProperty } from '@nestjs/swagger';
import {
  IsBIC,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { isBigInt64Array } from 'util/types';

export class ChatroomHistory {
  @ApiProperty({ default: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ default: '中大第一' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @IsNotEmpty()
  chatroom_id: number;
}
