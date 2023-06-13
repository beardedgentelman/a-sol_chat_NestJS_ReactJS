import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserEntity } from 'src/users/entities/user.entity';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  messageId: string;

  @Prop()
  messageText: string;

  @Prop()
  user: UserEntity;

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
