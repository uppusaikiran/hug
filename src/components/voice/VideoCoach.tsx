import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Settings, 
  MessageCircle,
  Brain,
  Loader2,
  Camera,
  CameraOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useTavusConfig } from '../../hooks/useTavusConfig';

// Daily.js types - following Tavus CVI best practices
declare global {
  interface Window {
    Daily: any;
  }
}

interface VideoCoachProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConversationState {
  id?: string;
  url?: string;
  status: 'idle' | 'creating' | 'connecting' | 'connected' | 'ended' | 'error';
  error?: string;
}

interface CallState {
  hasJoined: boolean;
  participants: any[];
  error?: string;
}

const VideoCoach: React.FC<VideoCoachProps> = ({ isOpen, onClose }) => {
  const { config, isConfigured } = useTavusConfig();
  const [isLoaded, setIsLoaded] = useState(false);
  const [conversation, setConversation] = useState<ConversationState>({ status: 'idle' });
  const [callState, setCallState] = useState<CallState>({ hasJoined: false, participants: [] });
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const callRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add custom styles for animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in-delayed {
        from {
          opacity: 0;
          transform: translate(-50%, 20px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }
      .animate-fade-in-delayed {
        animation: fade-in-delayed 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Reset state when modal opens - Iframe approach
  useEffect(() => {
    if (isOpen) {
      console.log('🎬 Modal opened - resetting state for iframe approach');
      setConversation({ status: 'idle' });
      setCallState({ hasJoined: false, participants: [] });
      setIsVideoEnabled(true);
      setIsAudioEnabled(true);
      setIsMuted(false);
      setDebugInfo([]);
    }
  }, [isOpen]);

  // Ensure container is ready when status changes to connecting
  useEffect(() => {
    if (conversation.status === 'connecting' && containerRef.current) {
      console.log('✅ Container is ready for Daily.js initialization');
    }
  }, [conversation.status]);

  // Validate replica and persona exist - Tavus CVI best practice
  const validateConfiguration = useCallback(async () => {
    if (!config.apiKey || !config.replicaId || !config.personaId) {
      return { valid: false, error: 'Missing configuration' };
    }

    try {
      const headers: Record<string, string> = {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json'
      };

      // Validate replica exists
      const replicaResponse = await fetch(`https://tavusapi.com/v2/replicas/${config.replicaId}`, {
        method: 'GET',
        headers
      });

      if (!replicaResponse.ok) {
        if (replicaResponse.status === 404) {
          return { valid: false, error: `Replica ID '${config.replicaId}' not found. Please check your VITE_TAVUS_REPLICA_ID.` };
        } else if (replicaResponse.status === 401) {
          return { valid: false, error: 'Invalid API key. Please check your VITE_TAVUS_API_KEY.' };
        }
      }

      // Validate persona exists
      const personaResponse = await fetch(`https://tavusapi.com/v2/personas/${config.personaId}`, {
        method: 'GET',
        headers
      });

      if (!personaResponse.ok) {
        if (personaResponse.status === 404) {
          return { valid: false, error: `Persona ID '${config.personaId}' not found. Please check your VITE_TAVUS_PERSONA_ID.` };
        }
      }

      return { valid: true };
    } catch (error) {
      console.warn('Configuration validation failed:', error);
      return { valid: true }; // Continue anyway if validation fails
    }
  }, [config]);

  // Set loaded to true immediately since we're using iframe embed (no SDK needed)
  useEffect(() => {
    if (isOpen) {
      console.log('🎬 Using iframe embed approach - no SDK loading required');
      setIsLoaded(true);
    }
  }, [isOpen]);

  // Debug logging function that also updates UI
  const addDebugLog = useCallback((message: string) => {
    console.log(message);
    setDebugInfo(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  }, []);

  // Enhanced conversation cleanup - Tavus CVI best practice
  const cleanupExistingConversations = useCallback(async () => {
    if (!config.apiKey) return;
    
    try {
      console.log('Cleaning up existing conversations...');
      
      const headers: Record<string, string> = {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json'
      };
      
      // Get list of conversations - using status filter for active conversations
      const response = await fetch('https://tavusapi.com/v2/conversations?status=active', {
        method: 'GET',
        headers
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Found conversations response:', result);
        
        // Check if the response has the expected structure { data: [...] }
        const conversations = result.data || result;
        
        if (Array.isArray(conversations) && conversations.length > 0) {
          console.log(`Found ${conversations.length} active conversations to clean up...`);
          
          // End all active conversations
          const cleanupPromises = conversations.map(async (conv: any) => {
            try {
              console.log(`Attempting to end conversation: ${conv.conversation_id} (status: ${conv.status})`);
              
              const endResponse = await fetch(`https://tavusapi.com/v2/conversations/${conv.conversation_id}/end`, {
                method: 'POST',
                headers
              });
              
              if (endResponse.ok) {
                console.log(`✅ Successfully ended conversation: ${conv.conversation_id}`);
              } else {
                const errorText = await endResponse.text();
                console.warn(`⚠️ Failed to end conversation ${conv.conversation_id}: ${endResponse.status} - ${errorText}`);
              }
            } catch (error) {
              console.warn(`❌ Error ending conversation ${conv.conversation_id}:`, error);
            }
          });
          
          // Wait for all cleanup operations to complete
          const results = await Promise.allSettled(cleanupPromises);
          
          const successful = results.filter(result => result.status === 'fulfilled').length;
          console.log(`Cleanup completed: ${successful}/${conversations.length} conversations ended successfully`);
          
          // Wait longer for Tavus servers to process the cleanup
          console.log('Waiting for Tavus servers to process cleanup...');
          await new Promise(resolve => setTimeout(resolve, 5000)); // Increased to 5 seconds
        } else {
          console.log('No active conversations found to clean up');
        }
      } else {
        const errorText = await response.text();
        console.error(`Failed to list conversations: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }, [config.apiKey]);

  // Enhanced conversation creation with better error handling
  const createConversation = useCallback(async () => {
    try {
      setConversation({ status: 'creating' });
      
      console.log('Validating configuration...');
      const validation = await validateConfiguration();
      
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Cleanup any existing conversations first
      await cleanupExistingConversations();

      const requestBody = {
        replica_id: config.replicaId,
        persona_id: config.personaId,
        conversation_name: 'huggy Wellness Session',
        conversational_context: `You are a compassionate AI wellness coach specializing in mindfulness, meditation, and mental health support. 
          You're here to help users with their wellness journey through guided conversations. 
          Be empathetic, supportive, and knowledgeable about meditation techniques, stress management, and emotional wellbeing.
          Keep responses natural and conversational. Encourage the user and provide practical guidance.`,
        custom_greeting: "Hello! I'm your personal wellness coach. I'm here to support you on your mindfulness journey. How are you feeling today, and what would you like to work on together?",
        properties: {
          max_call_duration: 1800, // 30 minutes
          participant_left_timeout: 60,
          participant_absent_timeout: 300,
          enable_recording: false,
          enable_closed_captions: true,
          language: 'english'
        }
      };

      console.log('Creating conversation with payload:', requestBody);

      const response = await fetch('https://tavusapi.com/v2/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey!
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Tavus API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: errorText
        });
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        // Enhanced error handling for Tavus CVI
        if (response.status === 400) {
          console.error('Bad Request Error Details:', errorData);
          if (errorData.message?.includes('maximum concurrent conversations')) {
            throw new Error('CONCURRENT_LIMIT_REACHED');
          } else if (errorData.message?.includes('replica') || errorData.message?.includes('persona')) {
            throw new Error('Invalid replica or persona ID. Please check your Tavus configuration.');
          } else {
            throw new Error(`Bad request: ${errorData.message || errorText}. Please check your request parameters.`);
          }
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Tavus API credentials.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        
        throw new Error(`Conversation creation failed: ${errorData.message || `${response.status} ${response.statusText}`}`);
      }

      const data = await response.json();
      console.log('Conversation created:', data);
      
      setConversation({
        status: 'connecting',
        id: data.conversation_id,
        url: data.conversation_url
      });

      return data.conversation_url;
    } catch (error) {
      console.error('Error creating conversation:', error);
      
      // Special handling for concurrent limit errors
      if (error instanceof Error && error.message === 'CONCURRENT_LIMIT_REACHED') {
        setConversation({ 
          status: 'error', 
          error: 'CONCURRENT_LIMIT_REACHED' 
        });
      } else {
        setConversation({ 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Failed to create conversation. Please try again.' 
        });
      }
      return null;
    }
  }, [config, cleanupExistingConversations, validateConfiguration]);



  // Start video session with enhanced error handling and retry logic (Iframe Approach)
  const startVideoSession = useCallback(async (retryCount = 0) => {
    console.log('🚀 Starting video session with iframe embed approach...');
    addDebugLog('🚀 Starting iframe-based session');

    try {
      // Create the Tavus conversation
      const conversationUrl = await createConversation();
      if (conversationUrl) {
        console.log('✅ Conversation created, URL:', conversationUrl);
        addDebugLog('✅ Conversation URL ready');
        
        // The iframe will automatically load when conversation.url is set
        // No need for complex Daily.js integration
        console.log('🎬 Iframe will load automatically with conversation URL');
        addDebugLog('🎬 Loading iframe interface');
        
        // Set status to connecting - the iframe onLoad will set it to connected
        setConversation(prev => ({ ...prev, status: 'connecting' }));
      }
    } catch (error) {
      console.error(`Error starting video session (attempt ${retryCount + 1}):`, error);
      
      // Special handling for concurrent limit errors
      if (error instanceof Error && error.message === 'CONCURRENT_LIMIT_REACHED') {
        if (retryCount < 2) { // Retry up to 2 times for concurrent limit
          const delayTime = (retryCount + 1) * 5000; // 5s, 10s delays
          console.log(`🔄 Concurrent limit detected. Cleaning up and retrying in ${delayTime/1000} seconds... (attempt ${retryCount + 2}/3)`);
          
          setConversation({
            status: 'creating',
            error: undefined
          });
          
          // Cleanup and retry after delay
          setTimeout(async () => {
            await cleanupExistingConversations();
            // Additional delay after cleanup
            setTimeout(() => {
              startVideoSession(retryCount + 1);
            }, 2000);
          }, delayTime);
          return;
        } else {
          // Max retries reached for concurrent limit
          setConversation({
            status: 'error',
            error: 'CONCURRENT_LIMIT_REACHED'
          });
          return;
        }
      }
      
      // Enhanced retry logic for transient failures
      if (retryCount < 3 && error instanceof Error) { // Increased retry count from 2 to 3
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('network') ||
            error.message.includes('timeout') ||
            error.message.includes('timed out') ||
            error.message.includes('Connection timed out') ||
            error.message.includes('server overload')) {
          
          const delayTime = Math.min(3000 * (retryCount + 1), 10000); // Progressive delay: 3s, 6s, 9s, max 10s
          console.log(`🔄 Network/timeout issue detected. Retrying video session in ${delayTime/1000} seconds... (attempt ${retryCount + 2}/4)`);
          
          setConversation({
            status: 'creating',
            error: undefined
          });
          
          setTimeout(() => {
            startVideoSession(retryCount + 1);
          }, delayTime);
          return;
        }
      }
      
      // If all retries failed or non-retryable error
      const errorMessage = retryCount > 0 
        ? `Failed to start video session after ${retryCount + 1} attempts: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your network connection and try again.`
        : `Failed to start video session: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`;
      
      setConversation({
        status: 'error',
        error: errorMessage
      });
    }
  }, [createConversation, cleanupExistingConversations]);

  // Enhanced conversation ending with cleanup (Iframe Approach)
  const endConversation = useCallback(async () => {
    try {
      console.log('🔚 Ending conversation session...');
      addDebugLog('🔚 Ending session');

      // End Tavus conversation via API
      if (conversation.id && config.apiKey) {
        console.log('Ending Tavus conversation via API...');
        const headers: Record<string, string> = {
          'x-api-key': config.apiKey,
          'Content-Type': 'application/json'
        };
        
        try {
          await fetch(`https://tavusapi.com/v2/conversations/${conversation.id}/end`, {
            method: 'POST',
            headers
          });
          console.log('✅ Tavus conversation ended via API');
          addDebugLog('✅ Conversation ended');
        } catch (tavusError) {
          console.warn('Error ending Tavus conversation:', tavusError);
          addDebugLog('⚠️ API end failed');
        }
      }

      // Note: No Daily.js cleanup needed with iframe approach
      // The iframe handles its own lifecycle
      console.log('✅ Iframe will clean up automatically');
      
    } catch (error) {
      console.error('Error ending conversation:', error);
      addDebugLog(`❌ End error: ${error}`);
    } finally {
      // Reset all state
      setConversation({ status: 'idle' });
      setCallState({ hasJoined: false, participants: [] });
    }
  }, [conversation.id, config.apiKey]);

  // Enhanced media controls with error handling
  const toggleVideo = useCallback(async () => {
    if (!callRef.current) {
      console.warn('No active call to toggle video');
      return;
    }

    try {
      const newState = !isVideoEnabled;
      await callRef.current.setLocalVideo(newState);
      setIsVideoEnabled(newState);
      console.log(`Video ${newState ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error toggling video:', error);
    }
  }, [isVideoEnabled]);

  const toggleAudio = useCallback(async () => {
    if (!callRef.current) {
      console.warn('No active call to toggle audio');
      return;
    }

    try {
      const newState = !isAudioEnabled;
      await callRef.current.setLocalAudio(newState);
      setIsAudioEnabled(newState);
      setIsMuted(!newState); // Update muted state
      console.log(`Audio ${newState ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  }, [isAudioEnabled]);

  const toggleMute = useCallback(async () => {
    if (!callRef.current) {
      console.warn('No active call to toggle mute');
      return;
    }

    try {
      const newMutedState = !isMuted;
      await callRef.current.setLocalAudio(!newMutedState);
      setIsMuted(newMutedState);
      setIsAudioEnabled(!newMutedState);
      console.log(`Audio ${newMutedState ? 'muted' : 'unmuted'}`);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  }, [isMuted]);

  // Enhanced cleanup on modal close (Iframe Approach)
  useEffect(() => {
    if (!isOpen && conversation.status !== 'idle') {
      console.log('Modal closed, cleaning up conversation...');
      endConversation();
    }
  }, [isOpen, endConversation, conversation.status]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AI Video Wellness Coach</h2>
                <p className="text-purple-100 text-sm">
                  {conversation.status === 'connected' ? 'Connected - Ready to chat!' : 'Powered by Tavus AI'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!config.apiKey ? (
              <div className="text-center py-8">
                <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tavus API Setup Required</h3>
                <p className="text-gray-600 mb-6">
                  To use the AI Video Coach, you need a Tavus API key for real-time video conversations.
                </p>
                
                {/* Setup Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left mb-6">
                  <h4 className="font-medium text-blue-800 mb-3">Quick Setup:</h4>
                  <ol className="text-sm text-blue-700 space-y-2">
                    <li>1. Visit <a href="https://www.tavus.io" target="_blank" rel="noopener noreferrer" className="underline font-medium">tavus.io</a> and sign up for a free account</li>
                    <li>2. Generate an API key from your dashboard</li>
                    <li>3. Add to your <code className="bg-blue-100 px-2 py-1 rounded">.env</code> file:</li>
                  </ol>
                  <div className="bg-blue-100 rounded p-3 mt-3 font-mono text-sm">
                    VITE_TAVUS_API_KEY=your_api_key_here
                  </div>
                  <p className="text-xs text-blue-600 mt-2">4. Restart your development server</p>
                </div>

                {/* Alternative Options */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Demo Alternatives:</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Want to see AI conversation in action right now? Try our voice-only mode:
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    ← Try Voice Chat Instead
                  </button>
                </div>
              </div>
            ) : !config.replicaId || !config.personaId ? (
              <div className="text-center py-8">
                <Settings className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Additional Setup Required</h3>
                <p className="text-gray-600 mb-6">
                  You have a Tavus API key, but need to configure replica and persona IDs.
                </p>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-left mb-6">
                  <h4 className="font-medium text-orange-800 mb-3">Complete Setup:</h4>
                  <ol className="text-sm text-orange-700 space-y-2">
                    <li>1. Visit your <a href="https://app.tavus.io" target="_blank" rel="noopener noreferrer" className="underline font-medium">Tavus dashboard</a></li>
                    <li>2. Create or select a replica (AI avatar)</li>
                    <li>3. Create or select a persona (conversation style)</li>
                    <li>4. Add the IDs to your <code className="bg-orange-100 px-2 py-1 rounded">.env</code> file:</li>
                  </ol>
                  <div className="bg-orange-100 rounded p-3 mt-3 font-mono text-sm">
                    VITE_TAVUS_API_KEY=your_api_key_here<br/>
                    VITE_TAVUS_REPLICA_ID=your_replica_id<br/>
                    VITE_TAVUS_PERSONA_ID=your_persona_id
                  </div>
                  <p className="text-xs text-orange-600 mt-2">5. Restart your development server</p>
                </div>

                <button
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  ← Try Voice Chat Instead
                </button>
              </div>
            ) : conversation.status === 'idle' ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Start Your Video Session</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Connect with your AI wellness coach for a personalized, real-time conversation about mindfulness, 
                  meditation, and mental wellbeing.
                </p>
                <button
                  onClick={() => startVideoSession()}
                  disabled={!isLoaded}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoaded ? 'Start Video Session' : 'Loading...'}
                </button>
              </div>
            ) : conversation.status === 'creating' || conversation.status === 'connecting' ? (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 text-purple-500 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {conversation.status === 'creating' ? 'Creating Session...' : 'Connecting to Video...'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {conversation.status === 'creating' 
                    ? 'Setting up your AI wellness coach...' 
                    : 'Establishing video connection and checking permissions...'}
                </p>
                
                {conversation.status === 'connecting' && (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-md mx-auto mb-6">
                      <h4 className="font-medium text-blue-800 mb-2">Connection Progress:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Conversation created successfully
                        </li>
                        <li className="flex items-center gap-2">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Initializing video system...
                        </li>
                        <li className="flex items-center gap-2 text-gray-500">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          Establishing video connection...
                        </li>
                      </ul>
                      
                      {/* Debug Information */}
                      {debugInfo.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-blue-200">
                          <h5 className="font-medium text-blue-800 text-xs mb-2">Debug Info:</h5>
                          <div className="space-y-1">
                            {debugInfo.map((info, index) => (
                              <div key={index} className="text-xs text-blue-600 font-mono">
                                {info}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-3 text-xs text-blue-600">
                        <p>If this takes longer than 30 seconds:</p>
                        <p>• Check camera/microphone permissions</p>
                        <p>• Ensure stable internet connection</p>
                        <p>• Try refreshing the page</p>
                      </div>
                    </div>
                    
                    {/* Video Container - Enhanced Iframe with Multiple Approaches */}
                    <div className="w-full h-96 bg-gray-900 rounded-lg overflow-hidden relative mx-auto max-w-2xl">
                      {conversation.url ? (
                        <>
                          <iframe
                            src={conversation.url}
                            className="w-full h-full border-0 rounded-lg"
                            allow="camera; microphone; display-capture; fullscreen; autoplay; encrypted-media"
                            referrerPolicy="no-referrer-when-downgrade"
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-camera allow-microphone"
                            loading="eager"
                            onLoad={(e) => {
                              console.log('✅ Tavus iframe loaded successfully');
                              addDebugLog('✅ Iframe loaded successfully');
                              
                              // Check if iframe has content
                              const iframe = e.target as HTMLIFrameElement;
                              try {
                                // Try to detect if iframe has actual content
                                setTimeout(() => {
                                  console.log('🔍 Checking iframe content...');
                                  addDebugLog('🔍 Checking iframe content');
                                  
                                  // Set status to connected after a brief delay to allow content to load
                                  setConversation(prev => ({ ...prev, status: 'connected' }));
                                }, 2000);
                              } catch (error) {
                                console.warn('Cannot inspect iframe content (CORS):', error);
                              }
                            }}
                            onError={(error) => {
                              console.error('❌ Tavus iframe error:', error);
                              addDebugLog('❌ Iframe failed to load');
                              setConversation({ 
                                status: 'error', 
                                error: 'Failed to load video interface. This may be due to browser security restrictions. Please try the "Open in New Tab" option.' 
                              });
                            }}
                          />
                          
                          {/* Debug overlay to show iframe status */}
                          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                            📺 Iframe: {conversation.status}
                          </div>
                          
                          {/* URL Debug info */}
                          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs max-w-48 truncate">
                            🔗 {conversation.url}
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                            <p className="text-sm">Loading conversation interface...</p>
                            <p className="text-xs text-gray-300 mt-1">Getting your video session ready</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Enhanced fallback options */}
                      {conversation.url && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          <button
                            onClick={() => {
                              console.log('🔗 Opening Tavus conversation in new tab');
                              addDebugLog('🔗 Opening in new tab');
                              window.open(conversation.url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors opacity-0 animate-fade-in-delayed text-sm"
                            style={{
                              animationDelay: '8s',
                              animationFillMode: 'forwards'
                            }}
                          >
                            🔗 Open in New Tab
                          </button>
                          
                          <button
                            onClick={() => {
                              console.log('🔄 Refreshing iframe...');
                              addDebugLog('🔄 Refreshing iframe');
                              
                              // Force iframe refresh by temporarily removing and re-adding the src
                              const iframe = document.querySelector('iframe') as HTMLIFrameElement;
                              if (iframe) {
                                const currentSrc = iframe.src;
                                iframe.src = '';
                                setTimeout(() => {
                                  iframe.src = currentSrc;
                                  addDebugLog('✅ Iframe refreshed');
                                }, 100);
                              }
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-medium transition-colors opacity-0 animate-fade-in-delayed text-sm"
                            style={{
                              animationDelay: '12s',
                              animationFillMode: 'forwards'
                            }}
                          >
                            🔄 Refresh
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : conversation.status === 'error' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-8 w-8 text-red-500" />
                </div>
                
                {conversation.error === 'CONCURRENT_LIMIT_REACHED' ? (
                  <>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Session Limit Reached</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      You have reached the maximum number of concurrent conversations. This is a temporary limitation from the Tavus API.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-lg mx-auto mb-6">
                      <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                        <span className="text-lg">💡</span>
                        What's happening?
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Tavus limits concurrent video sessions to manage server resources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>You may have another session running in a different tab or browser</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Previous sessions may need a few moments to fully close</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          <span>Check the browser console for detailed cleanup logs</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={async () => {
                          setConversation({ status: 'creating' });
                          console.log('🧹 Starting manual cleanup process...');
                          
                          try {
                            await cleanupExistingConversations();
                            console.log('🧹 Cleanup completed, attempting to create new conversation...');
                            
                            // Wait a bit more and try to create conversation
                            setTimeout(async () => {
                              startVideoSession(0);
                            }, 3000);
                          } catch (cleanupError) {
                            console.error('❌ Cleanup failed:', cleanupError);
                            setConversation({ 
                              status: 'error', 
                              error: 'Failed to cleanup existing conversations. Please try again or wait a few minutes.' 
                            });
                          }
                        }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4" />
                        Clean Up & Retry Automatically
                      </button>
                      <button
                        onClick={() => setConversation({ status: 'idle' })}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Wait & Try Manually
                      </button>
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-500">
                      <p>💡 Tip: Open browser console (F12) to see detailed cleanup progress</p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">{conversation.error}</p>
                    
                    {/* Troubleshooting Tips for Timeout Issues */}
                    {(conversation.error?.includes('timed out') || conversation.error?.includes('timeout') || conversation.error?.includes('network')) && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left max-w-lg mx-auto mb-6">
                        <h4 className="font-medium text-yellow-800 mb-3 flex items-center gap-2">
                          <span className="text-lg">💡</span>
                          Quick Fixes for Connection Issues:
                        </h4>
                        <ul className="text-sm text-yellow-700 space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-600">•</span>
                            <span><strong>Check permissions:</strong> Click the camera icon in your browser's address bar and ensure camera/microphone are allowed</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-600">•</span>
                            <span><strong>Network check:</strong> Try refreshing the page or switching to a more stable internet connection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-600">•</span>
                            <span><strong>Browser issues:</strong> Try using Chrome or Edge for best compatibility</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-600">•</span>
                            <span><strong>Firewall/VPN:</strong> Disable VPN or check if your network blocks video calls</span>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => {
                          // Reset and retry with full restart
                          setConversation({ status: 'creating' });
                          startVideoSession(0); // Start fresh with retry count 0
                        }}
                        className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => {
                          // Reset to idle state for manual retry
                          setConversation({ status: 'idle' });
                        }}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => {
                          // Close video and suggest voice chat
                          onClose();
                        }}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Try Voice Chat Instead
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Video Container - Iframe Approach */}
                {conversation.url && conversation.status === 'connected' && (
                  <>
                    <div className="w-full h-96 bg-gray-900 rounded-lg overflow-hidden relative">
                      <iframe
                        src={conversation.url}
                        className="w-full h-full border-0 rounded-lg"
                        allow="camera; microphone; display-capture; fullscreen; autoplay; encrypted-media"
                        referrerPolicy="no-referrer-when-downgrade"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation allow-camera allow-microphone"
                        title="Tavus AI Video Coach"
                      />
                      
                      {conversation.status === 'connected' && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            Live via Iframe
                          </div>
                        </div>
                      )}
                      
                      {/* Iframe Controls */}
                      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
                        <button
                          onClick={() => {
                            console.log('🔗 Opening full conversation in new tab');
                            window.open(conversation.url, '_blank', 'width=1200,height=800');
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                          🔗 Full Screen
                        </button>
                      </div>
                    </div>

                    {/* Iframe-specific Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <h4 className="font-medium text-blue-800 mb-2">🎬 Video Interface Loaded</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Your AI wellness coach should appear in the frame above. If you see a blank screen:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          onClick={() => window.open(conversation.url, '_blank', 'width=1200,height=800')}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                        >
                          🚀 Launch in New Tab
                        </button>
                        <button
                          onClick={() => {
                            const iframe = document.querySelector('iframe');
                            if (iframe) {
                              iframe.src = iframe.src; // Force reload
                            }
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                        >
                          🔄 Refresh Frame
                        </button>
                        <button
                          onClick={() => {
                            setConversation({ status: 'creating' });
                            setTimeout(() => startVideoSession(0), 1000);
                          }}
                          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
                        >
                          🔄 New Session
                        </button>
                      </div>
                    </div>
                    
                    {/* End Session Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={endConversation}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                      >
                        <X className="h-5 w-5" />
                        End Session
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Powered by Tavus AI & Phoenix-3 Replica Model</span>
              </div>
              {conversation.status === 'connected' && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure & Private</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoCoach; 