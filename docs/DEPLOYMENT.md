# Deployment Guide

## Prerequisites

- Node.js 18+
- npm/yarn
- Supabase account
- AI service API keys

## Build Process

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## Environment Setup

Create `.env` file:
```env
# API Keys
VITE_PERPLEXITY_API_KEY=
VITE_ELEVENLABS_API_KEY=
VITE_TAVUS_API_KEY=

# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Deployment Options

### Netlify

1. Connect to GitHub
2. Set environment variables
3. Deploy with:
   ```bash
   netlify deploy --prod
   ```

### Vercel

1. Import from GitHub
2. Configure environment variables
3. Deploy automatically

## Post-Deployment

1. Test all features
2. Monitor error reporting
3. Check API integrations