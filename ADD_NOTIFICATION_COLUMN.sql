-- Add notification_settings column to profiles table
ALTER TABLE profiles 
ADD COLUMN notification_settings JSONB DEFAULT '{
  "checkin_reminders": true,
  "challenge_updates": true,
  "meditation_reminders": true,
  "community_activity": false,
  "resource_recommendations": true,
  "weekend_different_schedule": false,
  "quiet_hours_start": "22:00",
  "quiet_hours_end": "08:00",
  "browser_notifications_enabled": false,
  "email_notifications_enabled": true,
  "push_notifications_enabled": false
}'::jsonb; 