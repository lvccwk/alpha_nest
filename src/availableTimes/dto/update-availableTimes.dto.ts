import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailableTimesDto } from './create-availableTimes.dto';

export class UpdateAvailableTimesDto extends PartialType(CreateAvailableTimesDto) {}
