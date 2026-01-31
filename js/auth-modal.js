/**
 * Auth Modal Component
 * Unified magic link auth - works for both new and existing users
 */

import { signInWithMagicLink, signInWithGoogle } from './supabase.js';

/**
 * Show the auth modal
 * @param {Object} options - Configuration options
 * @param {boolean} options.required - If true, modal can't be dismissed (for gating content)
 * @param {Function} options.onSuccess - Callback after successful auth
 */
export function showAuthModal(options = {}) {
    const { required = false, onSuccess } = options;

    // Remove existing modal if present
    const existing = document.getElementById('auth-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    if (required) modal.classList.add('auth-modal-required');

    modal.innerHTML = `
        <div class="auth-modal-overlay">
            <div class="auth-modal-content">
                ${!required ? '<button class="auth-modal-close" aria-label="Close">&times;</button>' : ''}

                <h2>${required ? 'Enter Your Email to Start' : 'Continue with Email'}</h2>
                <p class="auth-subtitle">
                    ${required
                        ? 'We\'ll send you a magic link — no password needed.'
                        : 'Works for new and existing accounts.'}
                </p>

                ${required ? `
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
                        Send Magic Link
                    </button>
                </form>

                <p class="auth-hint">No password needed — just click the link in your email.</p>

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
        const hintEl = modal.querySelector('.auth-hint');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        messageEl.textContent = '';
        messageEl.className = 'auth-message';

        const { error } = await signInWithMagicLink(email);

        if (error) {
            messageEl.textContent = error.message;
            messageEl.className = 'auth-message error';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Magic Link';
        } else {
            messageEl.innerHTML = `
                <strong>Check your email!</strong><br>
                We sent a magic link to <strong>${email}</strong>.<br>
                Click it to continue.
            `;
            messageEl.className = 'auth-message success';
            form.style.display = 'none';
            if (hintEl) hintEl.style.display = 'none';
        }
    });

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

        .auth-hint {
            text-align: center;
            color: #A8B2BE;
            font-size: 0.85rem;
            margin-top: 1rem;
            margin-bottom: 0;
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
