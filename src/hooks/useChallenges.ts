import { useState, useEffect } from 'react';
import { supabase, Challenge } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface ChallengeTemplate {
  id: string;
  title: string;
  description: string;
  duration: number; // days
  category: 'mindfulness' | 'gratitude' | 'exercise' | 'sleep' | 'social';
  icon: string;
  color: string;
  tasks: string[];
}

export const challengeTemplates: ChallengeTemplate[] = [
  {
    id: 'gratitude-7',
    title: '7-Day Gratitude Quest',
    description: 'Practice daily gratitude to boost your mood and perspective',
    duration: 7,
    category: 'gratitude',
    icon: '🙏',
    color: 'from-yellow-400 to-orange-500',
    tasks: [
      'Write down 3 things you\'re grateful for',
      'Thank someone who made a difference in your life',
      'Appreciate something beautiful in nature',
      'Reflect on a positive memory from this week',
      'Express gratitude for your body and health',
      'Acknowledge a skill or talent you possess',
      'Share your gratitude journey with someone'
    ]
  },
  {
    id: 'mindful-14',
    title: 'Mindful Minutes Marathon',
    description: 'Build a consistent meditation practice over 14 days',
    duration: 14,
    category: 'mindfulness',
    icon: '🧘',
    color: 'from-blue-400 to-purple-500',
    tasks: [
      'Complete 5 minutes of breathing meditation',
      'Practice mindful walking for 10 minutes',
      'Do a body scan meditation',
      'Try loving-kindness meditation',
      'Practice mindful eating during one meal',
      'Complete a guided meditation',
      'Practice mindfulness during daily activities',
      'Try progressive muscle relaxation',
      'Meditate in a new location',
      'Practice mindful listening',
      'Do a gratitude meditation',
      'Try movement meditation',
      'Practice mindful breathing at work',
      'Complete a 15-minute meditation session'
    ]
  },
  {
    id: 'mood-boost-10',
    title: 'Mood Boost Bingo',
    description: 'Complete mood-enhancing activities to lift your spirits',
    duration: 10,
    category: 'exercise',
    icon: '🌟',
    color: 'from-green-400 to-blue-500',
    tasks: [
      'Take a 20-minute walk outside',
      'Listen to your favorite uplifting music',
      'Call or text a friend you haven\'t spoken to recently',
      'Do 10 minutes of stretching or yoga',
      'Write in a journal for 15 minutes',
      'Try a new healthy recipe',
      'Spend time in nature',
      'Practice deep breathing exercises',
      'Do something creative (draw, write, craft)',
      'Perform a random act of kindness'
    ]
  },
  {
    id: 'sleep-hygiene-21',
    title: 'Sleep Hygiene Heroes',
    description: 'Improve your sleep habits for better mental health',
    duration: 21,
    category: 'sleep',
    icon: '😴',
    color: 'from-indigo-400 to-purple-600',
    tasks: [
      'Set a consistent bedtime',
      'Create a relaxing bedtime routine',
      'Avoid screens 1 hour before bed',
      'Keep bedroom cool and dark',
      'No caffeine after 2 PM',
      'Practice relaxation techniques before sleep',
      'Wake up at the same time daily',
      'Get morning sunlight exposure',
      'Avoid large meals before bedtime',
      'Use comfortable bedding',
      'Try reading before sleep',
      'Practice gratitude before bed',
      'Limit daytime naps',
      'Exercise regularly (but not before bed)',
      'Create a sleep-friendly environment',
      'Try herbal tea before bed',
      'Practice progressive muscle relaxation',
      'Keep a sleep diary',
      'Avoid alcohol before bedtime',
      'Try meditation or deep breathing',
      'Celebrate your improved sleep habits'
    ]
  },
  {
    id: 'social-connection-14',
    title: 'Social Connection Challenge',
    description: 'Strengthen relationships and build meaningful connections',
    duration: 14,
    category: 'social',
    icon: '🤝',
    color: 'from-pink-400 to-red-500',
    tasks: [
      'Reach out to an old friend',
      'Have a meaningful conversation with family',
      'Join a community group or activity',
      'Practice active listening with someone',
      'Express appreciation to a colleague',
      'Volunteer for a cause you care about',
      'Share a meal with someone',
      'Give someone a genuine compliment',
      'Ask for help when you need it',
      'Offer help to someone else',
      'Share something personal with a trusted friend',
      'Attend a social event or gathering',
      'Practice empathy in your interactions',
      'Plan a fun activity with others'
    ]
  }
];

export const useChallenges = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = async () => {
    if (!user) {
      console.log('No user found, skipping challenge fetch');
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching challenges for user:', user.id);
      
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched challenges:', data);
      setChallenges(data || []);
    } catch (err) {
      console.error('Error fetching challenges:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch challenges');
    } finally {
      setLoading(false);
    }
  };

  const startChallenge = async (template: ChallengeTemplate) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + template.duration);

      const { data, error } = await supabase
        .from('challenges')
        .insert({
          user_id: user.id,
          title: template.title,
          description: template.description,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          progress: 0,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      setChallenges(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start challenge');
      throw err;
    }
  };

  const updateChallengeProgress = async (challengeId: string, progress: number) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const status = progress >= 100 ? 'completed' : 'active';
      
      const { data, error } = await supabase
        .from('challenges')
        .update({ progress, status })
        .eq('id', challengeId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setChallenges(prev => 
        prev.map(challenge => 
          challenge.id === challengeId ? data : challenge
        )
      );

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update challenge');
      throw err;
    }
  };

  const abandonChallenge = async (challengeId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('challenges')
        .update({ status: 'abandoned' })
        .eq('id', challengeId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setChallenges(prev => 
        prev.map(challenge => 
          challenge.id === challengeId ? data : challenge
        )
      );

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to abandon challenge');
      throw err;
    }
  };

  const deleteChallenge = async (challengeId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('challenges')
        .delete()
        .eq('id', challengeId)
        .eq('user_id', user.id);

      if (error) throw error;

      setChallenges(prev => prev.filter(challenge => challenge.id !== challengeId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete challenge');
      throw err;
    }
  };

  const getActiveChallenges = () => challenges.filter(c => c.status === 'active');
  const getCompletedChallenges = () => challenges.filter(c => c.status === 'completed');
  const getAbandonedChallenges = () => challenges.filter(c => c.status === 'abandoned');

  const getChallengeTemplate = (challengeTitle: string) => {
    return challengeTemplates.find(template => 
      template.title === challengeTitle
    );
  };

  useEffect(() => {
    fetchChallenges();
  }, [user]);

  return {
    challenges,
    loading,
    error,
    challengeTemplates,
    startChallenge,
    updateChallengeProgress,
    abandonChallenge,
    deleteChallenge,
    getActiveChallenges,
    getCompletedChallenges,
    getAbandonedChallenges,
    getChallengeTemplate,
    refetch: fetchChallenges
  };
}; 