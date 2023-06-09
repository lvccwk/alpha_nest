import { ApiProperty } from '@nestjs/swagger';
import { Teachers } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import {
	IsBIC,
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	MinLength
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
	@IsNotEmpty()
	price: number;

	@ApiProperty({ default: 'course' })
	@IsString()
	@IsNotEmpty()
	product_type: string;

	@ApiProperty({ default: 10 })
	avg_rating?: number;

	@ApiProperty({ default: 'http://download.pdf' })
	@IsString()
	@IsNotEmpty()
	file_url?: string;

	@ApiProperty({ default: 'http://download.jpg' })
	@IsString()
	@IsNotEmpty()
	image?: string;

	@ApiProperty({ default: 1 })
	subject_id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	teacher_id: number;

	@ApiProperty({ default: 'product info' })
	@IsString()
	@IsNotEmpty()
	info: string;

	@ApiProperty({ default: true })
	@IsBoolean()
	is_onsale?: boolean;
}
