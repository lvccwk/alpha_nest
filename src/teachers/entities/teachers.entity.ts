import { ApiProperty } from '@nestjs/swagger';
import { Products, TeacherSubjects } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class Teacher {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	user_id: number;

	@ApiProperty({
		default:
			'Ar Far, Ar Far為ArFar Learning中文補習導師，為理大中國語言文學碩士。熱衷於中文及教育的他，每年均會親征DSE考場並捧星而回，中文知識及考試技巧深厚，絕對無庸置疑。其輕鬆幽默的教學風格，以及課堂後的答問環節，深得學生歡心，更成功令學生於校內考試由中下游成績躍升至全級第四，寫作卷更考獲全級第一名佳績。 '
	})
	@IsString()
	@IsNotEmpty()
	info: string;

	@ApiProperty({ default: null })
	@IsInt()
	@IsOptional()
	//@IsNotEmpty()
	rating: number|null;

	@ApiProperty({ default: null })
	@IsString()
	@IsNotEmpty()
	school: string;

	@ApiProperty({ default: 0 })
	@IsInt()
	experience: number;

	teacher_subject: TeacherSubjects[];
	product: Products[];
}
