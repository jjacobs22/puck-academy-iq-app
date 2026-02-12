-- Progress table + RLS for scenario completion (admin dashboard + SPA writes)
-- Run in Supabase SQL Editor if the table is missing or admin "recent usage" is empty
-- SPA writes via saveScoreToServer(); admin reads via supabase.from('progress').select('*')

-- 1. Create progress table (idempotent)
CREATE TABLE IF NOT EXISTS public.progress (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id smallint NOT NULL,
  scenario_id smallint NOT NULL,
  completed boolean NOT NULL DEFAULT true,
  correct boolean NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, module_id, scenario_id)
);

-- 2. Enable RLS
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if re-running (avoid duplicates)
DROP POLICY IF EXISTS "Authenticated users can view all progress" ON public.progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.progress;

-- 4. Admin: any authenticated user can read all progress (for admin dashboard)
CREATE POLICY "Authenticated users can view all progress"
  ON public.progress FOR SELECT
  TO authenticated
  USING (true);

-- 5. App: users can insert their own progress rows (saveScoreToServer)
CREATE POLICY "Users can insert own progress"
  ON public.progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 6. App: users can update their own progress rows (upsert)
CREATE POLICY "Users can update own progress"
  ON public.progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
