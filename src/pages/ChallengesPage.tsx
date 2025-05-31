import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Star, Calendar, ArrowRight, Award, Target, Heart, Plus, 
  Flame, Zap, Crown, Users, TrendingUp, Clock, CheckCircle2,
  Sparkles, Medal, Gift, ChevronRight
} from 'lucide-react';
import { useChallenges, ChallengeTemplate } from '../hooks/useChallenges';
import { useAuth } from '../hooks/useAuth';
import { ChallengeCard, ChallengeBrowser, QuickStartModal } from '../components/challenges';

const ChallengesPage = () => {
  const { user } = useAuth();
  const {
    challenges,
    loading,
    error,
    startChallenge,
    getActiveChallenges,
    getCompletedChallenges,
    getChallengeTemplate,
    challengeTemplates
  } = useChallenges();

  const [activeTab, setActiveTab] = useState('discover');
  const [showQuickStart, setShowQuickStart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isStarting, setIsStarting] = useState(false);

  const activeChallenges = getActiveChallenges();
  const completedChallenges = getCompletedChallenges();

  // Calculate user stats
  const totalChallenges = challenges.length;
  const completionRate = totalChallenges > 0 ? Math.round((completedChallenges.length / totalChallenges) * 100) : 0;
  const currentStreak = 3; // This would be calculated from actual data
  const totalPoints = completedChallenges.length * 100 + activeChallenges.reduce((sum, c) => sum + c.progress, 0);

  const handleStartChallenge = async (template: ChallengeTemplate) => {
    if (!user) return;

    setIsStarting(true);
    try {
      await startChallenge(template);
      setShowQuickStart(false);
      setActiveTab('active');
    } catch (error) {
      console.error('Failed to start challenge:', error);
    } finally {
      setIsStarting(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Challenges', icon: '🌟', color: 'from-purple-500 to-pink-500' },
    { id: 'mindfulness', name: 'Mindfulness', icon: '🧘', color: 'from-blue-500 to-cyan-500' },
    { id: 'gratitude', name: 'Gratitude', icon: '🙏', color: 'from-yellow-500 to-orange-500' },
    { id: 'exercise', name: 'Movement', icon: '💪', color: 'from-green-500 to-emerald-500' },
    { id: 'sleep', name: 'Sleep', icon: '😴', color: 'from-indigo-500 to-purple-500' },
    { id: 'social', name: 'Connection', icon: '🤝', color: 'from-pink-500 to-rose-500' }
  ];

  const featuredChallenges = challengeTemplates?.slice(0, 3) || [];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join the Wellness Journey</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Sign in to start challenges, track your progress, and build healthy habits that last.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header with Stats */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Wellness Challenges
              </h1>
              <p className="text-gray-600 text-lg">
                Transform your life one challenge at a time ✨
              </p>
            </div>
            
            {/* User Stats */}
            <div className="flex gap-4 mt-4 lg:mt-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-600">Streak</div>
                    <div className="font-bold text-orange-600">{currentStreak} days</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-600">Points</div>
                    <div className="font-bold text-yellow-600">{totalPoints}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-600">Completed</div>
                    <div className="font-bold text-purple-600">{completedChallenges.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-lg inline-flex">
            {[
              { id: 'discover', label: 'Discover', icon: Sparkles },
              { id: 'active', label: `Active (${activeChallenges.length})`, icon: Zap },
              { id: 'completed', label: `Completed (${completedChallenges.length})`, icon: CheckCircle2 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Featured Challenges */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">🔥 Featured Challenges</h2>
                  <button 
                    onClick={() => setShowQuickStart(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Quick Start
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredChallenges.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <FeaturedChallengeCard 
                        template={template} 
                        onStart={() => handleStartChallenge(template)}
                        isStarting={isStarting}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Browse by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'border-purple-300 bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg scale-105'
                          : 'border-white/30 bg-white/60 hover:bg-white/80 hover:scale-105'
                      }`}
                    >
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <div className="font-semibold text-gray-800 text-sm">{category.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* All Challenges */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">🌟 All Challenges</h2>
                <ChallengeBrowser
                  categories={categories.map(c => c.id).filter(id => id !== 'all')}
                  templates={challengeTemplates?.filter(t => 
                    selectedCategory === 'all' || t.category === selectedCategory
                  ) || []}
                  onSelectTemplate={handleStartChallenge}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <ActiveChallengesView 
                challenges={activeChallenges}
                getChallengeTemplate={getChallengeTemplate}
                loading={loading}
                error={error}
                onStartChallenge={() => setShowQuickStart(true)}
              />
            </motion.div>
          )}

          {activeTab === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <CompletedChallengesView 
                challenges={completedChallenges}
                getChallengeTemplate={getChallengeTemplate}
                completionRate={completionRate}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Start Modal */}
        <QuickStartModal
          isOpen={showQuickStart}
          onClose={() => setShowQuickStart(false)}
          onStart={() => {
            const quickStartTemplate = challengeTemplates?.find(t => t.id === 'gratitude-7') || challengeTemplates?.[0];
            if (quickStartTemplate) {
              handleStartChallenge(quickStartTemplate);
            }
          }}
          onBrowseAll={() => {
            setShowQuickStart(false);
            setActiveTab('discover');
          }}
        />
      </div>
    </div>
  );
};

// Featured Challenge Card Component
const FeaturedChallengeCard = ({ template, onStart, isStarting }: {
  template: ChallengeTemplate;
  onStart: () => void;
  isStarting: boolean;
}) => {
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

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -5 }}
    >
      <div className={`h-2 bg-gradient-to-r ${getCategoryGradient(template.category)}`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{template.icon}</div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryGradient(template.category)} text-white`}>
            {template.duration} days
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {template.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {template.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Target className="h-4 w-4" />
            <span>{template.tasks.length} tasks</span>
          </div>
          
          <button
            onClick={onStart}
            disabled={isStarting}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {isStarting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <>
                Start
                <ChevronRight className="h-3 w-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Active Challenges View Component
const ActiveChallengesView = ({ challenges, getChallengeTemplate, loading, error, onStartChallenge }: any) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-red-700 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div className="text-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="h-12 w-12 text-purple-500" />
          </div>
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Journey?</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You don't have any active challenges yet. Start your first challenge and begin building healthy habits!
        </p>
        <button 
          onClick={onStartChallenge}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Start Your First Challenge
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge: any, index: number) => {
          const template = getChallengeTemplate(challenge.title);
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ActiveChallengeCard challenge={challenge} template={template} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Active Challenge Card Component
const ActiveChallengeCard = ({ challenge, template }: any) => {
  const navigate = useNavigate();
  
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

  const completedSteps = Math.round((challenge.progress / 100) * (template?.tasks.length || 1));
  const totalSteps = template?.tasks.length || 1;
  const daysLeft = Math.ceil((new Date(challenge.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className={`h-2 bg-gradient-to-r ${getCategoryGradient(template?.category || 'default')}`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-2xl">{template?.icon || '🌟'}</div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{daysLeft} days left</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-gray-800 mb-2">{challenge.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-semibold">{completedSteps}/{totalSteps} tasks</span>
          </div>
          
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getCategoryGradient(template?.category || 'default')} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${challenge.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">{challenge.progress}%</span>
            <button 
              onClick={() => navigate(`/challenges/${challenge.id}`)}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              Continue
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Completed Challenges View Component
const CompletedChallengesView = ({ challenges, getChallengeTemplate, completionRate }: any) => {
  if (challenges.length === 0) {
    return (
      <div className="text-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-12 w-12 text-green-500" />
          </div>
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Trophy Case Awaits</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Complete challenges to earn trophies and see your achievements here. Every small step counts!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Achievement Summary */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Crown className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Congratulations!</h2>
            <p className="text-green-100">You've completed {challenges.length} challenge{challenges.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{challenges.length}</div>
            <div className="text-green-100 text-sm">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{completionRate}%</div>
            <div className="text-green-100 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{challenges.length * 100}</div>
            <div className="text-green-100 text-sm">Points Earned</div>
          </div>
        </div>
      </div>

      {/* Completed Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge: any, index: number) => {
          const template = getChallengeTemplate(challenge.title);
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CompletedChallengeCard challenge={challenge} template={template} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Completed Challenge Card Component
const CompletedChallengeCard = ({ challenge, template }: any) => {
  const completedDate = new Date(challenge.end_date).toLocaleDateString();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative">
      <div className="absolute top-4 right-4">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-5 w-5 text-white" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-2xl mb-4">{template?.icon || '🏆'}</div>
        
        <h3 className="font-bold text-lg text-gray-800 mb-2">{challenge.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Completed on {completedDate}</span>
          <div className="flex items-center gap-1">
            <Medal className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold text-yellow-600">100 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;