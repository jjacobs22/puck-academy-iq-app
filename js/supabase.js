/**
 * Supabase Client and Auth Helpers
 * 
 * Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY with your actual values
 * from Supabase Dashboard > Settings > API
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// =============================================================================
// CONFIGURATION
// =============================================================================
const SUPABASE_URL = 'https://hufwosdutqekeedtcfnj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zERe940R5SamJ5gjP0Cpfw_PsjsM2D-';

// =============================================================================
// SUPABASE CLIENT
// =============================================================================
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================================================================
// AUTH HELPERS
// =============================================================================

/**
 * Sign in with magic link (passwordless email)
 */
export async function signInWithMagicLink(email) {
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${window.location.origin}/auth/callback.html`
        }
    });
    return { error };
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback.html`
        }
    });
    return { error };
}

/**
 * Sign out current user
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        // Clear any cached user data
        localStorage.removeItem('puckAcademy_user');
    }
    return { error };
}

/**
 * Get current authenticated user
 */
export async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/**
 * Get current session
 */
export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Check if user is logged in
 */
export async function isLoggedIn() {
    const user = await getUser();
    return !!user;
}

// =============================================================================
// PROFILE HELPERS
// =============================================================================

/**
 * Get user's profile from database
 */
export async function getProfile() {
    const user = await getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
    return data;
}

/**
 * Update user's profile
 */
export async function updateProfile(updates) {
    const user = await getUser();
    if (!user) return { error: { message: 'Not logged in' } };

    const { data, error } = await supabase
        .from('profiles')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

    return { data, error };
}

// =============================================================================
// PROGRESS SYNC
// =============================================================================

/**
 * Sync local progress to server
 */
export async function syncProgressToServer() {
    const user = await getUser();
    if (!user) return;

    // Get all module scores from localStorage
    const moduleKeys = [
        'puckAcademy_scores',
        'puckAcademy_module2_scores',
        'puckAcademy_module3_scores',
        'puckAcademy_module4_scores',
        'puckAcademy_module5_scores',
        'puckAcademy_module6_scores'
    ];

    for (let i = 0; i < moduleKeys.length; i++) {
        const moduleNum = i + 1;
        const localData = localStorage.getItem(moduleKeys[i]);
        
        if (localData) {
            const parsed = JSON.parse(localData);
            
            // Sync each completed scenario
            for (const [scenarioId, correct] of Object.entries(parsed.currentRun || {})) {
                await supabase.from('progress').upsert({
                    user_id: user.id,
                    module_id: moduleNum,
                    scenario_id: parseInt(scenarioId),
                    completed: true,
                    correct: correct,
                    completed_at: new Date().toISOString()
                }, {
                    onConflict: 'user_id,module_id,scenario_id'
                });
            }

            // Sync best score
            if (parsed.bestScore > 0) {
                const { data: existingScore } = await supabase
                    .from('scores')
                    .select('score')
                    .eq('user_id', user.id)
                    .eq('module_id', moduleNum)
                    .eq('is_best', true)
                    .single();

                if (!existingScore || parsed.bestScore > existingScore.score) {
                    // Update or insert best score
                    await supabase.from('scores').upsert({
                        user_id: user.id,
                        module_id: moduleNum,
                        score: parsed.bestScore,
                        total: getModuleTotal(moduleNum),
                        is_best: true,
                        completed_at: new Date().toISOString()
                    }, {
                        onConflict: 'user_id,module_id,is_best'
                    });
                }
            }
        }
    }

    console.log('Progress synced to server');
}

/**
 * Load progress from server to localStorage
 */
export async function loadProgressFromServer() {
    const user = await getUser();
    if (!user) return;

    // Load progress for each module
    const { data: progress } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id);

    const { data: scores } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_best', true);

    // Organize by module
    const moduleData = {};
    
    if (progress) {
        for (const p of progress) {
            if (!moduleData[p.module_id]) {
                moduleData[p.module_id] = { currentRun: {}, bestScore: 0 };
            }
            if (p.completed) {
                moduleData[p.module_id].currentRun[p.scenario_id] = p.correct;
            }
        }
    }

    if (scores) {
        for (const s of scores) {
            if (!moduleData[s.module_id]) {
                moduleData[s.module_id] = { currentRun: {}, bestScore: 0 };
            }
            moduleData[s.module_id].bestScore = s.score;
        }
    }

    // Write to localStorage
    const moduleKeys = [
        'puckAcademy_scores',
        'puckAcademy_module2_scores',
        'puckAcademy_module3_scores',
        'puckAcademy_module4_scores',
        'puckAcademy_module5_scores',
        'puckAcademy_module6_scores'
    ];

    for (let i = 0; i < moduleKeys.length; i++) {
        const moduleNum = i + 1;
        if (moduleData[moduleNum]) {
            localStorage.setItem(moduleKeys[i], JSON.stringify(moduleData[moduleNum]));
        }
    }

    console.log('Progress loaded from server');
}

// Helper to get total scenarios per module
function getModuleTotal(moduleNum) {
    const totals = { 1: 7, 2: 7, 3: 7, 4: 7, 5: 8, 6: 7 };
    return totals[moduleNum] || 7;
}

/**
 * Save a score attempt to history (Supabase)
 */
export async function saveScoreAttempt(moduleNum, score, total) {
    const user = await getUser();
    if (!user) return;

    try {
        await supabase.from('scores').insert({
            user_id: user.id,
            module_id: moduleNum,
            score: score,
            total: total,
            is_best: false,  // History entries are not "best" - best is tracked separately
            completed_at: new Date().toISOString()
        });
        console.log(`Score attempt saved: Module ${moduleNum}, ${score}/${total}`);
    } catch (err) {
        console.error('Error saving score attempt:', err);
    }
}

/**
 * Get score history for a module from server
 */
export async function getScoreHistoryFromServer(moduleNum) {
    const user = await getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('scores')
        .select('score, total, completed_at')
        .eq('user_id', user.id)
        .eq('module_id', moduleNum)
        .order('completed_at', { ascending: true });

    if (error) {
        console.error('Error fetching score history:', error);
        return [];
    }

    return data || [];
}

// =============================================================================
// AUTH STATE LISTENER
// =============================================================================

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}
