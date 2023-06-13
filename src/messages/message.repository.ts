import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async findMessage(
    messageFilterQuery: FilterQuery<Message>,
  ): Promise<Message> {
    return this.messageModel.findOne(messageFilterQuery);
  }

  async find(messageFilterQuery: FilterQuery<Message>): Promise<Message[]> {
    return this.messageModel.find(messageFilterQuery);
  }

  async create(message: Message): Promise<Message> {
    const newMessage = new this.messageModel(message);
    return newMessage.save();
  }

  async findOneAndUpdate(
    messageFilterQuery: FilterQuery<Message>,
    message: Partial<Message>,
  ): Promise<Message> {
    return this.messageModel.findOneAndUpdate(messageFilterQuery, message);
  }
}
