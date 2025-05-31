import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Video, 
  Mic, 
  Brain, 
  X, 
  Settings,
  Sparkles
} from 'lucide-react';
import MindfulnessCoach from './MindfulnessCoach';
import VideoCoach from './VideoCoach';

interface EnhancedCoachFABProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const EnhancedCoachFAB: React.FC<EnhancedCoachFABProps> = ({ position = 'bottom-right' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVoiceCoach, setShowVoiceCoach] = useState(false);
  const [showVideoCoach, setShowVideoCoach] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
    'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
    'top-left': 'top-4 left-4 sm:top-6 sm:left-6'
  };

  const expandDirection = position.includes('right') ? 'right' : 'left';

  const options = [
    {
      id: 'video',
      label: 'Video Chat',
      description: 'Face-to-face AI conversation',
      icon: <Video className="h-5 w-5" />,
      color: 'from-purple-500 to-pink-500',
      onClick: () => {
        setShowVideoCoach(true);
        setIsExpanded(false);
      }
    },
    {
      id: 'voice',
      label: 'Voice Only',
      description: 'Audio conversation',
      icon: <Mic className="h-5 w-5" />,
      color: 'from-blue-500 to-indigo-500',
      onClick: () => {
        setShowVoiceCoach(true);
        setIsExpanded(false);
      }
    }
  ];

  const handleMainButtonClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <>
      <div className={`fixed ${positionClasses[position]} z-40`}>
        {/* Backdrop for closing */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              style={{ zIndex: -1 }}
            />
          )}
        </AnimatePresence>

        {/* Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={`absolute ${position.includes('bottom') ? 'bottom-20' : 'top-20'} ${
                expandDirection === 'right' ? 'right-0' : 'left-0'
              } space-y-3`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            >
              {options.map((option, index) => (
                <motion.button
                  key={option.id}
                  className={`bg-gradient-to-r ${option.color} text-white p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-all group w-56 sm:w-64`}
                  onClick={option.onClick}
                  initial={{ 
                    opacity: 0, 
                    x: expandDirection === 'right' ? 50 : -50,
                    y: position.includes('bottom') ? 20 : -20
                  }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ 
                    opacity: 0, 
                    x: expandDirection === 'right' ? 50 : -50,
                    y: position.includes('bottom') ? 20 : -20
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    type: 'spring',
                    damping: 25,
                    stiffness: 400
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      {option.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm opacity-90">{option.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}

              {/* Header Card */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-4 border border-gray-200"
                initial={{ 
                  opacity: 0, 
                  x: expandDirection === 'right' ? 50 : -50,
                  y: position.includes('bottom') ? 20 : -20
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  x: expandDirection === 'right' ? 50 : -50,
                  y: position.includes('bottom') ? 20 : -20
                }}
                transition={{ 
                  delay: options.length * 0.1,
                  type: 'spring',
                  damping: 25,
                  stiffness: 400
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">AI Wellness Coach</div>
                    <div className="text-xs text-gray-600">Choose your preferred experience</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group ${
            isExpanded ? 'rotate-45' : ''
          }`}
          onClick={handleMainButtonClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Sparkle animation */}
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
          </motion.div>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              className={`absolute ${position.includes('bottom') ? 'bottom-20' : 'top-20'} ${
                position.includes('right') ? 'right-0' : 'left-0'
              } bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1 }}
              transition={{ delay: 1 }}
            >
              AI Wellness Coach
              <div className={`absolute ${position.includes('bottom') ? 'top-full' : 'bottom-full'} ${
                position.includes('right') ? 'right-3' : 'left-3'
              } w-0 h-0 border-l-4 border-r-4 border-transparent ${
                position.includes('bottom') ? 'border-t-4 border-t-gray-800' : 'border-b-4 border-b-gray-800'
              }`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Voice Coach Modal */}
      <MindfulnessCoach
        isOpen={showVoiceCoach}
        onClose={() => setShowVoiceCoach(false)}
      />

      {/* Video Coach Modal */}
      <VideoCoach
        isOpen={showVideoCoach}
        onClose={() => setShowVideoCoach(false)}
      />
    </>
  );
};

export default EnhancedCoachFAB; 