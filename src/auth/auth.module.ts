import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtStrategy } from './strategy/jwt.strategy';
import { localStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UsersModule,
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
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, jwtStrategy],
})
export class AuthModule {}
