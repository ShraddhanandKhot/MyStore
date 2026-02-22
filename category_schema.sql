-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add category_id to items table
ALTER TABLE items ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Enable RLS on categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Users can insert categories for their own stores" ON categories
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM stores
            WHERE stores.id = categories.store_id
            AND stores.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own categories" ON categories
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM stores
            WHERE stores.id = categories.store_id
            AND stores.user_id = auth.uid()
        )
    ) WITH CHECK (
        EXISTS (
            SELECT 1 FROM stores
            WHERE stores.id = categories.store_id
            AND stores.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete their own categories" ON categories
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM stores
            WHERE stores.id = categories.store_id
            AND stores.user_id = auth.uid()
        )
    );
