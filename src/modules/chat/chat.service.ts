import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/message.dto';
import { Message } from './schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schema';
import { OpenAiService } from '../../shared/open-ai/open-ai.service';
import { ChatType } from './dto/message.dto';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    private openAi: OpenAiService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const { content, chatId, type } = createMessageDto;
    let currentChatId = chatId;

    if (!currentChatId) {
      const chat = await this.chatModel.create({ name: content.slice(0, 30) });
      currentChatId = chat.id;
    }

    if (type === ChatType.Chat) {
      const answer = await this.openAi.generateResponse(content);

      const message = await this.messageModel.create({
        content,
        chatId: currentChatId,
        answer,
      });
      return message;
    } else if (type === ChatType.ChatCompletion) {
      await this.messageModel.create({
        content,
        chatId: currentChatId,
        role: 'user',
      });
      const messageHistories = await this.messageModel.find({
        chatId: currentChatId,
      });
      const messages = messageHistories.map((message) => {
        return { content: message.content, role: message.role };
      });

      const responseMessage = await this.openAi.chatCompletions(messages);
      return this.messageModel.create({
        content: responseMessage.content,
        role: responseMessage.role,
        chatId: currentChatId,
      });
    }
  }

  async getChats() {
    return this.chatModel.find({}, { __v: 0 }).sort({ updatedAt: -1 });
  }

  async getChat(chatId: string) {
    return this.chatModel.findById(chatId);
  }

  async getMessagesByChatId(chatId: string) {
    return this.messageModel.find({ chatId });
  }

  async deleteChat(id: string) {
    return this.chatModel.findByIdAndUpdate(id, { isDelete: true });
  }
}
