import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() id: number) {
    return this.UserService.findById(id);
  }
}
