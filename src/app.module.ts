import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from './db/typeorm.module';

@Module({
  imports: [TypeOrmModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
