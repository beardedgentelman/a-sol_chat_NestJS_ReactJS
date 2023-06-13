import { Module } from '@nestjs/common';
import { UserRepository } from 'src/users/user.repository';
import { ChatRepository } from './chat.repository';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [ChatRepository, UserRepository],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
