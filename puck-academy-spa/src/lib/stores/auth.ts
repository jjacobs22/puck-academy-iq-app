// Auth store - manages user session state
import { writable, derived } from 'svelte/store';
import { supabase, signInWithMagicLink, signOut as supabaseSignOut } from '../services/supabase';
import type { User, Session } from '@supabase/supabase-js';

// ============ User Store ============

function createUserStore() {
  const { subscribe, set } = writable<User | null>(null);

  // Listen to auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    set(session?.user ?? null);

    if (event === 'SIGNED_IN' && session?.user) {
      // Could trigger profile sync here
      console.log('User signed in:', session.user.email);
    }

    if (event === 'SIGNED_OUT') {
      console.log('User signed out');
    }
  });

  // Initialize from existing session
  supabase.auth.getSession().then(({ data: { session } }) => {
    set(session?.user ?? null);
  });

  return {
    subscribe,
    signIn: async (email: string) => {
      const { data, error } = await signInWithMagicLink(email);
      return { data, error };
    },
    signOut: async () => {
      const { error } = await supabaseSignOut();
      if (!error) {
        set(null);
      }
      return { error };
    }
  };
}

export const user = createUserStore();

// ============ Derived Stores ============

export const isAuthenticated = derived(user, $user => !!$user);

export const userEmail = derived(user, $user => $user?.email ?? null);

// ============ Session Store (for full session data if needed) ============

function createSessionStore() {
  const { subscribe, set } = writable<Session | null>(null);

  supabase.auth.onAuthStateChange((_, session) => {
    set(session);
  });

  supabase.auth.getSession().then(({ data: { session } }) => {
    set(session);
  });

  return { subscribe };
}

export const session = createSessionStore();
