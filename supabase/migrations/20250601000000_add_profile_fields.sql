-- Add phone and timezone fields to profiles table
ALTER TABLE profiles 
ADD COLUMN phone TEXT,
ADD COLUMN timezone TEXT DEFAULT 'America/Los_Angeles'; 