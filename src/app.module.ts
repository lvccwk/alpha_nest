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
import { ChatoomParticipantsModule } from './chatoomParticipants/chatoomParticipants.module';
import { ChatroomHistorysModule } from './chatroomHistorys/chatroomHistorys.module';
import { ProductRatingsModule } from './productRatings/productRatings.module';
import { PrivateMessagesModule } from './privateMessages/privateMessages.module';

@Module({
  imports: [
    UsersModule,
    SubjectsModule,
    TeachersModule,
    ProductsModule,
    CartsModule,
    CartDetailsModule,
    ProductRatingsModule,
    PurchaseHistorysModule,
    TimetablesModule,
    ChatroomsModule,
    ChatroomHistorysModule,
    ChatoomParticipantsModule,
    PrivateMessagesModule,
    PrismaModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
