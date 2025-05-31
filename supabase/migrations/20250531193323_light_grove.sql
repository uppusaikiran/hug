-- Enable RLS on profiles table if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Ensure the profiles table has all required columns and policies
DO $$
BEGIN
    -- Add phone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'phone') THEN
        ALTER TABLE profiles ADD COLUMN phone TEXT;
    END IF;
    
    -- Add timezone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'timezone') THEN
        ALTER TABLE profiles ADD COLUMN timezone TEXT DEFAULT 'America/Los_Angeles';
    END IF;
    
    -- Add notification_settings column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'notification_settings') THEN
        ALTER TABLE profiles ADD COLUMN notification_settings JSONB DEFAULT '{
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
    END IF;
END $$;

-- Drop existing conflicting policies if they exist
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can create profile on signup" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create the INSERT policy for profiles
CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Ensure users can read their own profiles
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Ensure users can update their own profiles  
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Update the trigger function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, phone, timezone, notification_settings)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    '',
    'America/Los_Angeles',
    '{
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
    }'::jsonb
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();