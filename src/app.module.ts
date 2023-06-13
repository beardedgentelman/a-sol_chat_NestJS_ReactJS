import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatGetaway } from './chat.getaway';
import { ChatsModule } from './chats/chats.module';
import { TypeOrmModule } from './db/typeorm.module';

@Module({
  imports: [
    TypeOrmModule,
    // MongooseModule.forRoot('mongodb://localhost/messages'),
    UsersModule,
    AuthModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [ChatGetaway],
})
export class AppModule {}
