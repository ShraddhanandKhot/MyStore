-- Drop potentially restrictive update policies
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON stores;
DROP POLICY IF EXISTS "Users can update their own stores" ON stores;

-- Create a new policy allowing users to update their own stores
CREATE POLICY "Users can update their own stores"
ON stores
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
