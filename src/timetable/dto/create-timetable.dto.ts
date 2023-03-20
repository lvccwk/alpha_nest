import { OmitType, PartialType } from '@nestjs/swagger';
import { Timetable } from '../entities/timetable.entity';

export class CreateTimetableDto extends OmitType(Timetable, ['id'] as const) {}
