import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceInterfaceProps {
  onVoiceInput: (text: string) => void;
  onVoiceStart: () => void;
  onVoiceEnd: () => void;
  isListening: boolean;
  isSpeaking: boolean;
}

const VoiceInterface = ({ 
  onVoiceInput, 
  onVoiceStart, 
  onVoiceEnd,
  isListening,
  isSpeaking
}: VoiceInterfaceProps) => {
  const [audioLevel, setAudioLevel] = useState(0);
  
  // Simulate audio visualization with random values
  useEffect(() => {
    let interval: number;
    
    if (isListening) {
      interval = window.setInterval(() => {
        setAudioLevel(Math.random() * 0.8 + 0.2);
      }, 100);
    } else if (isSpeaking) {
      interval = window.setInterval(() => {
        setAudioLevel(Math.random() * 0.5 + 0.1);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isListening, isSpeaking]);
  
  const toggleListening = () => {
    if (isListening) {
      onVoiceEnd();
    } else {
      onVoiceStart();
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center relative">
          <button 
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isListening
                ? 'bg-error-500 text-white animate-pulse'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
            onClick={toggleListening}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <AnimatePresence>
            {(isListening || isSpeaking) && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-primary-300 opacity-30"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 + audioLevel * 0.5 }}
                  transition={{ duration: 0.1 }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-20"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 + audioLevel * 0.8 }}
                  transition={{ duration: 0.1, delay: 0.05 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>
        
        {isSpeaking && (
          <div className="absolute -right-2 -bottom-2 bg-white rounded-full p-1 shadow-sm">
            <Volume2 size={16} className="text-primary-500" />
          </div>
        )}
      </div>
      
      <p className="text-sm text-neutral-600 mt-3">
        {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to speak'}
      </p>
      
      <div className="mt-4 flex justify-center">
        <div className="flex gap-1 h-12">
          {Array.from({ length: 20 }).map((_, i) => (
            <VoiceBar key={i} level={(isListening || isSpeaking) ? audioLevel : 0} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface VoiceBarProps {
  level: number;
  index: number;
}

const VoiceBar = ({ level, index }: VoiceBarProps) => {
  // Calculate height based on position and audio level
  const maxHeight = 24; // Maximum height in pixels
  const position = Math.abs((index - 10) / 10); // 0 at center, 1 at edges
  const multiplier = 1 - position * 0.8; // Higher in the middle
  
  // Add some randomness for a more natural look
  const randomVariation = Math.random() * 0.3 + 0.85;
  const height = level * maxHeight * multiplier * randomVariation;
  
  return (
    <motion.div 
      className="w-1 bg-primary-400 rounded-full mx-px"
      initial={{ height: 0 }}
      animate={{ height }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default VoiceInterface;