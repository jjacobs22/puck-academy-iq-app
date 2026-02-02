-- ============================================
-- PUCK ACADEMY - PAYMENT SCHEMA MIGRATION
-- Run this in Supabase SQL Editor
-- ============================================

-- Add subscription fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free';
-- Values: 'free', 'active', 'canceled', 'past_due'

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ;
-- When subscription expires (for canceled subscriptions with remaining time)

-- Create index for faster lookups by stripe_customer_id
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);

-- Create index for subscription status queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);

-- Grant RLS permissions for the new columns
-- (profiles table should already have RLS enabled from initial setup)

-- Add a comment to document the subscription_status values
COMMENT ON COLUMN profiles.subscription_status IS 'Subscription status: free (default), active (paid subscriber), canceled (will expire), past_due (payment failed)';
