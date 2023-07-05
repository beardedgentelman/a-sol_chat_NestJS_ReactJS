import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.chatService.createChat(req, chatDto);
  }

  @Get(':chatId')
  async getChat(@Param() par) {
    const { chatId } = par;

    return this.chatService.getChat(chatId);
  }

  @Post(':chatId')
  async joinChat(@Param('chatId') chatId: number, @Body() body) {
    const userId = body.userId;
    return this.chatService.joinChat(chatId, userId);
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
