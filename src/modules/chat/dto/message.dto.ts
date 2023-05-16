import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export enum ChatType {
  Chat = 'chat',
  ChatCompletion = 'chatCompletion',
}

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  chatId: string;

  @IsOptional()
  @IsString()
  type: ChatType;
}
