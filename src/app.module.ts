import { TypeOrmModule } from '@db/typeorm.module';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [TypeOrmModule, UsersModule, FilesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
