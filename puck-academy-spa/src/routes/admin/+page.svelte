<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase, isSupabaseConfigured } from '$lib/services/supabase';

  const MODULE_NAMES: Record<number, string> = {
    1: 'D-Zone',
    2: 'Faceoffs',
    3: 'Breakouts',
    4: 'Offense',
    5: 'Forecheck',
    6: 'D-Men'
  };

  const MODULE_TOTALS: Record<number, number> = {
    1: 7, 2: 7, 3: 7, 4: 7, 5: 8, 6: 7
  };

  type Profile = {
    id: string;
    email?: string;
    name?: string;
    position?: string;
    age_level?: string;
    birth_year?: number;
    streak?: string | { count: number };
    created_at: string;
  };

  type ProgressRow = {
    user_id: string;
    module_id: number;
    scenario_id: number;
    completed?: boolean;
    correct?: boolean;
    completed_at?: string;
  };

  type CoachConversation = { id: string; [k: string]: unknown };

  let loading = true;
  let authRequired = false;
  let adminEmail = '';
  let authMessage = '';
  let authMessageClass = '';
  let lastUpdated = '';
  let refreshing = false;

  let profiles: Profile[] = [];
  let progress: ProgressRow[] = [];
  let coachConversations: CoachConversation[] = [];

  let totalUsers = 0;
  let activeToday = 0;
  let activeWeek = 0;
  let totalScenarios = 0;
  let avgAccuracy = 0;
  let avgStreak = '0';
  let coachChats = 0;
  let moduleStats: { started: Set<string>; completed: Set<string> }[] = [];
  let recentUsers: Profile[] = [];
  let topStreakers: { profile: Profile; streakCount: number }[] = [];
  let retentionStats: { day2: number; day7: number; avgSessions: string; oneAndDone: number; day2Class: string; day7Class: string; sessionsClass: string; oneAndDoneClass: string } | null = null;
  let signupTrend: number[] = [];
  let activityTrend: number[] = [];
  let dayLabels: string[] = [];
  let allUsersData: { user: Profile; total: number; correct: number; accuracy: number; streakCount: number }[] = [];
  let progressErrorMsg = '';

  async function loadDashboard() {
    refreshing = true;
    progressErrorMsg = '';
    try {
      const [
        { data: profilesData, error: profilesError },
        { data: progressData, error: progressError },
        { data: coachData, error: coachError }
      ] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('progress').select('*'),
        supabase.from('coach_conversations').select('*')
      ]);

      if (profilesError) throw profilesError;
      if (progressError) {
        progressErrorMsg = progressError.message || String(progressError);
        console.error('Progress load error:', progressError);
        progress = [];
      } else {
        progress = progressData || [];
      }
      if (coachError) console.warn('Coach conversations:', coachError.message);

      profiles = profilesData || [];
      coachConversations = coachData || [];

      computeDashboard();
      lastUpdated = new Date().toLocaleTimeString();
    } catch (e) {
      console.error('Dashboard error:', e);
      profiles = [];
      progress = [];
      coachConversations = [];
      computeDashboard();
    }
    loading = false;
    authRequired = false;
    refreshing = false;
  }

  function getStreakCount(p: Profile): number {
    try {
      const streakData = typeof p.streak === 'string' ? JSON.parse(p.streak) : p.streak;
      return streakData?.count ?? 0;
    } catch {
      return 0;
    }
  }

  function computeDashboard() {
    totalUsers = profiles.length;
    coachChats = coachConversations.length;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const usersActiveToday = new Set<string>();
    const usersActiveWeek = new Set<string>();
    progress.forEach((p) => {
      if (p.completed_at) {
        const date = new Date(p.completed_at);
        if (date >= today) usersActiveToday.add(p.user_id);
        if (date >= weekAgo) usersActiveWeek.add(p.user_id);
      }
    });
    activeToday = usersActiveToday.size;
    activeWeek = usersActiveWeek.size;

    const completedCount = progress.filter((p) => p.completed).length;
    totalScenarios = completedCount;
    const correctCount = progress.filter((p) => p.correct).length;
    avgAccuracy = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;

    const streaks = profiles.map(getStreakCount);
    avgStreak = streaks.length > 0 ? (streaks.reduce((a, b) => a + b, 0) / streaks.length).toFixed(1) : '0';

    // Module stats
    moduleStats = Array.from({ length: 6 }, () => ({ started: new Set<string>(), completed: new Set<string>() }));
    const userModuleProgress: Record<string, { scenarios: Set<number>; module_id: number; user_id: string }> = {};
    progress.forEach((p) => {
      const key = `${p.user_id}-${p.module_id}`;
      if (!userModuleProgress[key]) {
        userModuleProgress[key] = { scenarios: new Set(), module_id: p.module_id, user_id: p.user_id };
      }
      if (p.completed) userModuleProgress[key].scenarios.add(p.scenario_id);
    });
    Object.values(userModuleProgress).forEach((ump) => {
      const mid = ump.module_id;
      if (moduleStats[mid - 1]) {
        moduleStats[mid - 1].started.add(ump.user_id);
        if (ump.scenarios.size >= MODULE_TOTALS[mid]) moduleStats[mid - 1].completed.add(ump.user_id);
      }
    });

    recentUsers = [...profiles].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

    topStreakers = profiles
      .map((p) => ({ profile: p, streakCount: getStreakCount(p) }))
      .filter((x) => x.streakCount > 0)
      .sort((a, b) => b.streakCount - a.streakCount)
      .slice(0, 5);

    // Trends (last 7 days)
    const days: Date[] = [];
    dayLabels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      days.push(d);
      dayLabels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    signupTrend = days.map((day) => {
      const next = new Date(day);
      next.setDate(next.getDate() + 1);
      return profiles.filter((p) => {
        const created = new Date(p.created_at);
        return created >= day && created < next;
      }).length;
    });
    activityTrend = days.map((day) => {
      const next = new Date(day);
      next.setDate(next.getDate() + 1);
      return progress.filter((p) => {
        if (!p.completed_at) return false;
        const completed = new Date(p.completed_at);
        return completed >= day && completed < next;
      }).length;
    });

    // Retention
    if (profiles.length === 0) {
      retentionStats = null;
    } else {
      const userActiveDays: Record<string, Set<string>> = {};
      profiles.forEach((p) => {
        userActiveDays[p.id] = new Set();
        userActiveDays[p.id].add(new Date(p.created_at).toDateString());
      });
      progress.forEach((p) => {
        if (p.completed_at && userActiveDays[p.user_id]) {
          userActiveDays[p.user_id].add(new Date(p.completed_at).toDateString());
        }
      });
      let returnedDay2 = 0, eligibleDay2 = 0, returnedDay7 = 0, eligibleDay7 = 0, totalSessions = 0, oneAndDone = 0;
      profiles.forEach((p) => {
        const signupDate = new Date(p.created_at);
        const daysSince = Math.floor((now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
        const activeDays = userActiveDays[p.id]?.size ?? 1;
        totalSessions += activeDays;
        if (activeDays === 1 && daysSince >= 2) oneAndDone++;
        if (daysSince >= 1) {
          eligibleDay2++;
          if (activeDays >= 2) returnedDay2++;
        }
        if (daysSince >= 7) {
          eligibleDay7++;
          if (activeDays >= 2) returnedDay7++;
        }
      });
      const day2Rate = eligibleDay2 > 0 ? Math.round((returnedDay2 / eligibleDay2) * 100) : 0;
      const day7Rate = eligibleDay7 > 0 ? Math.round((returnedDay7 / eligibleDay7) * 100) : 0;
      const avgSessions = profiles.length > 0 ? (totalSessions / profiles.length).toFixed(1) : '0';
      const day2Class = day2Rate >= 40 ? 'good' : day2Rate >= 20 ? 'warning' : 'bad';
      const day7Class = day7Rate >= 20 ? 'good' : day7Rate >= 10 ? 'warning' : 'bad';
      const sessionsClass = parseFloat(avgSessions) >= 3 ? 'good' : parseFloat(avgSessions) >= 1.5 ? 'warning' : 'bad';
      const oneAndDoneClass = oneAndDone <= profiles.length * 0.4 ? 'good' : oneAndDone <= profiles.length * 0.6 ? 'warning' : 'bad';
      retentionStats = {
        day2: day2Rate,
        day7: day7Rate,
        avgSessions,
        oneAndDone,
        day2Class,
        day7Class,
        sessionsClass,
        oneAndDoneClass
      };
    }

    // All users table data
    const userProgress: Record<string, { total: number; correct: number }> = {};
    progress.forEach((p) => {
      if (!userProgress[p.user_id]) userProgress[p.user_id] = { total: 0, correct: 0 };
      if (p.completed) {
        userProgress[p.user_id].total++;
        if (p.correct) userProgress[p.user_id].correct++;
      }
    });
    allUsersData = profiles
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map((user) => {
        const prog = userProgress[user.id] || { total: 0, correct: 0 };
        const accuracy = prog.total > 0 ? Math.round((prog.correct / prog.total) * 100) : 0;
        return { user, total: prog.total, correct: prog.correct, accuracy, streakCount: getStreakCount(user) };
      });
  }

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await loadDashboard();
    } else {
      loading = false;
      authRequired = true;
    }
  }

  async function sendMagicLink() {
    const email = adminEmail.trim();
    if (!email || !email.includes('@')) {
      authMessage = 'Please enter a valid email address.';
      authMessageClass = 'error';
      return;
    }
    if (!isSupabaseConfigured) {
      authMessage =
        'Supabase is not configured. In Netlify, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (then redeploy).';
      authMessageClass = 'error';
      return;
    }
    authMessage = '';
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('auth_redirect', '/admin');
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback`
        }
      });
      if (error) throw error;
      authMessage = '✓ Check your email for the sign-in link!';
      authMessageClass = 'success';
    } catch (e: unknown) {
      const err = e as { message?: string; status?: number; code?: string };
      console.error('Admin magic link error:', e);
      const detail = [err?.message, err?.code ? `(${err.code})` : err?.status ? `(status ${err.status})` : '']
        .filter(Boolean)
        .join(' ');
      authMessage = detail || 'Error sending link. Please try again.';
      authMessageClass = 'error';
    }
  }

  onMount(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        authRequired = false;
        loadDashboard();
      }
    });
    return () => subscription?.unsubscribe();
  });
</script>

<svelte:head>
  <title>Admin Dashboard - Puck Academy</title>
</svelte:head>

{#if loading}
  <div class="loading-state">
    <div class="spinner"></div>
    <p>Loading dashboard data...</p>
  </div>
{:else if authRequired}
  <div class="auth-required">
    <h2>🔒 Admin Access Required</h2>
    <p>Sign in with your email to view the dashboard.</p>
    <div class="auth-form">
      <input type="email" bind:value={adminEmail} placeholder="Enter your email" autocomplete="email" />
      <button on:click={sendMagicLink}>Send Sign-In Link</button>
      {#if authMessage}
        <div class="auth-message {authMessageClass}">{authMessage}</div>
        {#if authMessageClass === 'error' && !authMessage.includes('VITE_SUPABASE')}
          <p class="auth-hint">Check: Netlify env vars (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY), Supabase → Auth → URL Configuration (redirect URL), and Auth → Email (rate limits / SMTP).</p>
        {/if}
      {/if}
    </div>
    <a href="/hub" class="back-link">← Back to App</a>
  </div>
{:else}
  <div class="dashboard">
    <div class="dashboard-header">
      <span class="last-updated">Last updated: {lastUpdated}</span>
      <button class="refresh-btn" disabled={refreshing} on:click={loadDashboard}>
        {refreshing ? 'Loading...' : 'Refresh Data'}
      </button>
    </div>

    {#if progressErrorMsg}
      <div class="progress-error-banner">
        <strong>Progress data error:</strong> {progressErrorMsg}
        <br />
        <small>Run <code>migrations/create_progress_table_and_rls.sql</code> in Supabase SQL Editor if the <code>progress</code> table is missing or RLS is blocking reads.</small>
      </div>
    {:else if progress.length === 0 && totalUsers > 0}
      <div class="progress-empty-banner">
        No scenario completions in <code>progress</code> yet. Scores are only saved when users are <strong>signed in</strong>. Sign in, complete a scenario, then click Refresh — or check the browser console for "Score sync failed" when completing a scenario.
      </div>
    {/if}

    <div class="scorecards">
      <div class="scorecard"><div class="scorecard-value highlight">{totalUsers}</div><div class="scorecard-label">Total Users</div></div>
      <div class="scorecard"><div class="scorecard-value">{activeToday}</div><div class="scorecard-label">Active Today</div></div>
      <div class="scorecard"><div class="scorecard-value">{activeWeek}</div><div class="scorecard-label">Active This Week</div></div>
      <div class="scorecard"><div class="scorecard-value success">{totalScenarios}</div><div class="scorecard-label">Scenarios Completed</div></div>
      <div class="scorecard"><div class="scorecard-value">{avgAccuracy}%</div><div class="scorecard-label">Avg Accuracy</div></div>
      <div class="scorecard"><div class="scorecard-value">{avgStreak}</div><div class="scorecard-label">Avg Streak</div></div>
      <div class="scorecard"><div class="scorecard-value highlight">{coachChats}</div><div class="scorecard-label">Coach Chats</div></div>
    </div>

    <section class="section">
      <h2 class="section-title">📊 Module Performance</h2>
      <table class="data-table">
        <thead>
          <tr><th>Module</th><th>Started</th><th>Completed</th><th>Completion %</th></tr>
        </thead>
        <tbody>
          {#each moduleStats as stat, i}
            {@const mid = i + 1}
            {@const started = stat.started.size}
            {@const completed = stat.completed.size}
            {@const pct = started > 0 ? Math.round((completed / started) * 100) : 0}
            <tr>
              <td>{MODULE_NAMES[mid]}</td>
              <td class="num">{started}</td>
              <td class="num">{completed}</td>
              <td>
                <div class="progress-row">
                  <div class="progress-bar"><div class="progress-fill {pct >= 50 ? 'high' : ''}" style="width: {pct}%"></div></div>
                  <span>{pct}%</span>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>

    <div class="grid-2">
      <section class="section">
        <h2 class="section-title">👥 Recent Users</h2>
        {#if recentUsers.length === 0}
          <div class="empty-state">No users yet</div>
        {:else}
          {#each recentUsers as user}
            {@const displayName = user.name || user.email || 'Unknown'}
            {@const initial = displayName[0].toUpperCase()}
            {@const joined = new Date(user.created_at).toLocaleDateString()}
            {@const age = user.birth_year ? new Date().getFullYear() - user.birth_year : null}
            {@const posText = user.position ? user.position.charAt(0).toUpperCase() + user.position.slice(1) : ''}
            <div class="user-item">
              <div class="user-avatar">{initial}</div>
              <div class="user-info">
                <div class="user-email">{displayName}</div>
                <div class="user-meta">Joined {joined}{posText ? ' • ' + posText : ''}{age ? ' • ' + age + 'yo' : ''}</div>
              </div>
            </div>
          {/each}
        {/if}
      </section>
      <section class="section">
        <h2 class="section-title">🔥 Top Streaks</h2>
        {#if topStreakers.length === 0}
          <div class="empty-state">No active streaks</div>
        {:else}
          {#each topStreakers as { profile, streakCount }}
            <div class="user-item">
              <div class="user-avatar">{(profile.email || '?')[0].toUpperCase()}</div>
              <div class="user-info">
                <div class="user-email">{profile.email || 'Unknown'}</div>
                <div class="user-meta">{profile.position || 'No position'}</div>
              </div>
              <div class="user-stats"><span class="user-streak">🔥 {streakCount} days</span></div>
            </div>
          {/each}
        {/if}
      </section>
    </div>

    {#if retentionStats}
      <section class="section">
        <h2 class="section-title">🔄 Retention</h2>
        <div class="retention-grid">
          <div class="retention-stat">
            <div class="retention-stat-value {retentionStats.day2Class}">{retentionStats.day2}%</div>
            <div class="retention-stat-label">Day 2 Return</div>
          </div>
          <div class="retention-stat">
            <div class="retention-stat-value {retentionStats.day7Class}">{retentionStats.day7}%</div>
            <div class="retention-stat-label">Day 7 Return</div>
          </div>
          <div class="retention-stat">
            <div class="retention-stat-value {retentionStats.sessionsClass}">{retentionStats.avgSessions}</div>
            <div class="retention-stat-label">Avg Sessions</div>
          </div>
          <div class="retention-stat">
            <div class="retention-stat-value {retentionStats.oneAndDoneClass}">{retentionStats.oneAndDone}</div>
            <div class="retention-stat-label">One-and-Done</div>
          </div>
        </div>
      </section>
    {/if}

    <section class="section">
      <h2 class="section-title">📈 Usage Trends (Last 7 Days)</h2>
      <div class="trends-grid">
        <div class="trend-chart">
          <h3>Daily Signups</h3>
          <div class="chart-bars">
            {#each signupTrend as count, i}
              {@const maxSignups = Math.max(...signupTrend, 1)}
              {@const height = (count / maxSignups) * 100}
              <div class="chart-bar-wrapper">
                <div class="chart-bar" style="height: {Math.max(height, 4)}%">
                  {#if count > 0}<span class="chart-bar-value">{count}</span>{/if}
                </div>
                <div class="chart-bar-label">{dayLabels[i]}</div>
              </div>
            {/each}
          </div>
        </div>
        <div class="trend-chart">
          <h3>Daily Activity</h3>
          <div class="chart-bars">
            {#each activityTrend as count, i}
              {@const maxAct = Math.max(...activityTrend, 1)}
              {@const height = (count / maxAct) * 100}
              <div class="chart-bar-wrapper">
                <div class="chart-bar activity" style="height: {Math.max(height, 4)}%">
                  {#if count > 0}<span class="chart-bar-value">{count}</span>{/if}
                </div>
                <div class="chart-bar-label">{dayLabels[i]}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">📋 All Users</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>Name / Email</th>
            <th>Age</th>
            <th>Position</th>
            <th>Level</th>
            <th>Scenarios</th>
            <th>Accuracy</th>
            <th>Streak</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {#if allUsersData.length === 0}
            <tr><td colspan="8" class="empty-cell">No users yet</td></tr>
          {:else}
            {#each allUsersData as { user, total, accuracy, streakCount }}
              {@const displayName = user.name || user.email || 'Unknown'}
              {@const age = user.birth_year ? new Date().getFullYear() - user.birth_year : null}
              {@const posText = user.position ? user.position.charAt(0).toUpperCase() + user.position.slice(1) : '-'}
              <tr>
                <td>{displayName}</td>
                <td class="num">{age ?? '-'}</td>
                <td>{posText}</td>
                <td>{user.age_level || '-'}</td>
                <td class="num">{total}</td>
                <td>{accuracy}%</td>
                <td>{streakCount > 0 ? '🔥 ' + streakCount : '-'}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </section>
  </div>
{/if}

<style>
  .loading-state, .auth-required {
    text-align: center;
    padding: 60px 20px;
  }
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--accent-red);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .auth-required h2 { font-family: var(--font-header); font-size: 1.5rem; margin-bottom: 16px; }
  .auth-required p { color: var(--silver); margin-bottom: 20px; }
  .auth-form {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 24px;
    max-width: 360px;
    margin: 0 auto 20px;
  }
  .auth-form input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    margin-bottom: 12px;
  }
  .auth-form button {
    width: 100%;
    padding: 12px;
    background: var(--accent-red);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }
  .auth-form button:hover { background: #a50d26; }
  .auth-message { margin-top: 12px; padding: 12px; border-radius: 8px; font-size: 0.9rem; }
  .auth-message.success { background: rgba(45, 122, 62, 0.2); color: #86efac; }
  .auth-message.error { background: rgba(200, 16, 46, 0.2); color: #f87171; }
  .auth-hint { margin-top: 10px; font-size: 0.8rem; color: var(--silver); line-height: 1.4; }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .last-updated { color: var(--silver); font-size: 0.85rem; }
  .refresh-btn {
    background: var(--accent-red);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
  }
  .refresh-btn:hover:not(:disabled) { background: #a50d26; }
  .refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .progress-error-banner {
    background: rgba(180, 60, 60, 0.2);
    border: 1px solid rgba(220, 80, 80, 0.5);
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
    font-size: 0.9rem;
    color: #f0a0a0;
  }
  .progress-error-banner code { font-size: 0.85em; }
  .progress-error-banner small { opacity: 0.9; margin-top: 6px; display: block; }

  .progress-empty-banner {
    background: rgba(160, 140, 60, 0.15);
    border: 1px solid rgba(200, 180, 80, 0.4);
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
    font-size: 0.9rem;
    color: #e0d0a0;
  }
  .progress-empty-banner code { font-size: 0.85em; }

  .scorecards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  .scorecard {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }
  .scorecard-value { font-family: var(--font-header); font-size: 2rem; color: white; line-height: 1; }
  .scorecard-value.highlight { color: var(--accent-red); }
  .scorecard-value.success { color: #2D7A3E; }
  .scorecard-label { color: var(--silver); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; }

  .section {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
  }
  .section-title {
    font-family: var(--font-header);
    font-size: 1.2rem;
    letter-spacing: 1px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .data-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  .data-table th, .data-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
  .data-table th { color: var(--silver); font-weight: 500; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; }
  .data-table tr:hover { background: rgba(255, 255, 255, 0.03); }
  .data-table .num { font-family: var(--font-header); font-size: 1.1rem; }
  .empty-cell { text-align: center; padding: 40px; color: var(--silver); }

  .progress-row { display: flex; align-items: center; gap: 8px; }
  .progress-bar {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    height: 8px;
    width: 100px;
    overflow: hidden;
  }
  .progress-fill { height: 100%; background: var(--accent-red); transition: width 0.3s; }
  .progress-fill.high { background: #2D7A3E; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 800px) { .grid-2 { grid-template-columns: 1fr; } }

  .user-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .user-item:last-child { border-bottom: none; }
  .user-avatar {
    width: 36px;
    height: 36px;
    background: var(--accent-red);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  .user-info { flex: 1; min-width: 0; }
  .user-email { font-size: 0.9rem; margin-bottom: 2px; }
  .user-meta { color: var(--silver); font-size: 0.75rem; }
  .user-stats { text-align: right; }
  .user-streak { color: #F59E0B; font-weight: 600; }

  .empty-state { text-align: center; padding: 40px; color: var(--silver); }

  .retention-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
  }
  .retention-stat {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 16px;
    text-align: center;
  }
  .retention-stat-value { font-family: var(--font-header); font-size: 1.75rem; color: white; line-height: 1; }
  .retention-stat-value.good { color: #2D7A3E; }
  .retention-stat-value.warning { color: #F59E0B; }
  .retention-stat-value.bad { color: var(--accent-red); }
  .retention-stat-label { color: var(--silver); font-size: 0.75rem; margin-top: 6px; }

  .trends-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 700px) { .trends-grid { grid-template-columns: 1fr; } }
  .trend-chart h3 { font-size: 0.9rem; color: var(--silver); margin-bottom: 16px; font-weight: 500; }
  .chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 120px; padding-top: 10px; }
  .chart-bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; }
  .chart-bar {
    width: 100%;
    background: var(--accent-red);
    border-radius: 4px 4px 0 0;
    min-height: 4px;
    position: relative;
    transition: height 0.3s ease;
  }
  .chart-bar.activity { background: #2D7A3E; }
  .chart-bar-value {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
  }
  .chart-bar-label { margin-top: 8px; font-size: 0.7rem; color: var(--silver); text-align: center; }
</style>
