import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/message.dto';
import { Types } from 'mongoose';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @SkipThrottle(false)
  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.chatService.createMessage(createMessageDto);
  }

  @Get()
  async getChats() {
    return this.chatService.getChats();
  }

  @Get('/:id')
  async getChat(@Param('id') id: string) {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'Chat not found' });
    }

    const chat = await this.chatService.getChat(id);
    if (!chat) {
      throw new BadRequestException({ message: 'Chat not found' });
    }

    return this.chatService.getMessagesByChatId(id);
  }

  @Delete('/:id')
  async deleteChat(@Param('id') id: string) {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'Chat not found' });
    }

    const chat = await this.chatService.getChat(id);
    if (!chat) {
      throw new BadRequestException({ message: 'Chat not found' });
    }

    return this.chatService.deleteChat(id);
  }
}
