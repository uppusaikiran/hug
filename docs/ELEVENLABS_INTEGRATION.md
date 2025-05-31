# ElevenLabs Conversational AI Integration

This document explains how to integrate and use the ElevenLabs Conversational AI mindfulness coach feature in huggy.

## Overview

The mindfulness coach feature provides a voice-powered AI companion that users can talk to naturally about their mental wellness concerns. It uses ElevenLabs' Conversational AI technology to provide real-time voice interactions with a specialized mindfulness coach agent.

## Features

- **Real-time Voice Conversation**: Natural speech-to-speech interaction
- **Mindfulness Coaching**: Specialized AI agent trained for mental wellness support
- **Audio Visualization**: Visual feedback during conversations
- **Transcript Display**: Real-time conversation transcription
- **Flexible Integration**: Can be used as a modal or floating action button
- **Configuration Management**: Easy setup and credential management

## Setup Instructions

### 1. Create ElevenLabs Account and Agent

1. Visit [ElevenLabs Conversational AI](https://elevenlabs.io/app/conversational-ai/agents)
2. Create an account or sign in
3. Create a new conversational AI agent
4. Configure your agent with mindfulness coaching prompts and personality
5. Note down your Agent ID from the agent page

### 2. Get API Credentials

1. Go to your ElevenLabs account settings
2. Generate or copy your API key
3. Save both the API key and Agent ID

### 3. Configure the Application

You can configure the credentials in several ways:

#### Option A: Environment Variables (Recommended for production)
Create a `.env` file in your project root:

```env
VITE_ELEVENLABS_API_KEY=your_api_key_here
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
```

#### Option B: Component Props
Pass credentials directly to components:

```tsx
<MindfulnessCoach
  isOpen={true}
  onClose={() => {}}
  apiKey="your_api_key"
  agentId="your_agent_id"
/>
```

#### Option C: In-App Configuration
Users can configure credentials through the settings panel in the mindfulness coach interface.

## Usage

### Using the Mindfulness Coach Modal

```tsx
import { useState } from 'react';
import MindfulnessCoach from './components/voice/MindfulnessCoach';

function App() {
  const [showCoach, setShowCoach] = useState(false);

  return (
    <div>
      <button onClick={() => setShowCoach(true)}>
        Talk to Mindfulness Coach
      </button>
      
      <MindfulnessCoach
        isOpen={showCoach}
        onClose={() => setShowCoach(false)}
      />
    </div>
  );
}
```

### Using the Floating Action Button

```tsx
import MindfulnessCoachFAB from './components/voice/MindfulnessCoachFAB';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      <MindfulnessCoachFAB position="bottom-right" />
    </div>
  );
}
```

### Integration with Quick Start Modal

The mindfulness coach is already integrated into the `QuickStartModal` component and can be accessed through the "Talk with AI Coach" button.

## Component API

### MindfulnessCoach

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Callback when modal is closed |
| `apiKey` | `string` | No | ElevenLabs API key (overrides config) |
| `agentId` | `string` | No | ElevenLabs Agent ID (overrides config) |

### MindfulnessCoachFAB

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | `string` | No | ElevenLabs API key (overrides config) |
| `agentId` | `string` | No | ElevenLabs Agent ID (overrides config) |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | No | FAB position (default: 'bottom-right') |
| `className` | `string` | No | Additional CSS classes |

## Configuration Hook

The `useElevenLabsConfig` hook manages configuration state:

```tsx
import { useElevenLabsConfig } from './hooks/useElevenLabsConfig';

function MyComponent() {
  const { config, isConfigured, updateConfig, clearConfig } = useElevenLabsConfig();

  // Check if configured
  if (!isConfigured) {
    return <div>Please configure ElevenLabs credentials</div>;
  }

  // Update configuration
  const handleSave = () => {
    updateConfig({
      apiKey: 'new_api_key',
      agentId: 'new_agent_id'
    });
  };

  return <div>Configuration loaded</div>;
}
```

## Browser Permissions

The mindfulness coach requires microphone access. Users will be prompted to grant permission when starting a conversation. Ensure your application is served over HTTPS in production for microphone access to work.

## Error Handling

The integration includes comprehensive error handling:

- **Network errors**: Connection issues with ElevenLabs API
- **Permission errors**: Microphone access denied
- **Configuration errors**: Missing or invalid credentials
- **Audio errors**: Issues with audio playback or recording

Errors are displayed in the UI with helpful messages and suggestions for resolution.

## Best Practices

1. **Secure Credentials**: Never expose API keys in client-side code in production
2. **User Consent**: Always request explicit permission before accessing the microphone
3. **Graceful Degradation**: Provide fallback options when voice features aren't available
4. **Privacy**: Inform users about data handling and voice processing
5. **Testing**: Test with different browsers and devices for compatibility

## Troubleshooting

### Common Issues

1. **Microphone not working**
   - Check browser permissions
   - Ensure HTTPS in production
   - Test with different browsers

2. **Connection failures**
   - Verify API credentials
   - Check network connectivity
   - Ensure ElevenLabs service is available

3. **Audio playback issues**
   - Check browser audio settings
   - Verify audio codec support
   - Test with different devices

### Debug Mode

Enable debug logging by opening browser developer tools. The integration logs detailed information about:
- WebSocket connection status
- Audio processing events
- API responses
- Error details

## Security Considerations

- API keys should be stored securely
- Consider implementing rate limiting
- Monitor usage to prevent abuse
- Implement proper authentication for production use
- Be aware of data privacy regulations regarding voice data

## Support

For issues specific to the ElevenLabs integration:
1. Check the browser console for error messages
2. Verify your ElevenLabs account status and credits
3. Test with the ElevenLabs API directly
4. Contact ElevenLabs support for API-related issues

For huggy specific issues, please refer to the main project documentation. 