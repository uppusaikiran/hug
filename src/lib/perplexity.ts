export const models = {
  mistral: 'mistral-7b-instruct',
  codellama: 'codellama-34b-instruct',
  mixtral: 'mixtral-8x7b-instruct',
  sonar: 'sonar-small-chat',
} as const;

export type ModelType = keyof typeof models;

class PerplexityClient {
  private apiKey: string | undefined;
  private defaultModel: ModelType = 'sonar';

  constructor() {
    this.apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
  }

  async chat(message: string, model?: ModelType): Promise<string> {
    if (!this.apiKey) {
      return this.getFallbackResponse(message);
    }

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: models[model || this.defaultModel],
          messages: [{ role: 'user', content: message }]
        })
      });

      if (!response.ok) {
        console.error('Perplexity API error:', response.status);
        return this.getFallbackResponse(message);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Perplexity API:', error);
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
    return Boolean(this.apiKey);
  }
}

export const perplexityClient = new PerplexityClient();