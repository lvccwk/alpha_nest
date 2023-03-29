import { Module } from '@nestjs/common';
import { FollowedTeachersService } from './followedTeachers.service';
import { FollowedTeachersController } from './followedTeachers.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
	controllers: [FollowedTeachersController],
	providers: [FollowedTeachersService, PrismaService]
})
export class FollowedTeachersModule {}
