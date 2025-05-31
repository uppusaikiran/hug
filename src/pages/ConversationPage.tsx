import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Send, 
  Smile, 
  Frown, 
  Meh,
  Volume2,
  AlertCircle,
  Heart
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ConversationPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your HUG companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI thinking
    setTimeout(() => {
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      // Simulate AI speaking
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3000);
    }, 1000);
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // If starting recording
    if (!isRecording) {
      // Simulate recording for 5 seconds then automatically send
      setTimeout(() => {
        setIsRecording(false);
        setInput("I've been feeling a bit anxious lately.");
        
        setTimeout(() => {
          handleSendMessage();
        }, 500);
      }, 3000);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Simple placeholder AI responses
  const getAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('anxious') || input.includes('anxiety')) {
      return "I understand feeling anxious can be difficult. Would you like to try a quick breathing exercise to help calm your mind? Or we could talk more about what's causing your anxiety.";
    } else if (input.includes('sad') || input.includes('depressed')) {
      return "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to explore some mood-lifting activities, or would you prefer to talk about what's making you feel this way?";
    } else if (input.includes('happy') || input.includes('good')) {
      return "I'm glad to hear you're doing well! It's wonderful to acknowledge positive feelings. Would you like to build on this positive mood with a gratitude exercise?";
    } else {
      return "Thank you for sharing that with me. How long have you been feeling this way? I'm here to listen and support you however I can.";
    }
  };
  
  const handleMoodSelection = (mood: string) => {
    setShowMoodSelector(false);
    setInput(`I'm feeling ${mood} today`);
    
    // Auto-send after a short delay
    setTimeout(() => {
      handleSendMessage();
    }, 500);
  };
  
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="bg-white p-4 border-b border-neutral-200 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Conversation</h1>
        <div className="flex items-center gap-3">
          <button 
            className="p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1"
            onClick={() => setShowMoodSelector(!showMoodSelector)}
          >
            <Smile size={20} />
            <span className="text-sm">Mood</span>
          </button>
          <button className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors flex items-center gap-1">
            <AlertCircle size={20} />
            <span className="text-sm">Help</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-neutral-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} isSpeaking={isSpeaking && message.id === messages[messages.length - 1].id} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="bg-white border-t border-neutral-200 p-4">
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence>
            {showMoodSelector && (
              <motion.div 
                className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-md p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-neutral-700 mb-2">How are you feeling today?</p>
                <div className="flex justify-between">
                  <MoodButton mood="happy" icon={<Smile size={24} className="text-success-500" />} onClick={() => handleMoodSelection('happy')} />
                  <MoodButton mood="neutral" icon={<Meh size={24} className="text-warning-500" />} onClick={() => handleMoodSelection('okay')} />
                  <MoodButton mood="sad" icon={<Frown size={24} className="text-error-500" />} onClick={() => handleMoodSelection('sad')} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex items-center gap-2">
            <button 
              className={`p-3 rounded-full transition-colors ${
                isRecording 
                  ? 'bg-error-500 text-white animate-pulse' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <div className="flex-1 relative">
              <textarea
                className="w-full py-3 px-4 pr-12 bg-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="Type your message..."
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              
              <button 
                className="absolute right-3 top-3 text-primary-500 hover:text-primary-600"
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
  isSpeaking: boolean;
}

const MessageBubble = ({ message, isSpeaking }: MessageBubbleProps) => {
  const isAI = message.sender === 'ai';
  
  return (
    <motion.div
      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        isAI 
          ? 'bg-white border border-neutral-200 text-neutral-900' 
          : 'bg-primary-500 text-white'
      }`}>
        <div className="flex items-start gap-3">
          {isAI && (
            <div className="relative flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-500" />
              </div>
              {isSpeaking && (
                <div className="absolute -right-1 -bottom-1 flex space-x-0.5">
                  <motion.div 
                    className="w-1 h-3 bg-primary-500 rounded-full"
                    animate={{ scaleY: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="w-1 h-3 bg-primary-500 rounded-full"
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  />
                  <motion.div 
                    className="w-1 h-3 bg-primary-500 rounded-full"
                    animate={{ scaleY: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                </div>
              )}
            </div>
          )}
          
          <div>
            <p className={`${isAI ? 'text-neutral-900' : 'text-white'}`}>{message.text}</p>
            <p className={`text-xs mt-1 ${isAI ? 'text-neutral-500' : 'text-primary-200'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {isAI && (
                <button className="ml-2 hover:text-primary-500 transition-colors">
                  <Volume2 size={14} />
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface MoodButtonProps {
  mood: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const MoodButton = ({ mood, icon, onClick }: MoodButtonProps) => (
  <button 
    className="flex flex-col items-center p-2 hover:bg-neutral-100 rounded-lg transition-colors"
    onClick={onClick}
  >
    {icon}
    <span className="text-sm mt-1 text-neutral-700 capitalize">{mood}</span>
  </button>
);

export default ConversationPage;