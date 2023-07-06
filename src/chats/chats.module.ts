import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/user.repository';
import { ChatRepository } from './chat.repository';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [
    ChatRepository,
    UserRepository,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (ConfigService: ConfigService) => {
    //     return {
    //       secret: ConfigService.get('SECRET_KEY'),
    //       signOptions: { expiresIn: ConfigService.get('EXPIRES_IN') },
    //     };
    //   },
    // }), // ????
  ],
  providers: [ChatsService, JwtService],
  controllers: [ChatsController],
  exports: [ChatsService],
})
export class ChatsModule {}
