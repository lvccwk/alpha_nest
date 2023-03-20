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

export class Chatroom {
  @ApiProperty({ default: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ default: '牙遠補習房' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
