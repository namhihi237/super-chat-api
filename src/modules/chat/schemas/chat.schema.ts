import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: false })
  isDelete: boolean;

  @Prop({ default: Date.now })
  timestamp: Date;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);
