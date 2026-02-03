-- Migration: Create email_signups table for Hockey IQ Test
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/hufwosdutqekeedtcfnj/sql

-- Table for Hockey IQ Test email signups
CREATE TABLE IF NOT EXISTS email_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT DEFAULT 'hockey_iq_test',
    score INTEGER,
    tier TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Prevent duplicate emails per source
    CONSTRAINT unique_email_source UNIQUE (email, source)
);

-- Enable RLS
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the viral test - no auth required)
CREATE POLICY "Allow anonymous inserts" ON email_signups
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Only authenticated users can read (for admin purposes)
CREATE POLICY "Authenticated users can read" ON email_signups
    FOR SELECT
    TO authenticated
    USING (true);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at DESC);
