/**
 * Auth Guard - Redirects unauthenticated users to training.html
 * Include this in any page that requires authentication.
 * Uses getSession() (instant localStorage read) first so returning users
 * never see a redirect flash. Falls back to getUser() (network) if needed.
 */

import { getSession, getUser } from './supabase.js';

export async function requireAuth() {
    // Fast local check first — no network call
    const session = await getSession();
    if (session) return true;

    // No local session — verify with server before redirecting
    const user = await getUser();
    if (user) return true;

    // Genuinely not logged in — redirect to training (shows auth modal)
    window.location.href = '/training.html';
    return false;
}

// Auto-run check when module loads
requireAuth();
