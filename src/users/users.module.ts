import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [
		MulterModule.register(),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '12h' }
		})
	],
	controllers: [UsersController],
	providers: [UsersService, PrismaService, JwtService, JwtStrategy],
	exports: [UsersService]
})
export class UsersModule {}
