# AI Integration Guide

This document covers the integration of various AI services in Solace.

## Perplexity Integration

The main chat functionality uses Perplexity's API for natural language understanding and response generation.

### Configuration

1. Get API key from [Perplexity](https://perplexity.ai)
2. Add to `.env`:
   ```env
   VITE_PERPLEXITY_API_KEY=your_key_here
   ```

### Available Models

- `sonar-deep-research`: Best for research with citations
- `sonar-reasoning-pro`: Enhanced reasoning capabilities
- `sonar`: Fast, general-purpose chat
- See `src/lib/perplexity.ts` for full list

## ElevenLabs Integration

Voice synthesis and processing for natural conversations.

### Setup

1. Create account at [ElevenLabs](https://elevenlabs.io)
2. Configure in `.env`:
   ```env
   VITE_ELEVENLABS_API_KEY=your_key_here
   VITE_ELEVENLABS_AGENT_ID=your_agent_id
   ```

## Tavus Integration

Video conversations with AI wellness coach.

### Configuration

See [VIDEO_FEATURES.md](VIDEO_FEATURES.md) for detailed setup.