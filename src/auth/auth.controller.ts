import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserEntity } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.AuthService.login(req.user as UserEntity);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.AuthService.register(dto);
  }
}
