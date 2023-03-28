import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherSubjectDto } from './create-teacherSubjects.dto';

export class UpdateTeacherSubjectDto extends PartialType(CreateTeacherSubjectDto) {}
