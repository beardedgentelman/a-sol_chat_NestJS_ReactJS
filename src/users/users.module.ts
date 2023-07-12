import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UserRepository],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
