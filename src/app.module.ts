import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatGetaway } from './chat.getaway';
import { ChatsModule } from './chats/chats.module';
import { TypeOrmModule } from './db/typeorm.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/message.module';

@Module({
  imports: [
    TypeOrmModule,
    MongooseModule.forRoot('mongodb://localhost:27017/messages'),
    UsersModule,
    AuthModule,
    ChatsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [ChatGetaway],
})
export class AppModule {}
