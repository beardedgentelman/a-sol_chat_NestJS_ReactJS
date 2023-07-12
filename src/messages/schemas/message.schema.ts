import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  chatId: number;

  @Prop({ default: () => uuidv4() })
  messageId: string;

  @Prop()
  messageText: string;

  @Prop()
  userId: number;

  @Prop({ default: Date.UTC })
  date: string;

  @Prop({ default: true })
  isSend: boolean;

  @Prop({ default: false })
  isDelivered: boolean;

  @Prop({ default: false })
  isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
