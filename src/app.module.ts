import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { TypeOrmModule } from './db/typeorm.module';
import { GatewayModule } from './gateway/gateway.module';
import { MessagesModule } from './messages/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule,
    MongooseModule.forRoot(process.env.MONGO_HOST),
    UsersModule,
    AuthModule,
    ChatsModule,
    MessagesModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
