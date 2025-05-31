import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Target, Clock, Star, Brain } from 'lucide-react';
import { useState } from 'react';
import MindfulnessCoach from '../voice/MindfulnessCoach';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  onBrowseAll?: () => void;
}

const QuickStartModal = ({ isOpen, onClose, onStart, onBrowseAll }: QuickStartModalProps) => {
  const [showMindfulnessCoach, setShowMindfulnessCoach] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            
            <motion.div
              className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-t-2xl md:rounded-2xl shadow-2xl z-50 max-w-lg w-full border border-white/20"
              initial={{ y: '100%', opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '100%', opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Quick Start Challenge
                      </h2>
                      <p className="text-gray-600 text-sm">Begin your wellness journey today</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* AI Mindfulness Coach Section */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">🧠</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">AI Mindfulness Coach</h3>
                      <p className="text-gray-600 text-sm">Talk with your personal wellness companion</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Brain className="h-4 w-4" />
                      <span>Voice-powered</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-600 font-medium">AI-powered</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-white/50 mb-4">
                    <p className="text-sm text-gray-700">
                      Tap the microphone to start a natural conversation with your AI mindfulness coach. 
                      Share your thoughts, get guided meditations, or simply talk about what's on your mind.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowMindfulnessCoach(true)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                  >
                    <Brain size={20} />
                    Talk with AI Coach
                  </button>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border border-yellow-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">🙏</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">7-Day Gratitude Quest</h3>
                      <p className="text-gray-600 text-sm">Practice daily gratitude to boost your mood</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>7 days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>7 tasks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-600 font-medium">4.9</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-white/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Daily Gratitude Practice</h4>
                        <p className="text-sm text-gray-600">Write down 3 things you're grateful for each day</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-white/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Mindful Reflection</h4>
                        <p className="text-sm text-gray-600">Take time to appreciate positive moments</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-white/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Share Appreciation</h4>
                        <p className="text-sm text-gray-600">Express gratitude to someone special</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
                  >
                    Maybe Later
                  </button>
                  {onBrowseAll && (
                    <button
                      onClick={onBrowseAll}
                      className="flex-1 py-3 px-4 border-2 border-purple-200 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 font-medium"
                    >
                      Browse All
                    </button>
                  )}
                  <button
                    onClick={onStart}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                  >
                    Start Challenge
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mindfulness Coach Modal */}
      <MindfulnessCoach
        isOpen={showMindfulnessCoach}
        onClose={() => setShowMindfulnessCoach(false)}
      />
    </>
  );
};

export default QuickStartModal;