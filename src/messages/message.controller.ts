import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MessageService } from './message.service';
import { Message } from './schemas/message.schema';

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

  // @Post()
  // async createMessage(@Body() messageBody: CreateMessageDto, @Request() req) {
  //   const userId: number = req.user;
  //   // return this.messageService.createMessage(messageBody);
  // }
}
