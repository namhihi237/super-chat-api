import { Message } from './message.interface';

export interface Chat {
  conversionId: string;
  message: Message[];
}
