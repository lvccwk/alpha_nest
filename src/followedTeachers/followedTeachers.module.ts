import { Module } from '@nestjs/common';
import { FollowedTeachersService } from './followedTeachers.service';
import { FollowedTeachersController } from './followedTeachers.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';

@Module({
	controllers: [FollowedTeachersController],
	providers: [FollowedTeachersService, PrismaService, JwtService, JwtStrategy]
})
export class FollowedTeachersModule {}
