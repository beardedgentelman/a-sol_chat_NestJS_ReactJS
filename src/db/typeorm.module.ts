import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
// import { FilesEntity } from 'src/files/entities/file.entity';
// import { UsersEntity } from 'src/users/entities/users.entity';
import { join } from 'path';

const entitiesPath = join(__dirname, '..', '/**/*.entity{.ts,.js}');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    NestTypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        // entities: [UsersEntity, FilesEntity],
        entities: [entitiesPath],
        autoLoadEntities: true,
        synchronize: true,
        // migrations: ['dist/db/migrations/**/*.js'],
        // cli: { migrationsDir: 'src/db/migrations' },
      }),
    }),
  ],
})
export class TypeOrmModule {}
