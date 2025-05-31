import { useState, useEffect } from 'react';
import { supabase, NotificationSettings } from '../lib/supabase';
import { useAuth } from './useAuth';
import { initializeNotificationScheduler, updateNotificationScheduler, stopNotificationScheduler } from '../services/notificationScheduler';

const defaultNotificationSettings: NotificationSettings = {
  checkin_reminders: true,
  challenge_updates: true,
  meditation_reminders: true,
  community_activity: false,
  resource_recommendations: true,
  weekend_different_schedule: false,
  quiet_hours_start: '22:00',
  quiet_hours_end: '08:00',
  browser_notifications_enabled: false,
  email_notifications_enabled: true,
  push_notifications_enabled: false,
};

export const useNotifications = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  // Check browser notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  // Load notification settings from profile
  useEffect(() => {
    if (user) {
      loadNotificationSettings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadNotificationSettings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('notification_settings')
        .eq('id', user.id)
        .single();

      // Handle missing column gracefully
      if (error && error.code === '42703') {
        console.warn('notification_settings column does not exist yet. Using default settings.');
        setSettings(defaultNotificationSettings);
        setError('Notification settings need database setup. Please run the migration.');
        return;
      }

      if (error) throw error;

      if (data?.notification_settings) {
        const loadedSettings = { ...defaultNotificationSettings, ...data.notification_settings };
        setSettings(loadedSettings);
        
        // Initialize the notification scheduler with the loaded settings
        if (loadedSettings.browser_notifications_enabled) {
          initializeNotificationScheduler(loadedSettings);
        }
      } else {
        // Initialize with default settings
        setSettings(defaultNotificationSettings);
        initializeNotificationScheduler(defaultNotificationSettings);
      }
    } catch (err) {
      console.error('Error loading notification settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load settings');
      // Fallback to default settings on any error
      setSettings(defaultNotificationSettings);
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationSettings = async (newSettings: Partial<NotificationSettings>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const updatedSettings = { ...settings, ...newSettings };
      
      const { error } = await supabase
        .from('profiles')
        .update({
          notification_settings: updatedSettings,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      // Handle missing column gracefully
      if (error && error.code === '42703') {
        console.warn('notification_settings column does not exist yet. Settings saved locally only.');
        setSettings(updatedSettings);
        updateNotificationScheduler(updatedSettings);
        setError('Settings saved locally. Run database migration to persist them.');
        return updatedSettings;
      }

      if (error) throw error;

      setSettings(updatedSettings);
      
      // Update the notification scheduler with new settings
      updateNotificationScheduler(updatedSettings);
      
      return updatedSettings;
    } catch (err) {
      console.error('Error updating notification settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      throw err;
    }
  };

  const requestBrowserPermission = async () => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      throw new Error('Notifications are blocked. Please enable them in your browser settings.');
    }

    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    
    if (permission === 'granted') {
      const updatedSettings = await updateNotificationSettings({ browser_notifications_enabled: true });
      
      // Start the notification scheduler now that permission is granted
      initializeNotificationScheduler(updatedSettings);
      
      return true;
    } else {
      throw new Error('Notification permission denied');
    }
  };

  const sendBrowserNotification = (title: string, options?: NotificationOptions) => {
    if (!settings.browser_notifications_enabled || Notification.permission !== 'granted') {
      return;
    }

    // Check quiet hours
    if (isInQuietHours()) {
      return;
    }

    new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      ...options,
    });
  };

  const isInQuietHours = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMin] = settings.quiet_hours_start.split(':').map(Number);
    const [endHour, endMin] = settings.quiet_hours_end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    // Handle overnight quiet hours (e.g., 22:00 to 08:00)
    if (startTime > endTime) {
      return currentTime >= startTime || currentTime <= endTime;
    } else {
      return currentTime >= startTime && currentTime <= endTime;
    }
  };

  const scheduleReminder = (type: string, time: Date, message: string) => {
    if (!settings.browser_notifications_enabled) return;

    const now = new Date();
    const delay = time.getTime() - now.getTime();

    if (delay > 0) {
      setTimeout(() => {
        sendBrowserNotification('Mind Haven Reminder', {
          body: message,
          tag: type,
          requireInteraction: false,
        });
      }, delay);
    }
  };

  const sendCheckinReminder = () => {
    if (settings.checkin_reminders) {
      sendBrowserNotification('Daily Check-in', {
        body: 'How are you feeling today? Take a moment to track your mood.',
        tag: 'checkin',
        requireInteraction: true,
      });
    }
  };

  const sendMeditationReminder = () => {
    if (settings.meditation_reminders) {
      sendBrowserNotification('Meditation Time', {
        body: 'Time for your scheduled meditation session. Take a deep breath.',
        tag: 'meditation',
        requireInteraction: true,
      });
    }
  };

  const testNotification = () => {
    sendBrowserNotification('Test Notification', {
      body: 'This is a test notification from Mind Haven.',
      tag: 'test',
    });
  };

  return {
    settings,
    loading,
    error,
    permissionStatus,
    updateNotificationSettings,
    requestBrowserPermission,
    sendBrowserNotification,
    sendCheckinReminder,
    sendMeditationReminder,
    scheduleReminder,
    testNotification,
    isInQuietHours,
    refetch: loadNotificationSettings,
  };
}; 