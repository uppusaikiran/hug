import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack,
  SkipForward,
  Clock, 
  Volume2, 
  Star,
  Moon,
  Sun,
  Wind,
  Sparkles,
  Heart,
  Mic,
  MicOff,
  Brain,
  Waves,
  TreePine,
  CloudRain,
  Flame,
  Zap,
  Target,
  Award,
  Calendar,
  TrendingUp,
  Users,
  MessageCircle,
  Headphones,
  Download,
  Share2,
  Settings,
  RotateCcw,
  CheckCircle,
  X,
  Video
} from 'lucide-react';
import MindfulnessCoach from '../components/voice/MindfulnessCoach';
import { 
  EmotionalAura, 
  HeartbeatAnimation, 
  CaringParticles, 
  CompassionateGlow,
  CareWave,
  HeartPulse,
  SupportingHands,
  WarmthIndicator,
  BreathingIndicator,
  LovingEmbraceBorder
} from '../components/ui/HugVisualElements';

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: 'guided' | 'breathing' | 'sleep' | 'focus' | 'anxiety' | 'stress';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  voiceGuided: boolean;
  backgroundSound?: string;
  benefits: string[];
  instructor?: string;
  rating: number;
  completions: number;
  image: string;
  audioUrl?: string;
  featured?: boolean;
}

interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  pattern: { inhale: number; hold: number; exhale: number; pause: number };
  duration: number; // in minutes
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
  color: string;
}

const MeditationPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [selectedBreathing, setSelectedBreathing] = useState<BreathingPattern | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMindfulnessCoach, setShowMindfulnessCoach] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Simulated user progress data - empty state for new users
  const userStats = {
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    favoriteCategory: 'Not set',
    weeklyGoal: 5,
    weeklyProgress: 0
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Target size={16} /> },
    { id: 'guided', label: 'Guided Meditations', icon: <Headphones size={16} /> },
    { id: 'breathing', label: 'Breathing Exercises', icon: <Wind size={16} /> },
    { id: 'sleep', label: 'Sleep Stories', icon: <Moon size={16} /> },
    { id: 'sounds', label: 'Ambient Sounds', icon: <Waves size={16} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Caring background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <CaringParticles particleCount={30} className="opacity-20" />
        <CareWave intensity="gentle" className="absolute top-0 left-0 right-0" />
        <CareWave intensity="gentle" className="absolute bottom-0 left-0 right-0 rotate-180" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <CompassionateGlow emotion="comfort">
          <div className="text-center mb-8">
            <HeartbeatAnimation intensity="gentle" className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mindfulness & Wellness
              </h1>
              <HeartPulse size={32} className="text-pink-500" />
            </HeartbeatAnimation>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered meditation, breathing exercises, and wellness programs designed to calm your mind, 
              reduce stress, and enhance your mental wellbeing.
            </p>
          </div>
        </CompassionateGlow>

        {/* Voice AI Integration Banner */}
        <LovingEmbraceBorder glowIntensity="warm" className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <EmotionalAura emotion="hopeful" intensity="gentle">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                </EmotionalAura>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold">AI-Guided Wellness</h3>
                    <SupportingHands className="text-lg" />
                  </div>
                  <p className="text-blue-100">
                    Experience personalized meditation with our empathetic AI companion - now with video chat!
                  </p>
                </div>
              </div>
              <HeartbeatAnimation intensity="gentle">
                <button 
                  onClick={() => setShowMindfulnessCoach(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all bg-white/20 hover:bg-white/30 text-white"
                >
                  <Brain className="h-5 w-5" />
                  Talk with AI Coach
                </button>
              </HeartbeatAnimation>
            </div>
            
            {/* New Feature Badge */}
            <div className="mt-4 flex items-center gap-3">
              <div className="bg-white/20 rounded-full px-3 py-1 text-sm flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>NEW: Video Chat Available</span>
              </div>
              <div className="bg-white/20 rounded-full px-3 py-1 text-sm flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>Voice Chat</span>
              </div>
              <WarmthIndicator level="high" />
            </div>
          </div>
        </LovingEmbraceBorder>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Sessions"
                value={userStats.totalSessions}
                icon={<Target className="h-6 w-6 text-blue-500" />}
                color="bg-blue-50 border-blue-200"
              />
              <StatsCard
                title="Mindful Minutes"
                value={userStats.totalMinutes}
                icon={<Clock className="h-6 w-6 text-green-500" />}
                color="bg-green-50 border-green-200"
              />
              <StatsCard
                title="Current Streak"
                value={`${userStats.currentStreak} days`}
                icon={<Flame className="h-6 w-6 text-orange-500" />}
                color="bg-orange-50 border-orange-200"
              />
              <StatsCard
                title="Weekly Progress"
                value={`${userStats.weeklyProgress}/${userStats.weeklyGoal}`}
                icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
                color="bg-purple-50 border-purple-200"
              />
            </div>

            {/* Quick Start Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickStartCard
                  title="Welcome Meditation"
                  description="Start your mindfulness journey"
                  duration="5 min"
                  icon={<Heart className="h-8 w-8 text-pink-500" />}
                  onClick={() => {
                    setSelectedSession(guidedMeditations[0]);
                    setActiveTab('guided');
                  }}
                />
                <QuickStartCard
                  title="Basic Breathing"
                  description="Simple breathing exercise"
                  duration="3 min"
                  icon={<Wind className="h-8 w-8 text-blue-500" />}
                  onClick={() => {
                    setSelectedBreathing(breathingPatterns[0]);
                    setActiveTab('breathing');
                  }}
                />
                <QuickStartCard
                  title="Gentle Sleep"
                  description="Introduction to sleep meditation"
                  duration="10 min"
                  icon={<Moon className="h-8 w-8 text-purple-500" />}
                  onClick={() => {
                    setSelectedSession(sleepStories[0]);
                    setActiveTab('sleep');
                  }}
                />
              </div>
            </div>

            {/* Getting Started Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Your Wellness Journey</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Start with our beginner-friendly content designed to introduce you to meditation, breathing exercises, 
                  and mindfulness practices. Your AI companion will guide you every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setSelectedSession(guidedMeditations[0]);
                      setActiveTab('guided');
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Start First Meditation
                  </button>
                  <button 
                    onClick={() => setActiveTab('breathing')}
                    className="bg-white border-2 border-purple-200 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                  >
                    Try Breathing Exercise
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guided Meditations Tab */}
        {activeTab === 'guided' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guidedMeditations.map(session => (
                <MeditationCard
                  key={session.id}
                  session={session}
                  onClick={() => setSelectedSession(session)}
                  isActive={selectedSession?.id === session.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Breathing Exercises Tab */}
        {activeTab === 'breathing' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breathingPatterns.map(pattern => (
                <BreathingCard
                  key={pattern.id}
                  pattern={pattern}
                  onClick={() => setSelectedBreathing(pattern)}
                  isActive={selectedBreathing?.id === pattern.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sleep Stories Tab */}
        {activeTab === 'sleep' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sleepStories.map(session => (
                <MeditationCard
                  key={session.id}
                  session={session}
                  onClick={() => setSelectedSession(session)}
                  isActive={selectedSession?.id === session.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ambient Sounds Tab */}
        {activeTab === 'sounds' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ambientSounds.map(sound => (
                <AmbientSoundCard
                  key={sound.id}
                  sound={sound}
                  onClick={() => setSelectedSession(sound)}
                  isActive={selectedSession?.id === sound.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Meditation Player */}
        <AnimatePresence>
          {selectedSession && (
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <MeditationPlayer
                session={selectedSession}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                onClose={() => setSelectedSession(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breathing Exercise Player */}
        <AnimatePresence>
          {selectedBreathing && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BreathingPlayer
                pattern={selectedBreathing}
                isActive={isBreathingActive}
                setIsActive={setIsBreathingActive}
                onClose={() => setSelectedBreathing(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mindfulness Coach Modal */}
      <MindfulnessCoach
        isOpen={showMindfulnessCoach}
        onClose={() => setShowMindfulnessCoach(false)}
      />
    </div>
  );
};

// Component definitions
const StatsCard = ({ title, value, icon, color }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className={`${color} rounded-xl p-6`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-600">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
  </div>
);

const QuickStartCard = ({ title, description, duration, icon, onClick }: {
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <motion.div
    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 cursor-pointer border border-gray-200 hover:shadow-lg transition-all"
    whileHover={{ y: -5 }}
    onClick={onClick}
  >
    <div className="flex items-center gap-4 mb-3">
      {icon}
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{duration}</span>
      <Play className="h-5 w-5 text-gray-600" />
    </div>
  </motion.div>
);

const MeditationCard = ({ session, onClick, isActive = false }: {
  session: MeditationSession;
  onClick: () => void;
  isActive?: boolean;
}) => (
  <motion.div
    className={`bg-white rounded-xl overflow-hidden shadow-sm border cursor-pointer transition-all ${
      isActive ? 'border-purple-500 shadow-lg' : 'border-gray-200 hover:shadow-lg'
    }`}
    whileHover={{ y: -5 }}
    onClick={onClick}
  >
    <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400">
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
            <Play className="h-8 w-8 ml-1" />
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Clock size={14} />
            <span>{session.duration} min</span>
          </div>
        </div>
      </div>
      {session.featured && (
        <div className="absolute top-3 right-3">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
        </div>
      )}
    </div>
    
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          session.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
          session.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {session.difficulty}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize">
          {session.category}
        </span>
      </div>
      
      <h3 className="font-semibold text-lg mb-2">{session.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{session.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm text-gray-600">{session.rating}</span>
        </div>
        <span className="text-xs text-gray-500">{session.completions} completions</span>
      </div>
    </div>
  </motion.div>
);

const BreathingCard = ({ pattern, onClick, isActive = false }: {
  pattern: BreathingPattern;
  onClick: () => void;
  isActive?: boolean;
}) => (
  <motion.div
    className={`bg-white rounded-xl p-6 cursor-pointer border transition-all ${
      isActive ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:shadow-lg'
    }`}
    whileHover={{ y: -5 }}
    onClick={onClick}
  >
    <div className={`w-16 h-16 ${pattern.color} rounded-full flex items-center justify-center mb-4`}>
      {pattern.icon}
    </div>
    
    <h3 className="font-semibold text-lg mb-2">{pattern.name}</h3>
    <p className="text-gray-600 text-sm mb-4">{pattern.description}</p>
    
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-gray-500">{pattern.duration} min</span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        pattern.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
        pattern.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
        'bg-red-100 text-red-700'
      }`}>
        {pattern.difficulty}
      </span>
    </div>
    
    <div className="text-center text-sm text-gray-600">
      {pattern.pattern.inhale}-{pattern.pattern.hold}-{pattern.pattern.exhale}-{pattern.pattern.pause}
    </div>
  </motion.div>
);

const AmbientSoundCard = ({ sound, onClick, isActive = false }: {
  sound: MeditationSession;
  onClick: () => void;
  isActive?: boolean;
}) => (
  <motion.div
    className={`bg-white rounded-xl p-6 cursor-pointer border transition-all ${
      isActive ? 'border-green-500 shadow-lg' : 'border-gray-200 hover:shadow-lg'
    }`}
    whileHover={{ y: -5 }}
    onClick={onClick}
  >
    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mb-4">
      <Waves className="h-8 w-8 text-white" />
    </div>
    
    <h3 className="font-semibold text-lg mb-2">{sound.title}</h3>
    <p className="text-gray-600 text-sm">{sound.description}</p>
  </motion.div>
);

const MeditationPlayer = ({ session, isPlaying, setIsPlaying, currentTime, setCurrentTime, onClose }: {
  session: MeditationSession;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  onClose: () => void;
}) => {
  const duration = session.duration * 60; // Convert to seconds
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{session.title}</h3>
          <p className="text-gray-600 text-sm">{session.instructor || 'AI Companion'}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
          <span>{session.duration}:00</span>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-8">
        <button className="text-gray-700 hover:text-gray-900">
          <SkipBack size={24} />
        </button>
        <button 
          className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
        </button>
        <button className="text-gray-700 hover:text-gray-900">
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
};

const BreathingPlayer = ({ pattern, isActive, setIsActive, onClose }: {
  pattern: BreathingPattern;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  onClose: () => void;
}) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [count, setCount] = useState(0);
  
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{pattern.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="mb-8">
        <motion.div
          className={`w-32 h-32 mx-auto ${pattern.color} rounded-full flex items-center justify-center mb-4`}
          animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 4, repeat: isActive ? Infinity : 0 }}
        >
          {pattern.icon}
        </motion.div>
        
        <div className="text-3xl font-bold mb-2 capitalize">{phase}</div>
        <div className="text-lg text-gray-600">
          {pattern.pattern.inhale}-{pattern.pattern.hold}-{pattern.pattern.exhale}-{pattern.pattern.pause}
        </div>
      </div>
      
      <button
        onClick={() => setIsActive(!isActive)}
        className={`w-full py-4 rounded-xl font-semibold transition-colors ${
          isActive 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isActive ? 'Stop' : 'Start'} Breathing Exercise
      </button>
    </motion.div>
  );
};

// Sample data aligned with huggy's comprehensive approach - minimal starter content
const guidedMeditations: MeditationSession[] = [
  {
    id: 'welcome-meditation',
    title: 'Welcome to Mindfulness',
    description: 'A gentle introduction to meditation and mindfulness practices. Perfect for beginners starting their wellness journey.',
    duration: 5,
    category: 'guided',
    difficulty: 'beginner',
    voiceGuided: true,
    benefits: ['Introduction to meditation', 'Calms mind', 'Builds foundation'],
    instructor: 'AI Companion',
    rating: 4.8,
    completions: 0,
    image: '/meditation-welcome.jpg',
    featured: true
  }
];

const breathingPatterns: BreathingPattern[] = [
  {
    id: 'basic-breathing',
    name: 'Basic Breathing',
    description: 'Simple breathing exercise to get started with mindful breathing',
    pattern: { inhale: 4, hold: 2, exhale: 4, pause: 2 },
    duration: 3,
    benefits: ['Reduces stress', 'Easy to learn', 'Calms nervous system'],
    difficulty: 'beginner',
    icon: <Wind className="h-8 w-8 text-white" />,
    color: 'bg-blue-500'
  }
];

const sleepStories: MeditationSession[] = [
  {
    id: 'gentle-sleep',
    title: 'Gentle Sleep Introduction',
    description: 'A brief introduction to sleep meditation and relaxation techniques.',
    duration: 10,
    category: 'sleep',
    difficulty: 'beginner',
    voiceGuided: true,
    benefits: ['Improves sleep', 'Promotes relaxation', 'Reduces bedtime anxiety'],
    instructor: 'AI Companion',
    rating: 4.7,
    completions: 0,
    image: '/sleep-intro.jpg'
  }
];

const ambientSounds: MeditationSession[] = [
  {
    id: 'nature-sounds',
    title: 'Gentle Nature',
    description: 'Soft nature sounds for relaxation and focus',
    duration: 30,
    category: 'focus',
    difficulty: 'beginner',
    voiceGuided: false,
    benefits: ['Improves focus', 'Masks distractions', 'Promotes calm'],
    rating: 4.5,
    completions: 0,
    image: '/ambient-nature.jpg'
  }
];

export default MeditationPage;