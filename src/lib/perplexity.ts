export const models = {
  mistral: 'mistral-7b-instruct',
  codellama: 'codellama-34b-instruct',
  mixtral: 'mixtral-8x7b-instruct',
  sonar: 'sonar-small-chat',
} as const;

export type ModelType = keyof typeof models;

class PerplexityClient {
  private client: null = null;
  private defaultModel: ModelType = 'sonar';

  constructor() {
    // Initialize client as null since we're removing the Perplexity API integration
    this.client = null;
  }

  async chat(message: string, model?: ModelType): Promise<string> {
    return this.getFallbackResponse(message);
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
    return false;
  }
}

export const perplexityClient = new PerplexityClient();