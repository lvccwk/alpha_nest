import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from './create-teachers.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
