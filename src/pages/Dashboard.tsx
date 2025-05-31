import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BoltBadge from '../components/ui/BoltBadge';
import { 
  Heart, 
  MessageCircle,
  Clock,
  Award,
  Mic,
  Shield,
  Brain,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Users,
  BookOpen,
  Headphones,
  Activity,
  Sun,
  Moon,
  Sunrise,
  Sunset
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MindfulnessCoach from '../components/voice/MindfulnessCoach';
import MoodTracker from '../components/mood/MoodTracker';
import { useMoodTracking } from '../hooks/useMoodTracking';
import { 
  EmotionalAura, 
  HeartbeatAnimation, 
  CaringParticles, 
  CompassionateGlow,
  CareWave,
  HeartPulse,
  SupportingHands,
  WarmthIndicator
} from '../components/ui/HugVisualElements';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMindfulnessCoach, setShowMindfulnessCoach] = useState(false);
  const [streakData, setStreakData] = useState({
    meditation: 7,
    conversation: 3,
    challenges: 12
  });

  // Use the mood tracking hook
  const { currentMood, saveMood, getMoodStreak } = useMoodTracking();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Debug state changes
  useEffect(() => {
    console.log('Dashboard showMindfulnessCoach state changed to:', showMindfulnessCoach);
  }, [showMindfulnessCoach]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: "Good morning", icon: <Sunrise className="h-5 w-5" /> };
    if (hour < 17) return { text: "Good afternoon", icon: <Sun className="h-5 w-5" /> };
    if (hour < 21) return { text: "Good evening", icon: <Sunset className="h-5 w-5" /> };
    return { text: "Good night", icon: <Moon className="h-5 w-5" /> };
  };

  const greeting = getGreeting();

  const handleMoodSelect = async (mood: 'great' | 'good' | 'okay' | 'bad' | 'awful', notes?: string) => {
    try {
      await saveMood(mood, notes);
      console.log('Mood saved successfully:', mood, notes);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const getMoodColor = (mood: string | null) => {
    switch (mood) {
      case 'great': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'okay': return 'text-yellow-500';
      case 'bad': return 'text-orange-500';
      case 'awful': return 'text-red-500';
      default: return 'text-neutral-400';
    }
  };

  const getMoodEmoji = (mood: string | null) => {
    switch (mood) {
      case 'great': return '😊';
      case 'good': return '🙂';
      case 'okay': return '😐';
      case 'bad': return '😔';
      case 'awful': return '😢';
      default: return '❓';
    }
  };

  // Get mood streak for display
  const moodStreak = getMoodStreak();

  return (
    <div className="py-4 sm:py-6 space-y-4 sm:space-y-6 lg:space-y-8 relative overflow-hidden">
      {/* Bolt.new Badge */}
      <BoltBadge variant="text" position="top-right" />
      
      {/* Caring background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <CaringParticles particleCount={20} className="opacity-20" />
        <CareWave intensity="gentle" className="absolute top-0 left-0 right-0" />
        <CareWave intensity="gentle" className="absolute bottom-0 left-0 right-0 rotate-180" />
      </div>
      
      {/* Header with Personalized Greeting */}
      <header className="text-center px-2 sm:px-4 relative z-10">
        <CompassionateGlow emotion="warmth">
          <motion.div 
            className="flex items-center justify-center gap-2 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {greeting.icon}
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {greeting.text}
            </h1>
            <HeartPulse size={24} className="ml-2" />
          </motion.div>
        </CompassionateGlow>
        <motion.p 
          className="text-neutral-600 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your AI companion is here to support you
        </motion.p>
        <motion.p 
          className="text-xs sm:text-sm text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </motion.p>
      </header>

      {/* Voice Interface - Primary Feature */}
      <EmotionalAura emotion="hopeful" intensity="warm">
        <motion.section 
          className="bg-gradient-to-br from-primary-50/80 to-accent-50/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center border border-white/20 shadow-xl relative overflow-hidden mx-2 sm:mx-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-secondary-200/30 to-primary-200/30 rounded-full blur-xl"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-700 to-accent-700 bg-clip-text text-transparent">Start a Conversation</h2>
            <SupportingHands className="text-2xl" />
          </div>
          <p className="text-primary-600 mb-6 sm:mb-8 text-base sm:text-lg">Tap the microphone to talk with your AI companion</p>
          
          <div className="flex flex-col items-center">
            <div className="relative">
              <motion.div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-md flex items-center justify-center relative border border-white/30 shadow-xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 shadow-xl animate-glow relative z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Microphone button clicked!');
                    console.log('Current showMindfulnessCoach state:', showMindfulnessCoach);
                    setShowMindfulnessCoach(true);
                    console.log('showMindfulnessCoach should now be true');
                  }}
                  onMouseDown={() => console.log('Button mouse down')}
                  onMouseUp={() => console.log('Button mouse up')}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  style={{ pointerEvents: 'all' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Mic size={24} className="sm:w-7 sm:h-7" />
                  </motion.div>
                </motion.button>
                
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary-300/50"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent-300/50"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </div>
            
            <motion.p 
              className="text-sm text-primary-600 mt-4 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Tap to start voice conversation
            </motion.p>
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/conversation" 
                className="btn btn-primary flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Text Chat
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/crisis" 
                className="btn btn-outline-error flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                Crisis Support
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </EmotionalAura>

      {/* Mindfulness Coach Modal */}
      <MindfulnessCoach
        isOpen={showMindfulnessCoach}
        onClose={() => setShowMindfulnessCoach(false)}
      />

      {/* Mood Indicator & Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mx-2 sm:mx-0">
        <motion.div 
          className="card-glass relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary-500" />
              Current Mood
            </h3>
            <span className={`text-2xl ${getMoodColor(currentMood)}`}>
              {getMoodEmoji(currentMood)}
            </span>
          </div>
          
          {currentMood ? (
            <div className="space-y-3">
              <p className="text-neutral-600">
                You're feeling <span className={`font-semibold ${getMoodColor(currentMood)}`}>
                  {currentMood}
                </span> today
              </p>
              {moodStreak > 0 && (
                <p className="text-sm text-neutral-500">
                  🔥 {moodStreak} day{moodStreak > 1 ? 's' : ''} tracking streak
                </p>
              )}
              <Link 
                to="/mood" 
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <TrendingUp className="h-4 w-4" />
                View mood trends
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-neutral-600">How are you feeling today?</p>
              <MoodTracker 
                onMoodSelect={handleMoodSelect} 
                compact 
                currentMood={currentMood}
              />
            </div>
          )}
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-accent-500" />
            Today's Progress
          </h3>
          
          <div className="space-y-4">
            <ProgressItem 
              label="Mindful minutes"
              value={15}
              target={20}
              color="bg-primary-500"
            />
            <ProgressItem 
              label="Conversations"
              value={2}
              target={3}
              color="bg-secondary-500"
            />
            <ProgressItem 
              label="Challenges completed"
              value={1}
              target={2}
              color="bg-accent-500"
            />
          </div>
        </motion.div>
      </div>

      {/* Mood Tracker */}
      <CompassionateGlow emotion="care">
        <motion.section 
          className="mx-2 sm:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MoodTracker 
            onMoodSelect={handleMoodSelect}
            currentMood={currentMood}
          />
        </motion.section>
      </CompassionateGlow>

      {/* Quick Actions */}
      <EmotionalAura emotion="peaceful" intensity="gentle">
        <motion.section 
          className="mx-2 sm:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-100 p-4 sm:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <HeartbeatAnimation intensity="gentle" className="flex items-center gap-2">
                <Heart className="text-pink-500 w-5 h-5" />
                <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
              </HeartbeatAnimation>
              <WarmthIndicator level="high" />
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <QuickAction
                title="Meditation"
                description="Find peace"
                icon={<Brain className="h-5 w-5" />}
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
                link="/meditation"
              />
              <QuickAction
                title="Challenges"
                description="Grow stronger"
                icon={<Target className="h-5 w-5" />}
                bgColor="bg-green-50"
                borderColor="border-green-200"
                link="/challenges"
              />
              <QuickAction
                title="Resources"
                description="Get help"
                icon={<BookOpen className="h-5 w-5" />}
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
                link="/resources"
              />
              <QuickAction
                title="Crisis Support"
                description="Immediate help"
                icon={<Shield className="h-5 w-5" />}
                bgColor="bg-red-50"
                borderColor="border-red-200"
                link="/crisis"
              />
            </div>
          </div>
        </motion.section>
      </EmotionalAura>

      {/* Streak Counters & Achievements */}
      <CompassionateGlow emotion="support">
        <motion.section 
          className="mx-2 sm:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-100 p-4 sm:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <HeartbeatAnimation intensity="gentle" className="flex items-center gap-2">
                <Award className="text-yellow-500 w-5 h-5" />
                <h2 className="text-lg font-semibold text-gray-800">Your Progress</h2>
              </HeartbeatAnimation>
              <SupportingHands className="text-lg" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ProgressItem 
                label="Meditation Streak"
                value={streakData.meditation}
                target={30}
                color="text-purple-600"
              />
              <ProgressItem 
                label="Conversations"
                value={streakData.conversation}
                target={10}
                color="text-blue-600"
              />
              <ProgressItem 
                label="Challenges Completed"
                value={streakData.challenges}
                target={20}
                color="text-green-600"
              />
            </div>
          </div>
        </motion.section>
      </CompassionateGlow>

      {/* Recent Activity */}
      <EmotionalAura emotion="comforted" intensity="gentle">
        <motion.section 
          className="mx-2 sm:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-100 p-4 sm:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <HeartbeatAnimation intensity="gentle" className="flex items-center gap-2">
                <Activity className="text-blue-500 w-5 h-5" />
                <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              </HeartbeatAnimation>
              <WarmthIndicator level="medium" />
            </div>
            
            <div className="space-y-3">
              <ActivityItem
                icon={<MessageCircle className="h-4 w-4 text-blue-500" />}
                title="Conversation Session"
                time="2 hours ago"
                description="Discussed anxiety management techniques"
              />
              <ActivityItem
                icon={<Brain className="h-4 w-4 text-purple-500" />}
                title="Meditation Complete"
                time="Yesterday"
                description="10-minute mindfulness session"
              />
              <ActivityItem
                icon={<Heart className="h-4 w-4 text-pink-500" />}
                title="Mood Logged"
                time="Yesterday"
                description={`Feeling ${currentMood || 'good'} with notes`}
              />
            </div>
          </div>
        </motion.section>
      </EmotionalAura>

      {/* Community & Social Features */}
      <motion.section 
        className="bg-gradient-to-r from-success-50 to-primary-50 rounded-xl p-6 border border-success-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-success-500" />
            Community Highlights
          </h2>
          <Link 
            to="/challenges" 
            className="text-sm text-success-600 hover:text-success-700"
          >
            Join community
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-success-100">
            <h3 className="font-semibold text-success-800 mb-2">Weekly Challenge</h3>
            <p className="text-sm text-neutral-600 mb-3">
              "7 Days of Gratitude" - 2,847 participants
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-success-100 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full w-3/4"></div>
              </div>
              <span className="text-xs text-success-600">75% complete</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-primary-100">
            <h3 className="font-semibold text-primary-800 mb-2">Success Story</h3>
            <p className="text-sm text-neutral-600 mb-2">
              "HUG helped me through my anxiety. The voice companion feels so real and caring."
            </p>
            <p className="text-xs text-neutral-500">- Anonymous user</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  link: string;
}

const QuickAction = ({ title, description, icon, bgColor, borderColor, link }: QuickActionProps) => (
  <Link to={link}>
    <motion.div 
      className={`${bgColor} ${borderColor} border rounded-xl p-4 h-full hover:shadow-md transition-all duration-200`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs text-neutral-600">{description}</p>
    </motion.div>
  </Link>
);

interface ProgressItemProps {
  label: string;
  value: number;
  target: number;
  color: string;
}

const ProgressItem = ({ label, value, target, color }: ProgressItemProps) => {
  const percentage = Math.min((value / target) * 100, 100);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-neutral-600">{label}</span>
        <span className="text-sm font-semibold">{value}/{target}</span>
      </div>
      <div className="w-full bg-neutral-100 rounded-full h-2">
        <motion.div 
          className={`${color} h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  );
};

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  description: string;
}

const ActivityItem = ({ icon, title, time, description }: ActivityItemProps) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold">{title}</h4>
        <span className="text-xs text-neutral-500">{time}</span>
      </div>
      <p className="text-xs text-neutral-600">{description}</p>
    </div>
  </div>
);

export default Dashboard;