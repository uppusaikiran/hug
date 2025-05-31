-- Add missing INSERT policy for profiles table
CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Also add a more permissive policy for profile creation during signup
CREATE POLICY "Users can create profile on signup"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id AND NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid()
  )); 