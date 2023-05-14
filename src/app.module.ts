import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot('mongodb://localhost:27017/chatdb'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
