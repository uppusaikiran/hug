import { PerplexityAI } from 'pplx-api';

export const models = {
  mistral: 'mistral-7b-instruct',
  codellama: 'codellama-34b-instruct',
  mixtral: 'mixtral-8x7b-instruct',
  sonar: 'sonar-small-chat',
} as const;

export type ModelType = keyof typeof models;

class PerplexityClient {
  private client: PerplexityAI | null = null;
  private defaultModel: ModelType = 'sonar';

  constructor() {
    const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
    if (apiKey) {
      this.client = new PerplexityAI({ apiKey });
    }
  }

  async chat(message: string, model?: ModelType): Promise<string> {
    if (!this.client) {
      return this.getFallbackResponse(message);
    }

    try {
      const response = await this.client.chat({
        model: models[model || this.defaultModel],
        messages: [{
          role: 'user',
          content: message
        }]
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Perplexity API error:', error);
      return this.getFallbackResponse(message);
    }
  }

  private getFallbackResponse(message: string): string {
    const responses = [
      "I understand you're feeling that way. Would you like to talk more about it?",
      "That sounds challenging. How can I help support you through this?",
      "I'm here to listen. What would be most helpful for you right now?",
      "Your feelings are valid. Would you like to explore some coping strategies together?",
      "Thank you for sharing that with me. How long have you been feeling this way?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  isConfigured(): boolean {
    return this.client !== null;
  }
}

export const perplexityClient = new PerplexityClient();