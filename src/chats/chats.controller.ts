import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ChatsService } from './chats.service';
import { ChatDto } from './dto/chat.dto';
import { ChatOwnerGuard } from './guards/chatOwner.guard';

@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post('create-chat')
  async createChat(@Request() req, @Body() chatDto: ChatDto) {
    const id: number = req.user;

    return this.chatService.createChat(id, chatDto);
  }

  @Post(':chatId')
  async joinChat(@Param('chatId') chatId: number, @Request() req) {
    const userId: number = req.user;

    return this.chatService.joinChat(userId, chatId);
  }

  @Delete(':chatId')
  async leaveChat(@Param('chatId') chatId: number, @Request() req) {
    const userId: number = req.user;

    return this.chatService.leaveChat(userId, chatId);
  }

  @UseGuards(ChatOwnerGuard)
  @Delete(':chatId/users/:userId')
  async deleteUserFromChat(
    @Param('chatId') chatId: number,
    @Param('userId') userId: number,
  ) {
    return this.chatService.deleteUserFromChat(chatId, userId);
  }

  @UseGuards(ChatOwnerGuard)
  @Delete(':chatId')
  async deleteChat(@Param('chatId') chatId: number) {
    return this.chatService.deleteChat(chatId);
  }
}
