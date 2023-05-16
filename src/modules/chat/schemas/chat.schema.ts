import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Chat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: false })
  isDelete: boolean;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);
