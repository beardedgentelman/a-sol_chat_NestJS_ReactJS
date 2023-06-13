import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UserRepository],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
