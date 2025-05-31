import { useState, useEffect } from 'react';

export type MoodType = 'great' | 'good' | 'okay' | 'bad' | 'awful';

interface MoodEntry {
  date: string;
  mood: MoodType;
  notes?: string;
  timestamp: number;
}

interface UseMoodTrackingReturn {
  currentMood: MoodType | null;
  moodHistory: MoodEntry[];
  saveMood: (mood: MoodType, notes?: string) => Promise<void>;
  getTodaysMood: () => MoodEntry | null;
  getMoodStreak: () => number;
  clearMoodData: () => void;
}

export const useMoodTracking = (): UseMoodTrackingReturn => {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  // Load mood data from localStorage on mount
  useEffect(() => {
    const savedMoodHistory = localStorage.getItem('mindHaven_moodHistory');
    if (savedMoodHistory) {
      try {
        const parsedHistory: MoodEntry[] = JSON.parse(savedMoodHistory);
        setMoodHistory(parsedHistory);
        
        // Set current mood to today's mood if it exists
        const today = new Date().toDateString();
        const todaysMood = parsedHistory.find(entry => 
          new Date(entry.timestamp).toDateString() === today
        );
        if (todaysMood) {
          setCurrentMood(todaysMood.mood);
        }
      } catch (error) {
        console.error('Error loading mood history:', error);
      }
    }
  }, []);

  // Save mood data to localStorage whenever it changes
  useEffect(() => {
    if (moodHistory.length > 0) {
      localStorage.setItem('mindHaven_moodHistory', JSON.stringify(moodHistory));
    }
  }, [moodHistory]);

  const saveMood = async (mood: MoodType, notes?: string): Promise<void> => {
    const now = new Date();
    const today = now.toDateString();
    const timestamp = now.getTime();

    const newEntry: MoodEntry = {
      date: today,
      mood,
      notes,
      timestamp
    };

    // Remove any existing entry for today and add the new one
    const updatedHistory = moodHistory.filter(entry => 
      new Date(entry.timestamp).toDateString() !== today
    );
    updatedHistory.push(newEntry);

    // Sort by timestamp (most recent first)
    updatedHistory.sort((a, b) => b.timestamp - a.timestamp);

    // Keep only last 30 days
    const thirtyDaysAgo = timestamp - (30 * 24 * 60 * 60 * 1000);
    const filteredHistory = updatedHistory.filter(entry => 
      entry.timestamp > thirtyDaysAgo
    );

    setMoodHistory(filteredHistory);
    setCurrentMood(mood);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const getTodaysMood = (): MoodEntry | null => {
    const today = new Date().toDateString();
    return moodHistory.find(entry => 
      new Date(entry.timestamp).toDateString() === today
    ) || null;
  };

  const getMoodStreak = (): number => {
    if (moodHistory.length === 0) return 0;

    let streak = 0;
    const sortedHistory = [...moodHistory].sort((a, b) => b.timestamp - a.timestamp);
    
    for (let i = 0; i < sortedHistory.length; i++) {
      const entryDate = new Date(sortedHistory[i].timestamp);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (entryDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const clearMoodData = (): void => {
    setMoodHistory([]);
    setCurrentMood(null);
    localStorage.removeItem('mindHaven_moodHistory');
  };

  return {
    currentMood,
    moodHistory,
    saveMood,
    getTodaysMood,
    getMoodStreak,
    clearMoodData
  };
}; 