import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './message.repository';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessagesRepository) {}

  async getMessageById(id: string): Promise<Message> {
    return this.messageRepository.findMessage({ id });
  }

  async getMessages(): Promise<Message[]> {
    return this.messageRepository.find({});
  }

  async createMessage();
}
