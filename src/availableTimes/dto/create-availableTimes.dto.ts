import { OmitType, PartialType } from '@nestjs/swagger';
import { AvailableTime } from '../entities/availableTimes.entity';

export class CreateAvailableTimesDto extends OmitType(AvailableTime, ['id'] as const) {}
