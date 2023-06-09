import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  userAvatar: string;
}

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  messageId: string;

  @Prop()
  messageText: string;

  @Prop()
  user: IUser;

  @Prop()
  date: string;

  @Prop()
  isSend: boolean;

  @Prop()
  isDelivered: boolean;

  @Prop()
  isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
