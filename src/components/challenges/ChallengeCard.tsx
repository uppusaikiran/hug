import { motion } from 'framer-motion';
import { Award, Calendar, Clock, Target, ChevronRight, Star } from 'lucide-react';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    progress?: number;
    completedSteps?: number;
    totalSteps?: number;
  };
  onClick?: () => void;
  onContinue?: () => void;
}

const ChallengeCard = ({ challenge, onClick, onContinue }: ChallengeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mindfulness': return '🧘';
      case 'gratitude': return '🙏';
      case 'exercise': return '💪';
      case 'sleep': return '😴';
      case 'social': return '🤝';
      default: return '🌟';
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Category Color Bar */}
      <div className={`h-2 bg-gradient-to-r ${getCategoryGradient(challenge.category)}`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getCategoryIcon(challenge.category)}</div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">
                {challenge.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <span className="text-xs text-gray-500 capitalize">{challenge.category}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{challenge.duration}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {challenge.description}
        </p>

        {challenge.progress !== undefined ? (
          // Active Challenge View
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-semibold">{challenge.completedSteps}/{challenge.totalSteps} tasks</span>
            </div>
            
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${getCategoryGradient(challenge.category)} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${challenge.progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">{challenge.progress}%</span>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform" onClick={onContinue}>
                Continue
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ) : (
          // Challenge Browser View
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>{challenge.totalSteps || 0} tasks</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>4.8</span>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1">
              Start
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChallengeCard;