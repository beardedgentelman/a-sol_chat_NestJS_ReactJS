import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/createMessage.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':messageId')
  async getMessage(@Param('messageId') messageId: string): Promise<Message> {
    return this.messageService.getMessageById(messageId);
  }

  @Get()
  async getMessages(): Promise<Message[]> {
    return this.messageService.getMessages();
  }

  @Post()
  async createMessage(
    @Body() createMessage: CreateMessageDto,
    @Request() req,
  ): Promise<Message> {
    const userId: number = req.user;
    return this.messageService.createMessage(
      createMessage.chatId,
      userId,
      createMessage.messageText,
    );
  }
}
