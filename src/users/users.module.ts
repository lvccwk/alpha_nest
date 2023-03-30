import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module( {
	imports: [
		JwtModule.register({
		secret: process.env.JWT_SECRET,
		signOptions: { expiresIn: '12h' },
		})
		],
	controllers: [UsersController],
	providers: [UsersService, PrismaService, JwtService],
	exports: [UsersService] //
})
export class UsersModule {}
