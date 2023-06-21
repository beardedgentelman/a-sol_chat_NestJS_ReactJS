import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/users/user.repository';
import { ChatRepository } from './chat.repository';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [
    ChatRepository,
    UserRepository,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => {
        return {
          secret: ConfigService.get('SECRET_KEY'),
          signOptions: { expiresIn: ConfigService.get('EXPIRES_IN') },
        };
      },
    }),
  ],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
