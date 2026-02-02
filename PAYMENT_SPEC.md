# Payment Implementation Spec

**Goal:** Add subscription payments with Module 1 free, Modules 2-6 paid.
**Estimated Time:** 6-8 hours
**Stack:** Stripe Checkout + Supabase + Netlify Functions

---

## Pricing Model

| Tier | Price | Access |
|------|-------|--------|
| **Free** | $0 | Module 1 (D-Zone, 7 scenarios) + Daily Challenge + Streaks |
| **Pro** | $9.99/month | All 6 modules (43 scenarios) + everything in Free |
| **Pro Annual** | $79/year | Same as Pro (save 34%) |

---

## User Flows

### Flow 1: Free User Hits Paywall

1. User completes Module 1 (or clicks Module 2-6)
2. Sees locked module card with:
   - Lock icon overlay
   - "Unlock All Modules" CTA
   - Brief value prop: "Master faceoffs, breakouts, offense & more"
3. Clicks CTA → Stripe Checkout opens
4. Completes payment → redirected to `/training.html?upgraded=true`
5. All modules now unlocked

### Flow 2: Managing Subscription

1. User clicks "Manage Subscription" (in account dropdown or settings)
2. Opens Stripe Customer Portal (hosted by Stripe)
3. Can update payment method, cancel, view invoices

### Flow 3: Subscription Expires/Cancels

1. Stripe webhook fires `customer.subscription.deleted`
2. Netlify function updates Supabase `subscription_status = 'canceled'`
3. User loses access to Modules 2-6 (but keeps progress data)
4. Module cards show locked state again

---

## Technical Implementation

### 1. Stripe Setup (Stripe Dashboard)

**Products to create:**
- Product: "Puck Academy Pro"
  - Price 1: $9.99/month (recurring)
  - Price 2: $79/year (recurring)

**Settings:**
- Enable Customer Portal (Settings → Billing → Customer Portal)
- Configure portal: allow cancel, allow payment method update
- Set up webhook endpoint: `https://hockeyiq.netlify.app/.netlify/functions/stripe-webhook`

**Environment variables needed:**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_ANNUAL=price_...
```

---

### 2. Supabase Schema Update

```sql
-- Add subscription fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free';
-- Values: 'free', 'active', 'canceled', 'past_due'

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ;
-- When subscription expires (for canceled subscriptions with remaining time)
```

---

### 3. Netlify Functions

#### `netlify/functions/create-checkout.js`
Creates Stripe Checkout session for new subscribers.

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { userId, userEmail, priceId } = JSON.parse(event.body);

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: { supabase_user_id: userId }
      });
      customerId = customer.id;

      // Save customer ID to profile
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.URL}/training.html?upgraded=true`,
      cancel_url: `${process.env.URL}/training.html?canceled=true`,
      metadata: { supabase_user_id: userId }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id, url: session.url })
    };
  } catch (error) {
    console.error('Checkout error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

#### `netlify/functions/stripe-webhook.js`
Handles Stripe webhook events to update subscription status.

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  const { type, data } = stripeEvent;

  try {
    switch (type) {
      case 'checkout.session.completed': {
        const session = data.object;
        const userId = session.metadata.supabase_user_id;

        await supabase
          .from('profiles')
          .update({
            subscription_status: 'active',
            stripe_customer_id: session.customer
          })
          .eq('id', userId);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = data.object;
        const customerId = subscription.customer;

        // Find user by stripe_customer_id
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          let status = 'active';
          if (subscription.status === 'past_due') status = 'past_due';
          if (subscription.status === 'canceled') status = 'canceled';
          if (subscription.cancel_at_period_end) status = 'canceled';

          await supabase
            .from('profiles')
            .update({
              subscription_status: status,
              subscription_end_date: subscription.cancel_at_period_end
                ? new Date(subscription.current_period_end * 1000).toISOString()
                : null
            })
            .eq('id', profile.id);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = data.object;
        const customerId = subscription.customer;

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({ subscription_status: 'free' })
            .eq('id', profile.id);
        }
        break;
      }
    }

    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Webhook handler error:', error);
    return { statusCode: 500, body: error.message };
  }
};
```

#### `netlify/functions/create-portal-session.js`
Creates Stripe Customer Portal session for subscription management.

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { customerId } = JSON.parse(event.body);

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.URL}/training.html`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    console.error('Portal error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
```

---

### 4. Frontend Changes

#### `js/supabase.js` — Add subscription helpers

```javascript
// Check if user has active subscription
export async function hasActiveSubscription() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single();

  return profile?.subscription_status === 'active';
}

// Get subscription status
export async function getSubscriptionStatus() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 'free';

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, stripe_customer_id')
    .eq('id', user.id)
    .single();

  return profile || { subscription_status: 'free', stripe_customer_id: null };
}
```

#### `training.html` — Add paywall UI

**Locked module card state:**
```html
<div class="module-card locked" data-module="2">
  <div class="lock-overlay">
    <span class="lock-icon">🔒</span>
  </div>
  <div class="module-header">
    <h3>⚔️ Faceoffs</h3>
    <span class="pro-badge">PRO</span>
  </div>
  <p class="module-teaser">Master the mental game before the puck drops</p>
</div>
```

**Upgrade modal:**
```html
<div id="upgradeModal" class="modal">
  <div class="modal-content upgrade-modal">
    <button class="modal-close">&times;</button>

    <h2>Unlock All Training</h2>
    <p class="upgrade-subtitle">Get full access to all 43 scenarios across 6 modules</p>

    <div class="pricing-options">
      <button class="pricing-option" data-price="monthly">
        <span class="price">$9.99</span>
        <span class="period">/month</span>
      </button>

      <button class="pricing-option recommended" data-price="annual">
        <span class="save-badge">Save 34%</span>
        <span class="price">$79</span>
        <span class="period">/year</span>
      </button>
    </div>

    <div class="upgrade-features">
      <div class="feature">✓ 43 game scenarios</div>
      <div class="feature">✓ 6 complete modules</div>
      <div class="feature">✓ Track your progress</div>
      <div class="feature">✓ Daily challenges</div>
    </div>

    <p class="cancel-note">Cancel anytime. Keep your progress.</p>
  </div>
</div>
```

**JavaScript for paywall:**
```javascript
// On page load, check subscription and update UI
async function initPaywall() {
  const { subscription_status } = await getSubscriptionStatus();
  const isPro = subscription_status === 'active';

  // Update module cards
  document.querySelectorAll('.module-card').forEach(card => {
    const moduleId = parseInt(card.dataset.module);
    if (moduleId > 1 && !isPro) {
      card.classList.add('locked');
      card.addEventListener('click', showUpgradeModal);
    }
  });

  // Show/hide pro badge in header
  if (isPro) {
    document.getElementById('proBadge')?.classList.remove('hidden');
  }
}

// Handle upgrade click
async function handleUpgrade(priceType) {
  const priceId = priceType === 'annual'
    ? 'price_ANNUAL_ID'
    : 'price_MONTHLY_ID';

  const { data: { user } } = await supabase.auth.getUser();

  const response = await fetch('/.netlify/functions/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user.id,
      userEmail: user.email,
      priceId
    })
  });

  const { url } = await response.json();
  window.location.href = url;
}
```

---

### 5. CSS for Paywall

```css
/* Locked module card */
.module-card.locked {
  position: relative;
  cursor: pointer;
}

.module-card.locked::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(10, 22, 40, 0.7);
  border-radius: var(--radius-md);
  z-index: 1;
}

.lock-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-size: 2rem;
}

.pro-badge {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Upgrade modal */
.upgrade-modal {
  max-width: 400px;
  text-align: center;
}

.upgrade-subtitle {
  color: var(--silver);
  margin-bottom: 24px;
}

.pricing-options {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.pricing-option {
  flex: 1;
  background: rgba(255,255,255,0.05);
  border: 2px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-md);
  padding: 20px 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.pricing-option:hover,
.pricing-option.recommended {
  border-color: var(--accent-red);
  background: rgba(200, 16, 46, 0.1);
}

.pricing-option .price {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  display: block;
}

.pricing-option .period {
  color: var(--silver);
  font-size: 0.85rem;
}

.save-badge {
  background: var(--success-green);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 8px;
}

.upgrade-features {
  text-align: left;
  margin-bottom: 20px;
}

.upgrade-features .feature {
  padding: 8px 0;
  color: var(--ice-blue);
}

.cancel-note {
  color: var(--silver);
  font-size: 0.85rem;
}
```

---

## Legal Pages Needed

### `/terms.html`
Basic Terms of Service covering:
- Service description
- User accounts
- Subscription billing & cancellation
- User conduct
- Intellectual property
- Limitation of liability
- Age requirements (COPPA: under 13 needs parental consent)

### `/privacy.html`
Privacy Policy covering:
- What data you collect (email, progress, usage)
- How you use it (provide service, send emails)
- Third parties (Stripe for payments, Supabase for data)
- Data retention
- User rights (access, deletion)
- COPPA compliance
- Contact information

**Tip:** Use a generator like Termly.io or iubenda, then customize.

---

## Testing Checklist

Before going live:

- [ ] Create Stripe products in TEST mode first
- [ ] Test full checkout flow with test card `4242 4242 4242 4242`
- [ ] Test webhook events using Stripe CLI: `stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook`
- [ ] Verify subscription_status updates in Supabase after checkout
- [ ] Test locked → unlocked module transition
- [ ] Test Customer Portal (cancel, update payment)
- [ ] Test canceled subscription → modules lock again
- [ ] Switch to LIVE mode and test with real $1 charge (refund after)

---

## Launch Checklist

1. [ ] Stripe products created (live mode)
2. [ ] Webhook endpoint configured in Stripe Dashboard
3. [ ] Environment variables set in Netlify
4. [ ] Supabase schema updated
5. [ ] Terms of Service page live
6. [ ] Privacy Policy page live
7. [ ] Footer links to Terms & Privacy added
8. [ ] Test purchase with real card
9. [ ] Announce to beta users! 🚀
