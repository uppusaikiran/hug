import { useState, useEffect } from 'react';
import { supabase, Profile } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // Use maybeSingle instead of single to avoid error when no record

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      if (data) {
        console.log('Profile found:', data);
        setProfile(data);
      } else {
        console.log('No profile found, creating one...');
        // Profile doesn't exist, create one
        await createProfile();
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) throw new Error('User not authenticated');

    try {
      console.log('Creating profile for user:', user.id);
      console.log('User metadata:', user.user_metadata);
      
      const profileData = {
        id: user.id,
        username: user.email,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        phone: '',
        timezone: 'America/Los_Angeles'
      };
      
      console.log('Profile data to insert:', profileData);

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Insert error details:', error);
        throw error;
      }
      
      console.log('Profile created successfully:', data);
      setProfile(data);
      return data;
    } catch (err) {
      console.error('Error creating profile:', err);
      throw err;
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) throw new Error('User or profile not available');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}; 