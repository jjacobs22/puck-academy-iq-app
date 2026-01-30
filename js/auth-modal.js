/**
 * Auth Modal Component
 * Shows sign up / sign in modal for creating accounts
 */

import { signInWithMagicLink, signInWithGoogle } from './supabase.js';

/**
 * Show the auth modal
 * @param {Object} options - Configuration options
 * @param {string} options.mode - 'signup' or 'signin'
 * @param {boolean} options.required - If true, modal can't be dismissed (for gating content)
 * @param {Function} options.onSuccess - Callback after successful auth
 */
export function showAuthModal(options = {}) {
    const { mode = 'signup', required = false, onSuccess } = options;

    // Remove existing modal if present
    const existing = document.getElementById('auth-modal');
    if (existing) existing.remove();

    const isSignup = mode === 'signup';

    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    if (required) modal.classList.add('auth-modal-required');

    modal.innerHTML = `
        <div class="auth-modal-overlay">
            <div class="auth-modal-content">
                ${!required ? '<button class="auth-modal-close" aria-label="Close">&times;</button>' : ''}

                <h2>${required ? 'Create an Account to Start' : (isSignup ? 'Create Your Free Account' : 'Welcome Back')}</h2>
                <p class="auth-subtitle">
                    ${required
                        ? 'Quick signup — just enter your email to begin training.'
                        : (isSignup
                            ? 'Save your progress across all your devices.'
                            : 'Sign in to continue your training.')}
                </p>

                ${(isSignup || required) ? `
                <div class="auth-benefits">
                    <div class="auth-benefit">✓ Save your progress permanently</div>
                    <div class="auth-benefit">✓ Track scores across all modules</div>
                    <div class="auth-benefit">✓ Access from any device</div>
                </div>
                ` : ''}

                <form id="magic-link-form" class="auth-form">
                    <input 
                        type="email" 
                        id="auth-email" 
                        placeholder="Enter your email" 
                        required
                        autocomplete="email"
                    >
                    <button type="submit" class="btn-primary auth-btn">
                        ${isSignup ? 'Create Account' : 'Send Magic Link'}
                    </button>
                </form>

                <!-- Google OAuth - TODO: Enable when configured in Supabase -->
                <!-- 
                <div class="auth-divider">
                    <span>or</span>
                </div>

                <button id="google-signin" class="btn-google">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                        <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                </button>
                -->

                <p class="auth-footer">
                    ${isSignup 
                        ? `Already have an account? <a href="#" id="switch-to-signin">Sign in</a>` 
                        : `Don't have an account? <a href="#" id="switch-to-signup">Sign up</a>`}
                </p>

                <div id="auth-message" class="auth-message"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Inject styles if not already present
    injectAuthStyles();

    // Event listeners
    const closeBtn = modal.querySelector('.auth-modal-close');
    const overlay = modal.querySelector('.auth-modal-overlay');
    const form = modal.querySelector('#magic-link-form');
    const googleBtn = modal.querySelector('#google-signin'); // Currently disabled
    const switchLink = modal.querySelector('#switch-to-signin, #switch-to-signup');

    // Only allow closing if not required
    if (!required) {
        closeBtn.addEventListener('click', () => modal.remove());

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) modal.remove();
        });

        // Escape key closes modal
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    // Magic link form
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const messageEl = document.getElementById('auth-message');
        const submitBtn = form.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        messageEl.textContent = '';
        messageEl.className = 'auth-message';

        const { error } = await signInWithMagicLink(email);

        if (error) {
            messageEl.textContent = error.message;
            messageEl.className = 'auth-message error';
            submitBtn.disabled = false;
            submitBtn.textContent = isSignup ? 'Create Account' : 'Send Magic Link';
        } else {
            messageEl.innerHTML = `
                <strong>Check your email!</strong><br>
                We sent a magic link to <strong>${email}</strong>.<br>
                Click it to ${isSignup ? 'create your account' : 'sign in'}.
            `;
            messageEl.className = 'auth-message success';
            form.style.display = 'none';
            // Hide optional elements if they exist
            if (googleBtn) googleBtn.style.display = 'none';
            const divider = modal.querySelector('.auth-divider');
            if (divider) divider.style.display = 'none';
        }
    });

    // Google sign in (only if button exists)
    googleBtn?.addEventListener('click', async () => {
        const messageEl = document.getElementById('auth-message');
        googleBtn.disabled = true;
        googleBtn.textContent = 'Redirecting...';

        const { error } = await signInWithGoogle();

        if (error) {
            messageEl.textContent = error.message;
            messageEl.className = 'auth-message error';
            googleBtn.disabled = false;
            googleBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Continue with Google
            `;
        }
    });

    // Switch between signup/signin
    if (switchLink) {
        switchLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.remove();
            showAuthModal({
                mode: isSignup ? 'signin' : 'signup',
                required,
                onSuccess
            });
        });
    }

    // Focus email input
    setTimeout(() => {
        document.getElementById('auth-email')?.focus();
    }, 100);
}

/**
 * Hide the auth modal
 */
export function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.remove();
}

/**
 * Inject auth modal styles
 */
function injectAuthStyles() {
    if (document.getElementById('auth-modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'auth-modal-styles';
    styles.textContent = `
        .auth-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
            animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .auth-modal-content {
            background: linear-gradient(135deg, #0A1628 0%, #1a2940 100%);
            border-radius: 16px;
            padding: 2rem;
            max-width: 400px;
            width: 100%;
            position: relative;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }

        .auth-modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: #A8B2BE;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.25rem;
            line-height: 1;
            transition: color 0.2s;
        }

        .auth-modal-close:hover {
            color: white;
        }

        .auth-modal-content h2 {
            margin: 0 0 0.5rem;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 1.75rem;
            letter-spacing: 1px;
        }

        .auth-subtitle {
            color: #A8B2BE;
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }

        .auth-benefits {
            background: rgba(255, 255, 255, 0.05);
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
        }

        .auth-benefit {
            padding: 0.35rem 0;
            color: #E8F4F8;
            font-size: 0.9rem;
        }

        .auth-form {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        #auth-email {
            padding: 0.875rem 1rem;
            border-radius: 10px;
            border: 2px solid rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.08);
            color: white;
            font-size: 1rem;
            transition: all 0.2s;
        }

        #auth-email:focus {
            outline: none;
            border-color: #C8102E;
            background: rgba(255, 255, 255, 0.12);
        }

        #auth-email::placeholder {
            color: #A8B2BE;
        }

        .auth-btn {
            padding: 0.875rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
        }

        .auth-btn.btn-primary {
            background: #C8102E;
            color: white;
        }

        .auth-btn.btn-primary:hover:not(:disabled) {
            background: #a50d26;
            transform: translateY(-2px);
        }

        .auth-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .auth-divider {
            text-align: center;
            margin: 1.25rem 0;
            color: #666;
            position: relative;
        }

        .auth-divider::before,
        .auth-divider::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 40%;
            height: 1px;
            background: rgba(255, 255, 255, 0.15);
        }

        .auth-divider::before { left: 0; }
        .auth-divider::after { right: 0; }

        .auth-divider span {
            background: #0f1d2e;
            padding: 0 1rem;
            position: relative;
        }

        .btn-google {
            width: 100%;
            padding: 0.875rem;
            border-radius: 10px;
            border: 2px solid rgba(255, 255, 255, 0.15);
            background: white;
            color: #333;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            transition: all 0.2s;
        }

        .btn-google:hover:not(:disabled) {
            background: #f5f5f5;
            transform: translateY(-2px);
        }

        .btn-google:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .auth-footer {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.875rem;
            color: #A8B2BE;
        }

        .auth-footer a {
            color: #C8102E;
            text-decoration: none;
            font-weight: 600;
        }

        .auth-footer a:hover {
            text-decoration: underline;
        }

        .auth-message {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .auth-message:empty {
            display: none;
        }

        .auth-message.success {
            background: rgba(34, 197, 94, 0.15);
            color: #22c55e;
            border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .auth-message.error {
            background: rgba(239, 68, 68, 0.15);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.3);
        }

        @media (max-width: 480px) {
            .auth-modal-content {
                padding: 1.5rem;
            }
            
            .auth-modal-content h2 {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(styles);
}
