import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonResponseInterceptor } from './interceptors/response';
import { OpenAiModule } from './shared/open-ai/open-ai.module';
import { config } from 'dotenv';
import { ThrottlerModule } from '@nestjs/throttler';
import { UtilsService } from './shared/utils/utils.service';
import { UtilsModule } from './shared/utils/utils.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
config();
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // Time-to-live for rate limiter
      limit: 30, // Maximum requests allowed in the defined duration
    }),
    ChatModule,
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
    OpenAiModule,
    UtilsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CommonResponseInterceptor },
    UtilsService,
    AuthService,
  ],
})
export class AppModule {}
