import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowedTeacherDto } from './create-followedTeachers.dto';

export class UpdateFollowedTeacherDto extends PartialType(CreateFollowedTeacherDto) {}
