# Tavus AI Video Integration Guide

This document explains how huggy integrates with Tavus to provide real-time AI video conversations using the Conversational Video Interface (CVI).

## Overview

huggy now features **two AI interaction modes**:

1. **Voice-Only Chat** - Audio-based conversations using ElevenLabs
2. **Video Chat** - Real-time face-to-face conversations using Tavus CVI

## Tavus Integration Features

### Core Technologies
- **Tavus Conversational Video Interface (CVI)** - Real-time video conversations
- **Phoenix-3 Replica Model** - Hyper-realistic AI avatars
- **Sparrow-0 Turn-Taking Model** - Natural conversation flow
- **Raven-0 Perception Model** - Visual and emotional understanding
- **Daily.co WebRTC** - Video calling infrastructure

### Key Components

#### 1. VideoCoach Component (`src/components/voice/VideoCoach.tsx`)
The main component for video-based AI conversations:
- Creates Tavus conversations via API
- Manages WebRTC video calls using Daily.co
- Handles real-time interaction protocol
- Provides media controls (camera, microphone)

#### 2. EnhancedCoachFAB Component (`src/components/voice/EnhancedCoachFAB.tsx`)
Enhanced floating action button that offers:
- Choice between voice and video modes
- Animated interface with smooth transitions
- Position-flexible design

#### 3. useTavusConfig Hook (`src/hooks/useTavusConfig.ts`)
Manages Tavus configuration:
- API key management
- Replica and persona configuration
- Local storage integration

## Setup Instructions

### 1. Environment Variables

Add these to your `.env` file:

```env
# Tavus Configuration
VITE_TAVUS_API_KEY=your_tavus_api_key_here
VITE_TAVUS_REPLICA_ID=your_replica_id_here  # Optional, uses default
VITE_TAVUS_PERSONA_ID=your_persona_id_here  # Optional, uses default
```

### 2. Get Tavus API Credentials

1. **Sign up for Tavus**: Visit [tavus.io](https://www.tavus.io) and create an account
2. **Get API Key**: Navigate to your dashboard and generate an API key
3. **Choose Replica**: Select from stock replicas or create a custom one
4. **Configure Persona**: Set up a mindfulness/wellness persona

### 3. Required Configuration

To use Tavus video chat, you need all three credentials:
- **API Key**: Your Tavus API key from the dashboard
- **Replica ID**: ID of the AI avatar you want to use
- **Persona ID**: ID of the conversation personality/style

**Important**: There are no working default values - you must obtain these from your Tavus account.

## Usage Flow

### Starting a Video Session

1. **User clicks the Enhanced FAB** → Options menu appears
2. **Select "Video Chat"** → VideoCoach component opens
3. **System creates conversation** → Calls Tavus API to create session
4. **User joins video call** → Daily.co WebRTC connection established
5. **AI joins automatically** → Replica appears and starts conversation

### Conversation Features

- **Real-time video** with lifelike AI avatar
- **Natural turn-taking** using Sparrow-0 model
- **Emotional awareness** via Raven-0 perception
- **Wellness-focused** persona specialized in mindfulness
- **30-minute sessions** with auto-timeout
- **Media controls** for camera/microphone

## API Integration Details

### Creating a Conversation

```javascript
const response = await fetch('https://tavusapi.com/v2/conversations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': config.apiKey
  },
  body: JSON.stringify({
    replica_id: config.replicaId,
    persona_id: config.personaId,
            conversation_name: 'huggy Wellness Session',
    conversational_context: 'Wellness coach specializing in mindfulness...',
    custom_greeting: 'Hello! I'm your personal wellness coach...',
    properties: {
      max_call_duration: 1800, // 30 minutes
      enable_closed_captions: true,
      language: 'english'
    }
  })
});
```

### Interaction Protocol

The integration uses Daily.co's app-message system for real-time interactions:

```javascript
// Sending interactions to the AI
call.sendAppMessage({
  message_type: 'conversation',
  event_type: 'conversation.text_respond',
  conversation_id: conversationId,
  properties: {
    text: 'Can you guide me through a breathing exercise?'
  }
});

// Receiving events from the AI
call.on('app-message', (event) => {
  if (event.data.event_type === 'conversation.utterance') {
    console.log('AI spoke:', event.data.properties.text);
  }
});
```

## Benefits of Video Integration

### Enhanced User Experience
- **Face-to-face connection** creates more engaging interactions
- **Visual feedback** from AI's facial expressions and reactions
- **Natural conversation flow** with proper timing and turn-taking
- **Emotional intelligence** through visual perception

### Technical Advantages
- **Real-time rendering** with ultra-low latency (~600ms)
- **Hyper-realistic avatars** using Phoenix-3 model
- **Robust infrastructure** powered by Daily.co WebRTC
- **Scalable solution** handling multiple concurrent users

### Wellness Application
- **Increased engagement** through visual connection
- **Better therapy outcomes** with face-to-face interaction
- **Non-verbal communication** enhancing understanding
- **Personalized experience** adapting to user emotions

## Fallback and Error Handling

### Graceful Degradation
- **No API key**: Falls back to setup instructions
- **Connection issues**: Provides retry mechanisms
- **WebRTC failures**: Offers voice-only alternative

### Error States
- Configuration errors with helpful guidance
- Network connection troubleshooting
- Media permission handling

## Performance Considerations

### Optimization
- **Lazy loading** of Daily.co SDK
- **Connection pooling** for better performance
- **Automatic cleanup** of resources
- **Memory management** for long sessions

### Browser Support
- Modern browsers with WebRTC support
- Camera and microphone permissions required
- Fallback messaging for unsupported browsers

## Future Enhancements

### Planned Features
- **Multi-language support** (30+ languages available)
- **Custom avatar training** for personalized experiences
- **Session recording** for progress tracking
- **Advanced interaction protocols** for specialized use cases

### Integration Opportunities
- **Calendar scheduling** for regular sessions
- **Progress analytics** and insights
- **Integration with meditation tracking**
- **Group video sessions** for community features

## Development Notes

### File Structure
```
src/
├── components/voice/
│   ├── VideoCoach.tsx         # Main video chat component
│   ├── EnhancedCoachFAB.tsx   # Enhanced floating action button
│   └── MindfulnessCoach.tsx   # Original voice-only component
├── hooks/
│   ├── useTavusConfig.ts      # Tavus configuration hook
│   └── useElevenLabsConfig.ts # ElevenLabs configuration hook
└── pages/
    └── MeditationPage.tsx     # Updated with video chat promotion
```

### Dependencies Added
- `@daily-co/daily-js` - WebRTC video calling

### Environment Variables
- All Tavus credentials are optional with fallback defaults
- Secure handling of API keys
- Local storage for user preferences

## Troubleshooting

### Common Issues

1. **"Setup Required" Message**
   - Add VITE_TAVUS_API_KEY to environment
   - Check API key validity
   - Verify network connectivity

2. **Video Connection Fails**
   - Check camera/microphone permissions
   - Verify network connectivity
   - Try refreshing the page

3. **AI Doesn't Respond**
   - Check conversation configuration
   - Verify replica and persona IDs
   - Monitor console for API errors

### Support Resources
- [Tavus Documentation](https://docs.tavus.io)
- [Daily.co Documentation](https://docs.daily.co)
- [WebRTC Troubleshooting](https://webrtc.org/getting-started/troubleshooting)

---

**Note**: This integration represents a cutting-edge implementation of AI video technology for wellness applications, providing users with an unprecedented level of interactive, personalized mental health support. 