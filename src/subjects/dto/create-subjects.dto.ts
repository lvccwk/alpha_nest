import { OmitType, PartialType } from '@nestjs/swagger';
import { Subject } from '../entities/subjects.entity';

export class CreateSubjectDto extends OmitType(Subject, ['id'] as const) {}
