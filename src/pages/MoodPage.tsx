import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  TrendingUp, 
  Calendar, 
  BarChart3,
  Clock,
  Smile,
  Meh,
  Frown,
  ArrowLeft,
  Download,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MoodTracker from '../components/mood/MoodTracker';
import { useMoodTracking, MoodType } from '../hooks/useMoodTracking';

const MoodPage = () => {
  const { currentMood, moodHistory, saveMood, getMoodStreak } = useMoodTracking();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');
  const [showAnalytics, setShowAnalytics] = useState(true);

  const handleMoodSelect = async (mood: MoodType, notes?: string) => {
    try {
      await saveMood(mood, notes);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const getMoodIcon = (mood: MoodType, size = 20) => {
    switch (mood) {
      case 'great':
        return <Smile size={size} className="text-green-500" />;
      case 'good':
        return <Smile size={size} className="text-blue-500" />;
      case 'okay':
        return <Meh size={size} className="text-yellow-500" />;
      case 'bad':
        return <Frown size={size} className="text-orange-500" />;
      case 'awful':
        return <Frown size={size} className="text-red-500" />;
    }
  };

  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case 'great': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'okay': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'bad': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'awful': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getFilteredHistory = () => {
    const now = new Date();
    let cutoffDate = new Date();

    switch (selectedTimeframe) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case 'all':
        return moodHistory;
    }

    return moodHistory.filter(entry => entry.timestamp > cutoffDate.getTime());
  };

  const getMoodStats = () => {
    const filteredHistory = getFilteredHistory();
    if (filteredHistory.length === 0) return null;

    const moodCounts = filteredHistory.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<MoodType, number>);

    const mostCommon = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0] as MoodType] > moodCounts[b[0] as MoodType] ? a : b
    )[0] as MoodType;

    const averageScore = filteredHistory.reduce((sum, entry) => {
      const scores = { awful: 1, bad: 2, okay: 3, good: 4, great: 5 };
      return sum + scores[entry.mood];
    }, 0) / filteredHistory.length;

    return {
      totalEntries: filteredHistory.length,
      mostCommon,
      averageScore: Math.round(averageScore * 10) / 10,
      moodCounts
    };
  };

  const stats = getMoodStats();
  const streak = getMoodStreak();

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard" 
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Mood Tracker
            </h1>
            <p className="text-neutral-600 mt-1">Track and understand your emotional wellbeing</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="btn btn-outline flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </button>
          <div className="relative">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as 'week' | 'month' | 'all')}
              className="appearance-none bg-white border border-neutral-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="all">All time</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </header>

      {/* Current Mood & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary-500" />
              Today's Mood
            </h3>
            {currentMood && (
              <span className="text-2xl">
                {currentMood === 'great' && '😊'}
                {currentMood === 'good' && '🙂'}
                {currentMood === 'okay' && '😐'}
                {currentMood === 'bad' && '😔'}
                {currentMood === 'awful' && '😢'}
              </span>
            )}
          </div>
          
          {currentMood ? (
            <div className="space-y-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getMoodColor(currentMood)}`}>
                {getMoodIcon(currentMood, 16)}
                <span className="text-sm font-medium capitalize">{currentMood}</span>
              </div>
              <p className="text-sm text-neutral-600">
                You've been tracking your mood consistently!
              </p>
            </div>
          ) : (
            <p className="text-neutral-600 text-sm">
              No mood recorded today. How are you feeling?
            </p>
          )}
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-8 w-8 opacity-80" />
            <span className="text-3xl font-bold">{streak}</span>
          </div>
          <h3 className="font-semibold text-lg">Day Streak</h3>
          <p className="text-primary-100 text-sm">
            {streak > 0 ? 'Keep it up!' : 'Start your streak today'}
          </p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl p-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 opacity-80" />
            <span className="text-3xl font-bold">{moodHistory.length}</span>
          </div>
          <h3 className="font-semibold text-lg">Total Entries</h3>
          <p className="text-accent-100 text-sm">Mood records tracked</p>
        </motion.div>
      </div>

      {/* Mood Tracker */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <MoodTracker 
          onMoodSelect={handleMoodSelect}
          currentMood={currentMood}
        />
      </motion.section>

      {/* Analytics & Insights */}
      {stats && (
        <motion.section 
          className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-500" />
              Mood Analytics
            </h2>
            <button 
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {showAnalytics ? 'Hide' : 'Show'} Details
            </button>
          </div>

          {showAnalytics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {getMoodIcon(stats.mostCommon, 24)}
                </div>
                <h3 className="font-semibold text-neutral-800 capitalize">{stats.mostCommon}</h3>
                <p className="text-sm text-neutral-600">Most common mood</p>
              </div>

              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 mb-1">
                  {stats.averageScore}/5
                </div>
                <h3 className="font-semibold text-neutral-800">Average Score</h3>
                <p className="text-sm text-neutral-600">Overall wellbeing</p>
              </div>

              <div className="text-center p-4 bg-neutral-50 rounded-lg">
                <div className="text-2xl font-bold text-accent-600 mb-1">
                  {stats.totalEntries}
                </div>
                <h3 className="font-semibold text-neutral-800">Entries</h3>
                <p className="text-sm text-neutral-600">In selected period</p>
              </div>
            </div>
          )}
        </motion.section>
      )}

      {/* Mood History */}
      <motion.section 
        className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary-500" />
          Recent Mood History
        </h2>

        {getFilteredHistory().length > 0 ? (
          <div className="space-y-4">
            {getFilteredHistory().slice(0, 10).map((entry, index) => (
              <motion.div 
                key={entry.timestamp}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  {getMoodIcon(entry.mood)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">{entry.mood}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getMoodColor(entry.mood)}`}>
                        {entry.mood}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-neutral-600 mt-1">{entry.notes}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-800">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {new Date(entry.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">No mood data yet</h3>
            <p className="text-neutral-600 mb-4">
              Start tracking your mood to see insights and trends over time.
            </p>
            <p className="text-sm text-neutral-500">
              Regular mood tracking helps you understand patterns and improve your mental wellbeing.
            </p>
          </div>
        )}
      </motion.section>

      {/* Tips & Insights */}
      <motion.section 
        className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-primary-800">
          💡 Mood Tracking Tips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-primary-100">
            <h3 className="font-semibold text-primary-800 mb-2">Be Consistent</h3>
            <p className="text-sm text-neutral-600">
              Track your mood at the same time each day for better insights and patterns.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-primary-100">
            <h3 className="font-semibold text-primary-800 mb-2">Add Context</h3>
            <p className="text-sm text-neutral-600">
              Include notes about what influenced your mood to identify triggers and boosters.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-primary-100">
            <h3 className="font-semibold text-primary-800 mb-2">Look for Patterns</h3>
            <p className="text-sm text-neutral-600">
              Review your mood history regularly to understand what affects your wellbeing.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-primary-100">
            <h3 className="font-semibold text-primary-800 mb-2">Celebrate Progress</h3>
            <p className="text-sm text-neutral-600">
              Acknowledge positive trends and improvements in your overall mood patterns.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default MoodPage; 