import { ApiProperty } from '@nestjs/swagger';
import { Requests } from '@prisma/client';
import { IsBIC, IsInt, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { isBigInt64Array } from 'util/types';

export class AvailableTime {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number;

	@ApiProperty({ default: '時間timestampz' })
	@IsString()
	@IsNotEmpty()
	time_slot: string;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	time_during: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	teacher_id: number;

	reqest: Requests[];
}
