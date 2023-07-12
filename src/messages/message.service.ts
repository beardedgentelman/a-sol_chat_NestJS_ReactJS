import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessagesRepository } from './message.repository';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessagesRepository) {}

  async getMessageById(messageId: string): Promise<Message> {
    return await this.messageRepository.findMessage({ messageId });
  }

  async getMessages(): Promise<Message[]> {
    return await this.messageRepository.find({});
  }

  async createMessage(messageBody: CreateMessageDto): Promise<Message> {
    const message: Message = {
      chatId: messageBody.chatId,
      messageId: uuidv4(),
      messageText: messageBody.text,
      userId: messageBody.userId,
      date: new Date().toString(),
      isSend: true,
      isDelivered: false,
      isRead: false,
    };

    return await this.messageRepository.create(message);
  }
}
