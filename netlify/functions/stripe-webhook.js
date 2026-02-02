/**
 * Stripe Webhook Handler
 * Handles Stripe webhook events to update subscription status
 * 
 * Environment variables required:
 * - STRIPE_SECRET_KEY: Stripe secret key
 * - STRIPE_WEBHOOK_SECRET: Stripe webhook signing secret (whsec_...)
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase service role key
 */

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

  console.log('Received Stripe event:', type);

  try {
    switch (type) {
      // Checkout completed - user subscribed
      case 'checkout.session.completed': {
        const session = data.object;
        const userId = session.metadata?.supabase_user_id;

        if (!userId) {
          console.error('No supabase_user_id in checkout session metadata');
          break;
        }

        console.log('Checkout completed for user:', userId);

        await supabase
          .from('profiles')
          .update({
            subscription_status: 'active',
            stripe_customer_id: session.customer,
            subscription_end_date: null
          })
          .eq('id', userId);

        console.log('User subscription activated:', userId);
        break;
      }

      // Subscription updated (plan change, cancellation scheduled, payment issues)
      case 'customer.subscription.updated': {
        const subscription = data.object;
        const customerId = subscription.customer;

        console.log('Subscription updated for customer:', customerId);

        // Find user by stripe_customer_id
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (error || !profile) {
          console.error('Could not find profile for customer:', customerId, error);
          break;
        }

        // Determine subscription status
        let status = 'active';
        let endDate = null;

        if (subscription.status === 'past_due') {
          status = 'past_due';
        } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
          status = 'canceled';
        } else if (subscription.cancel_at_period_end) {
          // User scheduled cancellation but still has access
          status = 'canceled';
          endDate = new Date(subscription.current_period_end * 1000).toISOString();
        }

        await supabase
          .from('profiles')
          .update({
            subscription_status: status,
            subscription_end_date: endDate
          })
          .eq('id', profile.id);

        console.log('Updated subscription status for user:', profile.id, 'to:', status);
        break;
      }

      // Subscription deleted (expired or fully canceled)
      case 'customer.subscription.deleted': {
        const subscription = data.object;
        const customerId = subscription.customer;

        console.log('Subscription deleted for customer:', customerId);

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (error || !profile) {
          console.error('Could not find profile for customer:', customerId, error);
          break;
        }

        await supabase
          .from('profiles')
          .update({ 
            subscription_status: 'free',
            subscription_end_date: null
          })
          .eq('id', profile.id);

        console.log('Reverted user to free tier:', profile.id);
        break;
      }

      // Invoice payment failed
      case 'invoice.payment_failed': {
        const invoice = data.object;
        const customerId = invoice.customer;

        console.log('Payment failed for customer:', customerId);

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({ subscription_status: 'past_due' })
            .eq('id', profile.id);
        }
        break;
      }

      // Invoice paid successfully (renewal)
      case 'invoice.paid': {
        const invoice = data.object;
        const customerId = invoice.customer;

        // Only process subscription invoices (not one-time payments)
        if (invoice.subscription) {
          console.log('Invoice paid for customer:', customerId);

          const { data: profile } = await supabase
            .from('profiles')
            .select('id, subscription_status')
            .eq('stripe_customer_id', customerId)
            .single();

          // Re-activate if was past_due
          if (profile && profile.subscription_status === 'past_due') {
            await supabase
              .from('profiles')
              .update({ 
                subscription_status: 'active',
                subscription_end_date: null
              })
              .eq('id', profile.id);

            console.log('Reactivated subscription for user:', profile.id);
          }
        }
        break;
      }

      default:
        console.log('Unhandled event type:', type);
    }

    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Webhook handler error:', error);
    return { statusCode: 500, body: error.message };
  }
};
