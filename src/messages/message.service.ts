import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessagesRepository } from './message.repository';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessagesRepository) {}

  async getChatMessages(chatId: string): Promise<Message[]> {
    return await this.messageRepository.findMessages({ chatId });
  }

  async msgIndexDBComparison(chatId: number, messagesBody) {
    const messagesDB = await this.messageRepository.findMessages({ chatId });
    messagesDB.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const last100Messages = messagesDB.slice(-100);

    for (const message of last100Messages) {
      const messageDate = new Date(message.date);

      for (const bodyMessage of messagesBody) {
        const bodyMessageDate = new Date(bodyMessage.date);

        if (messageDate.getTime() === bodyMessageDate.getTime()) {
          return true;
        }
      }
    }

    return last100Messages;
  }

  async getAllMessages(): Promise<Message[]> {
    return await this.messageRepository.findAll({});
  }

  async createMessage(messageBody: CreateMessageDto): Promise<Message> {
    const message: Message = {
      chatId: messageBody.chatId,
      messageId: messageBody.id,
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
