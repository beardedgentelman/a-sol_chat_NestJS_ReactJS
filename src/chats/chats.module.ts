import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/user.repository';
import { ChatRepository } from './chat.repository';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [ChatRepository, UserRepository],
  providers: [ChatsService, JwtService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
