# Profile Setup Fix Instructions

The profile section was showing errors due to missing database policies and columns. Follow these steps to fix the issues:

## Step 1: Run the Complete Profile Setup Migration

Go to your Supabase Dashboard → SQL Editor and run this complete setup script:

```sql
-- Ensure the profiles table has all required columns
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
END $$;

-- Drop existing conflicting policies if they exist
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can create profile on signup" ON profiles;

-- Create the INSERT policy for profiles
CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Ensure users can read their own profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Ensure users can update their own profiles  
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Update the trigger function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, phone, timezone)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    '',
    'America/Los_Angeles'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 2: Create Profile for Existing Users (Optional)

If you have existing users without profiles, run this to create profiles for them:

```sql
INSERT INTO profiles (id, username, full_name, phone, timezone)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)),
  '',
  'America/Los_Angeles'
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM profiles p WHERE p.id = au.id
);
```

## Step 3: Verify the Setup

Run this query to check if everything is working:

```sql
-- Check if policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;
```

## What This Fixes

1. **403 Forbidden Errors**: Adds missing INSERT policy so users can create profiles
2. **406 Not Acceptable Errors**: Uses `maybeSingle()` instead of `single()` to handle missing records
3. **Missing Columns**: Adds phone and timezone columns to the profiles table
4. **Auto Profile Creation**: Updates the trigger to create profiles with all required fields when users sign up

## Expected Behavior After Fix

- ✅ Profile page loads without errors
- ✅ Users can edit their name, phone, and timezone
- ✅ Changes are saved to the database
- ✅ New users automatically get a profile created
- ✅ All profile sections are functional

If you still see errors after running these steps, please share the specific error messages and I'll help debug further. 