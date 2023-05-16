import { Injectable } from '@nestjs/common';
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from 'openai';
import { ModelAI } from '../../constants/openai-model';

interface ChatCompletion {
  content: string;
  role: string;
}
@Injectable()
export class OpenAiService {
  private openAi: OpenAIApi;
  private configuration = new Configuration({
    organization: 'org-PG4HEchVWAaeFDYHQZ5PIKPP',
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor() {
    this.openAi = new OpenAIApi(this.configuration);
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.openAi.createCompletion({
      model: ModelAI.Curie,
      prompt,
      max_tokens: 1000,
      temperature: 1,
      stream: false,
      n: 1,
    });

    return response.data.choices[0].text.trim();
  }

  async chatCompletions(
    messages: ChatCompletionRequestMessage[] = [],
  ): Promise<ChatCompletion> {
    const response: CreateChatCompletionResponse | any =
      await this.openAi.createChatCompletion({
        model: ModelAI.ChatCompletions,
        messages,
        stream: false,
        n: 1,
        temperature: 0.8,
        max_tokens: 500,
      });

    console.log(response.data);

    const { content, role } = response.data.choices[0].message;

    return { content, role };
  }
}
