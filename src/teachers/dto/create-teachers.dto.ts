import { OmitType, PartialType } from '@nestjs/swagger';
import { Teacher } from '../entities/teachers.entity';

export class CreateTeacherDto extends OmitType(Teacher, ['id'] as const) {}
