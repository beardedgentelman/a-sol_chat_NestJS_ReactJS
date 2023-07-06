import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChatRepository } from 'src/chats/chat.repository';
import { ChatsService } from 'src/chats/chats.service';
import { UserRepository } from 'src/users/user.repository';
import { ChatGateway } from './gateway';

@Module({
  imports: [ChatRepository, UserRepository],
  providers: [ChatGateway, ChatsService, JwtService],
})
export class GatewayModule {}
