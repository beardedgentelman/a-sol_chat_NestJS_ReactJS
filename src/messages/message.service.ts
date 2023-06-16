import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './message.repository';
import { Message } from './schemas/message.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessagesRepository) {}

  async getMessageById(messageId: string): Promise<Message> {
    return this.messageRepository.findMessage({ messageId });
  }

  async getMessages(): Promise<Message[]> {
    return this.messageRepository.find({});
  }

  async createMessage(
    chatId: number,
    userId: number,
    messageText: string,
  ): Promise<Message> {
    return this.messageRepository.create({
      chatId,
      messageId: uuidv4(),
      messageText,
      userId,
      date: new Date(),
      isSend: true,
      isDelivered: false,
      isRead: false,
    });
  }
}
