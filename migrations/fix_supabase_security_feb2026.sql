-- Fix Supabase Dashboard security advisories (Feb 2026)
-- Run in Supabase SQL Editor: Dashboard → SQL Editor → New query

-- 1. coach_conversations: Enable RLS and add policies (table was public with RLS off)
ALTER TABLE public.coach_conversations ENABLE ROW LEVEL SECURITY;

-- Remove old policies if they exist (e.g. from a previous partial setup)
DROP POLICY IF EXISTS "Authenticated can read coach_conversations" ON public.coach_conversations;
DROP POLICY IF EXISTS "Users can insert own coach_conversations" ON public.coach_conversations;
-- If Supabase created others, drop in Dashboard → Table Editor → coach_conversations → RLS

-- Allow authenticated users to read all (for admin dashboard)
CREATE POLICY "Authenticated can read coach_conversations"
  ON public.coach_conversations FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert their own conversation row (Coach's Office logging)
CREATE POLICY "Users can insert own coach_conversations"
  ON public.coach_conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 2. handle_new_user: Fix mutable search_path (security best practice)
-- Only run if the function exists (e.g. from Supabase auth hook or your trigger)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'handle_new_user') THEN
    EXECUTE 'ALTER FUNCTION public.handle_new_user() SET search_path = public';
  END IF;
END $$;

-- 3. email_signups: "Allow anonymous inserts" is intentional for Hockey IQ Test (no login).
-- To reduce abuse you could: add rate limiting in the app, or restrict INSERT to a specific role.
-- Leaving policy as-is is acceptable for a signup form; Supabase flags it for awareness.
-- Optional: tighten to limit inserts per IP (requires pg_net or app-side rate limit).
