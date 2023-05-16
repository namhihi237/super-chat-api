import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  answer: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop()
  role: ChatCompletionRequestMessageRoleEnum;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
