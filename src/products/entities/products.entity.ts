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

export class Product {
  @ApiProperty({ default: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ default: '中文精讀班' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 38 })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ default: 'course' })
  @IsString()
  @IsNotEmpty()
  product_type: string;

  @ApiProperty({ default: 10 })
  @IsInt()
  @IsNotEmpty()
  avg_rating: number;

  @ApiProperty({ default: 'http://download.pdf' })
  @IsString()
  @IsNotEmpty()
  file_url: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ default: 1 })
  @IsInt()
  @IsNotEmpty()
  subject_id: number;
}
