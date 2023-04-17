import { OmitType, PartialType } from '@nestjs/swagger';
import { FollowedTeacher } from '../entities/followedTeachers.entity';

export class CreateFollowedTeacherDto extends OmitType(FollowedTeacher, ['id'] as const) {}
