import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartDetailsModule } from './cartDetails/cartDetails.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ProductsModule } from './products/products.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';
import { PurchaseHistorysModule } from './purchaseHistorys/purchaseHistorys.module';
import { TimetablesModule } from './timetable/timetable.module';
import { CartsModule } from './carts/carts.module';
import { ChatroomsModule } from './chatrooms/chatrooms.module';
import { ChatroomHistorysModule } from './chatroomHistorys/chatroomHistorys.module';
import { ProductRatingsModule } from './productRatings/productRatings.module';
import { PrivateMessagesModule } from './privateMessages/privateMessages.module';
import { ChatroomParticipantsModule } from './chatoomParticipants/chatoomParticipants.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'utils/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { FollowedTeacher } from './followedTeachers/entities/followedTeachers.entity';
import { FollowedTeachersModule } from './followedTeachers/followedTeachers.module';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from 'nestjs-stripe';
import { ChatGateway } from './chat/chat.gateway';
import { AvailableTimesModule } from './availableTimes/availableTimes.module';
import { RequestModule } from './requests/requests.module';

@Module({
	imports: [
		UsersModule,
		SubjectsModule,
		TeachersModule,
		FollowedTeachersModule,
		ProductsModule,
		CartsModule,
		CartDetailsModule,
		ProductRatingsModule,
		PurchaseHistorysModule,
		TimetablesModule,
		ChatroomsModule,
		ChatroomHistorysModule,
		ChatroomParticipantsModule,
		PrivateMessagesModule,
		AuthModule,
		PrismaModule.forRoot(),
		StripeModule,
		AvailableTimesModule,
		RequestModule
	],
	controllers: [AppController],
	providers: [AppService, ChatGateway]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
