import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class TeacherSubject {
	@ApiProperty({ default: 1 })
	@IsInt()
	id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	teacher_id: number;

	@ApiProperty({ default: 1 })
	@IsInt()
	subject_id: number;
}
