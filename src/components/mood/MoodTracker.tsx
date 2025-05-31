import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Meh, Frown, Calendar, Check, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmotionalAura, HeartbeatAnimation, CaringParticles } from '../ui/HugVisualElements';

interface MoodData {
  date: Date;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'awful';
  notes?: string;
}

interface MoodTrackerProps {
  moodData?: MoodData[];
  onMoodSelect?: (mood: MoodData['mood'], notes?: string) => void;
  compact?: boolean;
  currentMood?: MoodData['mood'] | null;
}

const MoodTracker = ({ onMoodSelect, compact = false, currentMood }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodData['mood'] | null>(currentMood || null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleMoodSubmit = async () => {
    if (selectedMood && onMoodSelect) {
      setIsSubmitting(true);
      try {
        await onMoodSelect(selectedMood, notes);
        setShowSuccess(true);
        setNotes('');
        
        // Hide success message after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      } catch (error) {
        console.error('Error saving mood:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleMoodSelect = (mood: MoodData['mood']) => {
    setSelectedMood(mood);
    setShowSuccess(false);
  };

  const getMoodIcon = (mood: MoodData['mood'], size = 24) => {
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
      default:
        return <Meh size={size} className="text-neutral-400" />;
    }
  };

  const getMoodColor = (mood: MoodData['mood']) => {
    switch (mood) {
      case 'great': return 'border-green-200 bg-green-50';
      case 'good': return 'border-blue-200 bg-blue-50';
      case 'okay': return 'border-yellow-200 bg-yellow-50';
      case 'bad': return 'border-orange-200 bg-orange-50';
      case 'awful': return 'border-red-200 bg-red-50';
      default: return 'border-neutral-200 bg-neutral-50';
    }
  };
  
  return (
    <EmotionalAura 
      emotion={selectedMood === 'great' ? 'joyful' : selectedMood === 'good' ? 'hopeful' : selectedMood === 'okay' ? 'calm' : selectedMood === 'bad' ? 'comforted' : 'peaceful'} 
      intensity="gentle"
    >
      <div className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-100 relative overflow-hidden ${compact ? 'p-4' : 'p-6'}`}>
        <CaringParticles particleCount={8} className="opacity-40" />
        
        <div className="flex justify-between items-center mb-4 relative z-10">
          <HeartbeatAnimation intensity="gentle" className="flex items-center gap-2">
            <Heart className="text-pink-500 w-5 h-5" />
            <h2 className={compact ? 'text-base font-semibold text-gray-800' : 'text-lg font-semibold text-gray-800'}>
              {compact ? 'How are you feeling?' : 'Mood Tracker'}
            </h2>
          </HeartbeatAnimation>
          {showSuccess && (
            <motion.div
              className="flex items-center gap-1 text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Check size={16} />
              <span>Saved!</span>
            </motion.div>
          )}
        </div>
      
      {/* Mood Selection - Always show in compact mode, conditionally in full mode */}
      <div className="mb-4">
        {!compact && (
          <p className="text-neutral-700 mb-4">How are you feeling today?</p>
        )}
        
        <div className={`grid ${compact ? 'grid-cols-5 gap-2' : 'flex justify-between'} items-center`}>
          <MoodButton 
            mood="great" 
            icon={getMoodIcon('great', compact ? 20 : 24)} 
            label="Great"
            isSelected={selectedMood === 'great'}
            onClick={() => handleMoodSelect('great')}
            compact={compact}
          />
          
          <MoodButton 
            mood="good" 
            icon={getMoodIcon('good', compact ? 20 : 24)} 
            label="Good"
            isSelected={selectedMood === 'good'}
            onClick={() => handleMoodSelect('good')}
            compact={compact}
          />
          
          <MoodButton 
            mood="okay" 
            icon={getMoodIcon('okay', compact ? 20 : 24)} 
            label="Okay"
            isSelected={selectedMood === 'okay'}
            onClick={() => handleMoodSelect('okay')}
            compact={compact}
          />
          
          <MoodButton 
            mood="bad" 
            icon={getMoodIcon('bad', compact ? 20 : 24)} 
            label="Bad"
            isSelected={selectedMood === 'bad'}
            onClick={() => handleMoodSelect('bad')}
            compact={compact}
          />
          
          <MoodButton 
            mood="awful" 
            icon={getMoodIcon('awful', compact ? 20 : 24)} 
            label="Awful"
            isSelected={selectedMood === 'awful'}
            onClick={() => handleMoodSelect('awful')}
            compact={compact}
          />
        </div>
        
        {/* Notes and Save Button - Only show in full mode or when mood is selected in compact mode */}
        <AnimatePresence>
          {selectedMood && (!compact || (compact && selectedMood !== currentMood)) && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!compact && (
                <textarea
                  className="w-full p-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm mb-3"
                  placeholder="Add notes about how you're feeling... (optional)"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              )}
              
              <button 
                className={`${compact ? 'w-full text-sm py-2' : 'py-2 px-4'} btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={handleMoodSubmit}
                disabled={isSubmitting || showSuccess}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <Check size={16} />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>{compact ? 'Save Mood' : 'Save Mood'}</span>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Weekly Mood Chart - Only show in full mode */}
      {!compact && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-sm text-neutral-700">
              <Calendar size={14} />
              <span>Weekly Mood</span>
            </div>
            <Link 
              to="/mood" 
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              View details
            </Link>
          </div>
          
          <div className="flex justify-center items-center h-32 border-2 border-dashed border-neutral-200 rounded-lg">
            <div className="text-center">
              <p className="text-neutral-600 text-sm mb-2">No mood data yet</p>
              <p className="text-neutral-500 text-xs">Start tracking your mood to see trends</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Mood Display in Compact Mode */}
      {compact && currentMood && selectedMood === currentMood && (
        <div className={`mt-3 p-3 rounded-lg border ${getMoodColor(currentMood)}`}>
          <div className="flex items-center gap-2">
            {getMoodIcon(currentMood, 20)}
            <span className="text-sm font-medium text-neutral-700">
              You're feeling {currentMood} today
            </span>
          </div>
        </div>
      )}
      </div>
    </EmotionalAura>
  );
};

interface MoodButtonProps {
  mood: string;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  compact?: boolean;
}

const MoodButton = ({ mood, icon, label, isSelected, onClick, compact = false }: MoodButtonProps) => (
  <motion.button 
    className={`flex flex-col items-center ${compact ? 'py-2 px-1' : 'py-2 px-3'} rounded-lg transition-all duration-200 ${
      isSelected 
        ? 'bg-primary-100 border-2 border-primary-300 shadow-sm' 
        : 'hover:bg-neutral-50 border-2 border-transparent'
    }`}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {icon}
    <span className={`${compact ? 'text-xs' : 'text-xs'} mt-1 text-neutral-700 font-medium`}>
      {label}
    </span>
  </motion.button>
);

export default MoodTracker;