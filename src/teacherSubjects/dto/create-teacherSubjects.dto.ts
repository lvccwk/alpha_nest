import { OmitType, PartialType } from '@nestjs/swagger';
import { TeacherSubject } from '../entities/teacherSubjects.entity';

export class CreateTeacherSubjectDto extends OmitType(TeacherSubject, ['id'] as const) {}
