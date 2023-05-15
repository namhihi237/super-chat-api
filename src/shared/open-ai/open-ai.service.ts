import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

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
      model: 'text-curie-001',
      prompt,
      max_tokens: 1000,
      temperature: 1,
      stream: false,
      n: 1,
    });

    return response.data.choices[0].text.trim();
  }
}
