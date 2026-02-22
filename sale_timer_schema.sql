-- Add sale timer fields to items table
ALTER TABLE items ADD COLUMN IF NOT EXISTS sale_timer_enabled BOOLEAN DEFAULT false;
ALTER TABLE items ADD COLUMN IF NOT EXISTS sale_timer_hours INTEGER DEFAULT 0;
ALTER TABLE items ADD COLUMN IF NOT EXISTS sale_timer_minutes INTEGER DEFAULT 0;
ALTER TABLE items ADD COLUMN IF NOT EXISTS sale_timer_seconds INTEGER DEFAULT 0;
