import { Module } from '@nestjs/common';
import { CartDetailsService } from './cartDetails.service';
import { CartDetailsController } from './cartDetails.controller';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from 'utils/jwt-auth.guard';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { StripeModule } from 'nestjs-stripe';
import Stripe from 'stripe';

@Module({
	controllers: [CartDetailsController],
	imports: [
		StripeModule.forRoot({
			apiKey: process.env.STRIPE_SECRET_KEY,
			apiVersion: '2022-11-15'
		})
	],
	providers: [CartDetailsService, PrismaService, JwtService, JwtStrategy]
})
export class CartDetailsModule {}
