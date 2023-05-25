import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';

export const UserRepository = TypeOrmModule.forFeature([UserEntity]);
