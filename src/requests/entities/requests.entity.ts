import { ApiProperty } from '@nestjs/swagger';
import { AvailableTimes } from '@prisma/client';
import { IsBIC, IsInt, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { isBigInt64Array } from 'util/types';

export class Request {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number;

	@ApiProperty({ default: '時間timestampz' })
	@IsString()
	@IsNotEmpty()
	status: string;

	@ApiProperty({ default: 2 })
	@IsInt()
	@IsNotEmpty()
	user_id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	teacher_id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	available_time_id: number;
}
