import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class User {
  @ApiProperty({ default: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ default: 'teacher' })
  @IsString()
  @IsNotEmpty()
  user_type: string;

  @ApiProperty({ default: 'arfar' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 'arfar@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'adminadmin' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ default: 'admin.png' })
  @IsString()
  @IsNotEmpty()
  image: string;

  // @ApiProperty({ default: '98765432' })
  // @IsNotEmpty()
  // @IsPhoneNumber('HK')
  // phone: string;
}
