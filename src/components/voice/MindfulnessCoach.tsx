import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  Sparkles,
  Settings,
  X
} from 'lucide-react';

// TypeScript declaration for ElevenLabs ConvAI custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
        style?: React.CSSProperties;
      };
    }
  }
}

interface MindfulnessCoachProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey?: string;
  agentId?: string;
}

const MindfulnessCoach = ({ isOpen, onClose, apiKey, agentId }: MindfulnessCoachProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [localAgentId, setLocalAgentId] = useState(agentId || 'agent_01jwht2cd9f58rzarx1xksvqft');
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  console.log('MindfulnessCoach received isOpen prop:', isOpen);

  useEffect(() => {
    console.log('MindfulnessCoach isOpen changed:', isOpen);
    // Check if the widget is loaded after a short delay
    const timer = setTimeout(() => {
      setIsWidgetLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleClose = () => {
    console.log('MindfulnessCoach handleClose called');
    setIsWidgetLoaded(false);
    onClose();
  };

  const saveSettings = () => {
    setShowSettings(false);
  };

  console.log('MindfulnessCoach rendering, isOpen:', isOpen);
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-sm mx-auto flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-slate-700/80">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  Mindfulness Coach
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Your AI-powered wellness companion
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleClose}
                className="p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-800"
              >
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Agent ID
                    </label>
                    <input
                      type="text"
                      value={localAgentId}
                      onChange={(e) => setLocalAgentId(e.target.value)}
                      placeholder="agent_01jwht2cd9f58rzarx1xksvqft"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                      Your ElevenLabs Conversational AI Agent ID
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={saveSettings}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 p-6 bg-gradient-to-br from-white/60 via-slate-50/80 to-blue-50/60 dark:from-slate-900/60 dark:via-slate-800/80 dark:to-slate-900/60 overflow-y-auto">
            {/* Welcome Message */}
            <div className="text-center mb-4">
              <div className="flex justify-center mb-3">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-xl shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500 drop-shadow-lg" />
                  </motion.div>
                </div>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-2">
                Welcome to Your Mindfulness Journey
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Click the microphone below to start our conversation.
              </p>
            </div>

            {/* ElevenLabs ConvAI Widget Container */}
            <div className="widget-container">
              {!isWidgetLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50/90 to-blue-50/90 dark:from-slate-800/90 dark:to-slate-900/90 rounded-2xl">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-700 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading AI Coach...</p>
                  </div>
                </div>
              )}
              <elevenlabs-convai agent-id={localAgentId} />
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="group text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-sm">🎤</span>
                </div>
                <h4 className="font-bold text-blue-900 dark:text-blue-100 text-xs mb-1">Voice Interaction</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-snug">Natural conversation with your AI coach</p>
              </div>
              
              <div className="group text-center p-3 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-sm">🧘</span>
                </div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-100 text-xs mb-1">Guided Meditation</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-snug">Personalized meditation sessions</p>
              </div>
              
              <div className="group text-center p-3 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-xl border border-purple-200/50 dark:border-purple-700/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-white text-sm">💜</span>
                </div>
                <h4 className="font-bold text-purple-900 dark:text-purple-100 text-xs mb-1">Wellness Support</h4>
                <p className="text-xs text-purple-700 dark:text-purple-300 leading-snug">Emotional support and guidance</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900/30 dark:via-blue-900/30 dark:to-purple-900/30 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50 backdrop-blur-sm shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white text-sm">💡</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-100 text-xs mb-2">How to get started:</h4>
                  <ul className="text-xs text-indigo-700 dark:text-indigo-300 space-y-1 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-indigo-500 rounded-full flex-shrink-0"></span>
                      Click the microphone button above to start talking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-indigo-500 rounded-full flex-shrink-0"></span>
                      Ask for guided meditation, breathing exercises, or wellness advice
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-indigo-500 rounded-full flex-shrink-0"></span>
                      Share what's causing you stress or anxiety
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-indigo-500 rounded-full flex-shrink-0"></span>
                      Let your AI coach guide you through mindful moments
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MindfulnessCoach; 