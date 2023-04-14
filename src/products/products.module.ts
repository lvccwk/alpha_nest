import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';

@Module({
	controllers: [ProductsController],
	providers: [ProductsService, PrismaService, JwtService, JwtStrategy]
})
export class ProductsModule {}
