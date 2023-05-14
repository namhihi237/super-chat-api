import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/message.dto';
import { Chat } from './schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.chatModel.create({
      ...createMessageDto,
      sender: 'user',
    });

    return message;
  }
}
