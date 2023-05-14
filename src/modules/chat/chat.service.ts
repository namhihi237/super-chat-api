import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/message.dto';
import { Message } from './schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const { content, chatId } = createMessageDto;
    let currentChatId = chatId;
    console.log(createMessageDto, currentChatId);

    if (!currentChatId) {
      console.log('create chat');

      const chat = await this.chatModel.create({ name: content.slice(0, 30) });
      console.log(chat);

      currentChatId = chat.id;
    }
    console.log(currentChatId);

    const message = await this.messageModel.create({
      content,
      chatId: currentChatId,
      sender: 'user',
    });

    return message;
  }
}
