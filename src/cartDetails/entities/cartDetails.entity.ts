import { ApiProperty } from '@nestjs/swagger';
import { IsBIC, IsInt, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { isBigInt64Array } from 'util/types';

export class CartDetail {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	product_id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	cart_id: number;

	@ApiProperty({ default: false })
	@IsNotEmpty()
	is_buying: boolean;
}
