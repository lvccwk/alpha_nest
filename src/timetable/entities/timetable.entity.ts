import { ApiProperty } from '@nestjs/swagger';
import {
  IsBIC,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  isString,
  IsString,
  MinLength,
} from 'class-validator';
import { isBigInt64Array } from 'util/types';

export class Timetable {
  @ApiProperty({ default: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ default: `2023-03-18 16:00:00` })
  @IsString()
  time_slot: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ default: 1 })
  @IsInt()
  @IsNotEmpty()
  subject_id: number;
}
