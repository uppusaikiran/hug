import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'huggy_auth_token',
    storage: window.localStorage
  }
});

export type NotificationSettings = {
  checkin_reminders: boolean;
  challenge_updates: boolean;
  meditation_reminders: boolean;
  community_activity: boolean;
  resource_recommendations: boolean;
  weekend_different_schedule: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  browser_notifications_enabled: boolean;
  email_notifications_enabled: boolean;
  push_notifications_enabled: boolean;
};

export type Profile = {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  timezone?: string;
  notification_settings?: NotificationSettings;
  created_at: string;
  updated_at: string;
};

export type MoodEntry = {
  id: string;
  user_id: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'awful';
  notes?: string;
  created_at: string;
};

export type Challenge = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  progress: number;
  status: 'active' | 'completed' | 'abandoned';
};

export type Resource = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  is_favorite: boolean;
  created_at: string;
};