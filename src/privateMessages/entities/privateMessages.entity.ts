import { ApiProperty } from '@nestjs/swagger';
import { IsBIC, IsInt, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { isBigInt64Array } from 'util/types';

export class PrivateMessage {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	from_id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	@IsNotEmpty()
	to_id: number;

	@ApiProperty({
		default: 'HI, 中大「箭無不勝」 機械人賽三料冠軍 將再代表香港 出戰青島國際賽 '
	})
	@IsString()
	@IsNotEmpty()
	content: string;
}
