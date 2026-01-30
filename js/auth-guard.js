/**
 * Auth Guard - Redirects unauthenticated users to training.html
 * Include this in any page that requires authentication
 */

import { getUser } from './supabase.js';

export async function requireAuth() {
    const user = await getUser();

    if (!user) {
        // Not logged in - redirect to training page (which will show auth modal)
        window.location.href = '/training.html';
        return false;
    }

    return true;
}

// Auto-run check when module loads
requireAuth();
