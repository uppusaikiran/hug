import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, Target, CheckCircle2, Circle, Calendar, 
  Trophy, Star, Flame, Award, ChevronRight, MoreVertical,
  Play, Pause, RotateCcw
} from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';
import { useAuth } from '../hooks/useAuth';

const ChallengeDetailPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    challenges, 
    getChallengeTemplate, 
    updateChallengeProgress,
    abandonChallenge,
    loading 
  } = useChallenges();

  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [showAbandonModal, setShowAbandonModal] = useState(false);

  const challenge = challenges.find(c => c.id === challengeId);
  const template = challenge ? getChallengeTemplate(challenge.title) : null;

  useEffect(() => {
    if (challenge && template) {
      // Calculate completed tasks based on progress
      const totalTasks = template.tasks.length;
      const completedCount = Math.round((challenge.progress / 100) * totalTasks);
      const completed = new Set<number>();
      for (let i = 0; i < completedCount; i++) {
        completed.add(i);
      }
      setCompletedTasks(completed);
    }
  }, [challenge, template]);

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!challenge || !template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Challenge Not Found</h2>
          <p className="text-gray-600 mb-6">The challenge you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/challenges')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Back to Challenges
          </button>
        </div>
      </div>
    );
  }

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'mindfulness': return 'from-blue-500 to-cyan-500';
      case 'gratitude': return 'from-yellow-500 to-orange-500';
      case 'exercise': return 'from-green-500 to-emerald-500';
      case 'sleep': return 'from-indigo-500 to-purple-500';
      case 'social': return 'from-pink-500 to-rose-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const daysLeft = Math.ceil((new Date(challenge.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((new Date().getTime() - new Date(challenge.start_date).getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = template.duration;

  const handleTaskToggle = async (taskIndex: number) => {
    const newCompletedTasks = new Set(completedTasks);
    
    if (completedTasks.has(taskIndex)) {
      newCompletedTasks.delete(taskIndex);
    } else {
      newCompletedTasks.add(taskIndex);
    }
    
    setCompletedTasks(newCompletedTasks);
    
    // Calculate new progress
    const newProgress = Math.round((newCompletedTasks.size / template.tasks.length) * 100);
    
    try {
      await updateChallengeProgress(challenge.id, newProgress);
    } catch (error) {
      console.error('Failed to update progress:', error);
      // Revert the change if update fails
      setCompletedTasks(completedTasks);
    }
  };

  const handleAbandonChallenge = async () => {
    try {
      await abandonChallenge(challenge.id);
      navigate('/challenges');
    } catch (error) {
      console.error('Failed to abandon challenge:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/challenges')}
              className="p-2 hover:bg-white/50 rounded-xl transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">{template.icon}</div>
                <h1 className="text-3xl font-bold text-gray-800">{challenge.title}</h1>
              </div>
              <p className="text-gray-600">{challenge.description}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowAbandonModal(true)}
                className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              >
                <MoreVertical className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
            <div className={`h-2 bg-gradient-to-r ${getCategoryGradient(template.category)} rounded-full mb-6`} />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{challenge.progress}%</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{completedTasks.size}/{template.tasks.length}</div>
                <div className="text-sm text-gray-600">Tasks Done</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{daysElapsed}/{totalDays}</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{Math.max(0, daysLeft)}</div>
                <div className="text-sm text-gray-600">Days Left</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${getCategoryGradient(template.category)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${challenge.progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tasks List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Tasks</h2>
          
          {template.tasks.map((task, index) => (
            <motion.div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 transition-all duration-300 ${
                completedTasks.has(index) ? 'bg-green-50/80 border-green-200' : 'hover:shadow-xl'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleTaskToggle(index)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    completedTasks.has(index)
                      ? `bg-gradient-to-r ${getCategoryGradient(template.category)} border-transparent text-white`
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {completedTasks.has(index) && <CheckCircle2 className="h-5 w-5" />}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-medium ${
                      completedTasks.has(index) ? 'text-green-700 line-through' : 'text-gray-800'
                    }`}>
                      {task}
                    </span>
                    {completedTasks.has(index) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 text-green-600"
                      >
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-medium">+10 pts</span>
                      </motion.div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Day {index + 1} of {totalDays}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Completion Celebration */}
        <AnimatePresence>
          {challenge.progress >= 100 && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
                <p className="text-gray-600 mb-6">You've completed the {challenge.title} challenge!</p>
                <button
                  onClick={() => navigate('/challenges')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  View All Challenges
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Abandon Challenge Modal */}
        <AnimatePresence>
          {showAbandonModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAbandonModal(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 max-w-md w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Abandon Challenge?</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to abandon this challenge? Your progress will be saved, but the challenge will be marked as incomplete.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAbandonModal(false)}
                    className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAbandonChallenge}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium"
                  >
                    Abandon
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChallengeDetailPage; 