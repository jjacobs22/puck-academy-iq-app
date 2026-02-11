import { createClient } from '@supabase/supabase-js';

// Environment variables would be set in .env (and in Netlify for production)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

/** True if real Supabase credentials are set (not placeholders). */
export const isSupabaseConfigured =
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !!supabaseAnonKey &&
  supabaseAnonKey !== 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export async function signInWithMagicLink(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
}

// Profile operations
export async function upsertProfile(userId: string, profile: {
  email?: string;
  name?: string;
  position?: string;
  level?: string;
}) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...profile })
    .select()
    .single();
  return { data, error };
}

// Score operations
export async function saveScoreToServer(userId: string, moduleId: number, scenarioId: number, correct: boolean) {
  const { data, error } = await supabase
    .from('scenario_results')
    .insert({
      user_id: userId,
      module_id: moduleId,
      scenario_id: scenarioId,
      correct,
      timestamp: new Date().toISOString()
    });
  return { data, error };
}

// Progress operations
export async function syncProgressToServer(userId: string, progress: object) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ progress })
    .eq('id', userId);
  return { data, error };
}

export async function loadProgressFromServer(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('progress')
    .eq('id', userId)
    .single();
  return { data, error };
}
