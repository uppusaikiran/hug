import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, MessageCircle, Settings } from 'lucide-react';
import MindfulnessCoach from './MindfulnessCoach';
import { useElevenLabsConfig } from '../../hooks/useElevenLabsConfig';

interface MindfulnessCoachFABProps {
  apiKey?: string;
  agentId?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

const MindfulnessCoachFAB = ({ 
  apiKey, 
  agentId, 
  position = 'bottom-right',
  className = ''
}: MindfulnessCoachFABProps) => {
  const { isConfigured } = useElevenLabsConfig();
  const [showMindfulnessCoach, setShowMindfulnessCoach] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const hasCredentials = Boolean(apiKey && agentId) || isConfigured;

  return (
    <>
      <motion.div
        className={`fixed ${getPositionClasses()} z-30 ${className}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <motion.button
          onClick={() => setShowMindfulnessCoach(true)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className={`group relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            hasCredentials 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
              : 'bg-gradient-to-br from-gray-400 to-gray-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing ring animation - only when configured */}
          {hasCredentials && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* Icon */}
          {hasCredentials ? (
            <Brain className="h-6 w-6 text-white relative z-10" />
          ) : (
            <Settings className="h-6 w-6 text-white relative z-10" />
          )}
          
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className={`absolute ${
                  position.includes('right') ? 'right-full mr-3' : 'left-full ml-3'
                } top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg`}
                initial={{ opacity: 0, scale: 0.8, x: position.includes('right') ? 10 : -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: position.includes('right') ? 10 : -10 }}
                transition={{ duration: 0.2 }}
              >
                {hasCredentials ? 'Talk with AI Coach' : 'Configure AI Coach'}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 ${
                    position.includes('right') ? '-right-1' : '-left-1'
                  }`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Configuration indicator dot */}
        {!hasCredentials && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
          >
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}

        {/* Ready indicator dot */}
        {hasCredentials && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
          >
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Mindfulness Coach Modal */}
      <MindfulnessCoach
        isOpen={showMindfulnessCoach}
        onClose={() => setShowMindfulnessCoach(false)}
        apiKey={apiKey}
        agentId={agentId}
      />
    </>
  );
};

export default MindfulnessCoachFAB; 