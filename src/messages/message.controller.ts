import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageService } from './message.service';
import { Message } from './schemas/message.schema';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':chatId')
  async getChatMessages(@Param('chatId') chatId: string): Promise<Message[]> {
    return this.messageService.getChatMessages(chatId);
  }

  @Post(':chatId')
  async msgIndexDBComparison(
    @Param('chatId') chatId: string,
    @Body() messagesBody: CreateMessageDto[],
  ): Promise<Message[] | boolean> {
    return this.messageService.msgIndexDBComparison(+chatId, messagesBody);
  }

  @Get()
  async getAllMessages(): Promise<Message[]> {
    return this.messageService.getAllMessages();
  }

  // @Post()
  // async createMessage(@Body() messageBody: CreateMessageDto, @Request() req) {
  //   const userId: number = req.user;
  //   // return this.messageService.createMessage(messageBody);
  // }
}
