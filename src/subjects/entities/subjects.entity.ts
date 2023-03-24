import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class Subject {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number;

	@ApiProperty({ default: 'chinese' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ default: '中文' })
	@IsString()
	@IsNotEmpty()
	chinese_name: string;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	user_id: number;
}
