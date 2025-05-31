export const models = {
  'sonar-deep-research': 'sonar-deep-research',
  'sonar-reasoning-pro': 'sonar-reasoning-pro',
  'sonar-reasoning': 'sonar-reasoning',
  'sonar-pro': 'sonar-pro',
  'sonar': 'sonar',
  'r1-1776': 'r1-1776'
};

export type ModelType = keyof typeof models;

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

export class PerplexityClient {
  private apiKey: string | undefined;
  private model: string;
  private baseUrl = 'https://api.perplexity.ai/chat/completions';

  constructor(model = models.sonar) {
    this.apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
    this.model = model;
  }

  async chat(userMessage: string, model?: ModelType): Promise<string> {
    if (!this.apiKey) {
      console.warn('Perplexity API Not Configured\nUsing fallback responses. Add VITE_PERPLEXITY_API_KEY to enable AI chat.');
      return this.getFallbackResponse(userMessage);
    }

    if (model) {
      this.model = models[model];
    }

    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are HUG, an empathetic AI mental health companion. Provide supportive, understanding responses while maintaining appropriate boundaries and encouraging professional help when needed.'
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Perplexity API error: ${response.status}\n${errorData}`);
      }

      const data: PerplexityResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Perplexity API error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  getFallbackResponse(message: string): string {
    const responses = [
      "I'm here to listen and support you. Would you like to tell me more about what's on your mind?",
      "That sounds challenging. How are you feeling about it?",
      "I understand this is difficult. What kind of support would be most helpful right now?",
      "You're not alone in this. I'm here to help you work through it.",
      "It's okay to feel this way. Would you like to explore some coping strategies together?",
      "Thank you for sharing that with me. How long have you been feeling this way?",
      "Let's take a moment to focus on your wellbeing. What would help you feel more at ease right now?",
      "I hear you, and your feelings are valid. Would you like to talk more about it?"
    ];
    
    // Simple selection based on message length to maintain some variety
    const index = message.length % responses.length;
    return responses[index];
  }
}

export const perplexityClient = new PerplexityClient();