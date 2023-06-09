import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';

export const ChatRepository = TypeOrmModule.forFeature([ChatEntity]);
