import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/message.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.chatService.createMessage(createMessageDto);
  }

  @Get()
  async getChats() {
    return this.chatService.getChats();
  }
}
