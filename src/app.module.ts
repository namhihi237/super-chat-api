import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonResponseInterceptor } from './interceptors/response';
import { OpenAiModule } from './shared/open-ai/open-ai.module';
@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot('mongodb://localhost:27017/chatdb'),
    OpenAiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CommonResponseInterceptor },
  ],
})
export class AppModule {}
