import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageRepository: Model<Message>,
  ) {}

  async getMessageById(messageId: string): Promise<Message> {
    return this.messageRepository.findOne({ messageId });
  }

  async getMessages(): Promise<Message[]> {
    return this.messageRepository.find({});
  }

  async createMessage(messageBody: CreateMessageDto): Promise<Message> {
    console.log(messageBody);

    return this.messageRepository.create({
      chatId: messageBody.chatId,
      messageId: uuidv4(),
      messageText: messageBody.text,
      userId: messageBody.userId,
      date: new Date(),
      isSend: true,
      isDelivered: false,
      isRead: false,
    });
  }
}
