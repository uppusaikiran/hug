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
  Heart,
  Brain
} from 'lucide-react';
import ModelSelector from '../components/conversation/ModelSelector';
import MessageBubble from '../components/conversation/MessageBubble';
import { perplexityClient, ModelType } from '../lib/perplexity';

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
  const [selectedModel, setSelectedModel] = useState<ModelType>('sonar');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
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
    
    // Get AI response
    setIsSpeaking(true);
    try {
      const response = await perplexityClient.chat(input, selectedModel);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsSpeaking(false);
    }
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
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

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <header className="bg-white p-4 border-b border-neutral-200 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Conversation</h1>
        <div className="flex items-center gap-3">
          <ModelSelector 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            isConfigured={perplexityClient.isConfigured()}
          />
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
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 bg-neutral-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isSpeaking={isSpeaking && message.id === messages[messages.length - 1].id} 
            />
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

const handleMoodSelection = (mood: string) => {
  // Handle mood selection logic
  console.log('Selected mood:', mood);
};

export default ConversationPage;