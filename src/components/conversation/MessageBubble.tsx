import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  };
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
            <div 
              className={`prose prose-sm ${isAI ? 'text-neutral-900' : 'text-white prose-invert'} max-w-none`}
              dangerouslySetInnerHTML={{ __html: message.text }}
            />
            <p className={`text-xs mt-1 ${isAI ? 'text-neutral-500' : 'text-primary-200'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;