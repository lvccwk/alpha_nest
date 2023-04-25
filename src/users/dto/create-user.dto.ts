import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends OmitType(User, ['id'] as const) {}
