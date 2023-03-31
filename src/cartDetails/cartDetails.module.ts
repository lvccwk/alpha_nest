import { Module } from '@nestjs/common';
import { CartDetailsService } from './cartDetails.service';
import { CartDetailsController } from './cartDetails.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from 'utils/jwt-auth.guard';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CartDetailsController],
  providers: [CartDetailsService, PrismaService,JwtService,JwtStrategy],
})
export class CartDetailsModule {}
