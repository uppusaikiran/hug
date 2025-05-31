import { marked } from 'marked';

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

interface SearchResult {
  title: string;
  url: string;
  date: string;
}

interface PerplexityResponse {
  id: string;
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
  citations?: string[];
  search_results?: SearchResult[];
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
      return this.formatResponse(data);
    } catch (error) {
      console.error('Perplexity API error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private formatResponse(response: PerplexityResponse): string {
    let formattedText = response.choices[0].message.content;
    const citations: string[] = [];

    // Add citations and search results if available
    if (response.citations?.length || response.search_results?.length) {
      formattedText += '\n\n---\n\n### Sources\n\n';
      
      // Format citations with clickable links
      if (response.citations?.length) {
        response.citations.forEach((citation, index) => {
          // Add citation reference in text
          formattedText = formattedText.replace(
            `[${index + 1}]`, 
            `<a href="#citation-${index + 1}" class="citation-link">[${index + 1}]</a>`
          );
          // Add citation to list
          citations.push(`<div id="citation-${index + 1}" class="citation-item">
            <span class="citation-number">[${index + 1}]</span>
            <span class="citation-text">${citation}</span>
          </div>`);
        });
      }

      // Format search results as clickable links
      if (response.search_results?.length) {
        response.search_results.forEach(result => {
          const date = result.date ? ` (${result.date})` : '';
          citations.push(`<div class="search-result">
            <a href="${result.url}" target="_blank" rel="noopener noreferrer" class="search-link">
              ${result.title}${date}
              <span class="external-link">↗</span>
            </a>
          </div>`);
        });
      }

      // Add citations to the end
      if (citations.length > 0) {
        formattedText += citations.join('\n');
      }
    }

    // Convert markdown to HTML
    return marked(formattedText, { mangle: false, headerIds: false });
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
    
    const index = message.length % responses.length;
    return responses[index];
  }
}

export const perplexityClient = new PerplexityClient();