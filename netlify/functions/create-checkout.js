/**
 * Create Stripe Checkout Session
 * Creates a Stripe Checkout session for new subscribers
 * 
 * Environment variables required:
 * - STRIPE_SECRET_KEY: Stripe secret key (sk_test_... or sk_live_...)
 * - STRIPE_PRICE_MONTHLY: Stripe price ID for monthly plan
 * - STRIPE_PRICE_ANNUAL: Stripe price ID for annual plan
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase service role key
 * - URL: Site URL (automatically set by Netlify)
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { userId, userEmail, priceType } = JSON.parse(event.body);

    if (!userId || !userEmail) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing userId or userEmail' })
      };
    }

    // Map priceType to Stripe price ID
    const priceId = priceType === 'annual' 
      ? process.env.STRIPE_PRICE_ANNUAL 
      : process.env.STRIPE_PRICE_MONTHLY;

    if (!priceId) {
      console.error('Price ID not configured for type:', priceType);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Price not configured' })
      };
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      // Create new Stripe customer
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
    const siteUrl = process.env.URL || 'https://hockeyiq.netlify.app';
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${siteUrl}/training.html?upgraded=true`,
      cancel_url: `${siteUrl}/training.html?canceled=true`,
      metadata: { supabase_user_id: userId },
      allow_promotion_codes: true,
      billing_address_collection: 'auto'
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        sessionId: session.id, 
        url: session.url 
      })
    };
  } catch (error) {
    console.error('Checkout error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
