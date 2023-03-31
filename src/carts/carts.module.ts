import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { PrismaService } from 'nestjs-prisma';
import { CartsController } from './carts.controller';
import { JwtAuthGuard } from 'utils/jwt-auth.guard';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CartsController],
  providers: [CartsService, PrismaService, JwtService, JwtStrategy],
})
export class CartsModule {}
