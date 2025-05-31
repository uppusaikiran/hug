# Tavus Integration Troubleshooting Guide

## Common Issues and Solutions

### 1. "Invalid replica_uuid" Error

**Problem**: Getting a 400 error with "Invalid replica_uuid" message.

**Solution**:
- The replica ID you're using doesn't exist or is invalid
- Go to your [Tavus dashboard](https://app.tavus.io)
- Create a new replica or copy an existing replica ID
- Update your `.env` file with the correct `VITE_TAVUS_REPLICA_ID`

### 2. "Failed to create conversation" Error

**Possible Causes**:

#### Maximum Concurrent Conversations
- **Error**: "User has reached maximum concurrent conversations"
- **Cause**: You have active Tavus conversations still running
- **Solution**: 
  - Click "Clean Up & Retry" to automatically end existing conversations
  - Or wait 5-10 minutes for conversations to timeout naturally
  - Or manually end conversations in your Tavus dashboard

#### Missing API Key
- **Error**: No API key configured
- **Solution**: Add `VITE_TAVUS_API_KEY=your_key` to `.env`

#### Invalid API Key
- **Error**: 401 Unauthorized
- **Solution**: Verify your API key in the Tavus dashboard

#### Missing Replica/Persona IDs
- **Error**: Configuration incomplete
- **Solution**: Add both `VITE_TAVUS_REPLICA_ID` and `VITE_TAVUS_PERSONA_ID`

#### Network Issues
- **Error**: Connection timeout
- **Solution**: Check internet connection and firewall settings

### 3. "Setup Required" Screen

**What it means**: The app is missing Tavus configuration.

**Required Environment Variables**:
```env
VITE_TAVUS_API_KEY=your_tavus_api_key
VITE_TAVUS_REPLICA_ID=your_replica_id  
VITE_TAVUS_PERSONA_ID=your_persona_id
```

**Steps to Fix**:
1. Create a [Tavus account](https://www.tavus.io)
2. Generate an API key
3. Create or select a replica (AI avatar)
4. Create or select a persona (conversation style)
5. Add all three values to your `.env` file
6. Restart your development server

### 4. Video Connection Issues

**Problem**: Video call fails to connect after conversation creation.

**Common Scenarios**:

#### "Joining your video session..." - Video Never Loads
This means Tavus conversation was created but WebRTC connection failed.

**Solutions**:
- **Check browser console** (F12) for specific error messages
- **Allow camera/microphone permissions** when prompted
- **Refresh the page** and try again
- **Try a different browser** (Chrome/Edge work best)
- **Check network connectivity** (corporate firewalls may block WebRTC)
- **Disable browser extensions** that might interfere with video

#### Camera/Microphone Permission Issues
- Click the camera icon in browser address bar
- Set permissions to "Allow" for both camera and microphone
- Refresh the page after changing permissions

#### WebRTC Connection Failures
- Ensure you're using a modern browser (Chrome 70+, Firefox 60+, Safari 12+)
- Try disabling VPN or proxy connections
- Check if your network blocks WebRTC traffic
- Try connecting from a different network

**Solutions**:
- Check camera/microphone permissions in browser
- Ensure WebRTC is supported (modern browsers)
- Check network connectivity
- Try refreshing the page

### 5. Development Server Issues

**Problem**: Environment variables not loading.

**Solutions**:
- Ensure `.env` file is in the project root
- Restart the development server: `npm run dev`
- Check that variable names start with `VITE_`
- Verify no extra spaces in `.env` file

## Quick Testing Steps

### Test Voice Chat (No API Required)
1. Click the purple floating button
2. Select "Voice Chat"
3. Should work immediately

### Test Video Chat Setup
1. Click the purple floating button
2. Select "Video Chat"
3. Should show setup instructions if not configured
4. Should attempt connection if properly configured

## Getting Help

### Tavus Resources
- [Tavus Documentation](https://docs.tavus.io)
- [Tavus Dashboard](https://app.tavus.io)
- [Tavus Support](https://www.tavus.io/contact)

### WebRTC Resources
- [Daily.co Documentation](https://docs.daily.co)
- [WebRTC Troubleshooting](https://webrtc.org/getting-started/troubleshooting)

### Browser Console
Check the browser console (F12) for detailed error messages:
- Network errors will show API response details
- WebRTC errors will show connection issues
- Configuration errors will show missing variables

## Environment File Template

Create a `.env` file in your project root:

```env
# Tavus Configuration (Required for video chat)
VITE_TAVUS_API_KEY=your_tavus_api_key_here
VITE_TAVUS_REPLICA_ID=your_replica_id_here
VITE_TAVUS_PERSONA_ID=your_persona_id_here

# ElevenLabs Configuration (Optional for voice chat)
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
```

Remember to restart your development server after making changes to the `.env` file! 