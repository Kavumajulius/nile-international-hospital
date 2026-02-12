# Whop Dashboard Setup Guide

## Overview

This guide provides step-by-step instructions for configuring your Whop dashboard to support the Dateline payment system.

## Prerequisites

- A Whop seller account
- Access to Whop dashboard at https://dash.whop.com

## Step 1: Create Pricing Plans

You need to create 3 pricing plans that match the Dateline pricing structure:

### Plan 1: Starter ($25)
- **Price**: $25.00 USD
- **Name**: "Conversation Minutes - Starter"
- **Description**: "84 conversation minutes for practice sessions"
- **Type**: One-time purchase (not subscription)
- **Product Type**: Digital Product

### Plan 2: Growth ($50)
- **Price**: $50.00 USD
- **Name**: "Conversation Minutes - Growth"
- **Description**: "180 conversation minutes for regular practice"
- **Type**: One-time purchase
- **Product Type**: Digital Product

### Plan 3: Premium ($125)
- **Price**: $125.00 USD
- **Name**: "Conversation Minutes - Premium"
- **Description**: "450 conversation minutes for intensive practice"
- **Type**: One-time purchase
- **Product Type**: Digital Product

## Step 2: Configure Plan Settings

For each plan, configure the following:

### General Settings
- **Plan Name**: As specified above
- **Price**: As specified above
- **Currency**: USD
- **Billing Type**: One-time
- **Plan Type**: Standard

### Product Settings
- **Product Type**: Digital Product
- **Delivery Method**: Instant (we handle delivery in our app)
- **File Upload**: Not required (handled by our app)

### Access Settings
- **Stock**: Unlimited
- **Purchase Limit**: No limit per customer
- **Visibility**: Public

## Step 3: Get Plan IDs

After creating each plan:

1. Go to your Whop dashboard
2. Navigate to **Products** > **Plans**
3. Click on each plan
4. Copy the **Plan ID** from the URL or plan details
   - It will look like: `plan_XXXXXXXXXXXXXXXXX`

## Step 4: Configure Environment Variables

Add the Plan IDs to your `.env` file:

```env
# Whop Payment Plan IDs
VITE_WHOP_PLAN_STARTER=plan_XXXXXXXXXXXXXXXXX
VITE_WHOP_PLAN_GROWTH=plan_XXXXXXXXXXXXXXXXX
VITE_WHOP_PLAN_PREMIUM=plan_XXXXXXXXXXXXXXXXX
```

## Step 5: Configure Return URLs

In your Whop dashboard:

1. Go to **Settings** > **Developer**
2. Add your return URL: `https://yourdomain.com/checkout/complete`
3. For development: `http://localhost:3000/checkout/complete`

## Step 6: Configure Webhooks (Optional but Recommended)

For production, set up webhooks to receive payment confirmations:

1. Go to **Settings** > **Webhooks**
2. Create webhook endpoint for `checkout.session.completed`
3. URL: `https://your-api.com/webhooks/whop`
4. This allows server-side verification of payments

## Step 7: Test Payments

1. Use Whop's test mode to test payments without real money
2. Create test plans with $0.01 prices
3. Test the full payment flow

## Step 8: Go Live

1. Switch plans from "Draft" to "Published"
2. Update environment variables with live Plan IDs
3. Test with real payments (start with small amounts)

## Plan ID Mapping

| Plan Name | Price | Minutes | Environment Variable |
|-----------|-------|---------|---------------------|
| Starter | $25 | 84 | `VITE_WHOP_PLAN_STARTER` |
| Growth | $50 | 180 | `VITE_WHOP_PLAN_GROWTH` |
| Premium | $125 | 450 | `VITE_WHOP_PLAN_PREMIUM` |

## Important Notes

- **Plan IDs are unique** - never reuse the same plan for different products
- **Test thoroughly** - Test the complete flow from purchase to minute allocation
- **Monitor payments** - Use Whop analytics to track sales and issues
- **Customer support** - Be prepared to handle payment disputes through Whop

## Troubleshooting

### "Plan not found" error
- Check that Plan IDs are correctly copied to `.env`
- Verify plans are published (not in draft mode)
- Check for typos in Plan ID format

### Checkout not loading
- Ensure `@whop/checkout` package is installed
- Check browser console for JavaScript errors
- Verify plan exists and is accessible

### Return URL issues
- Ensure return URL is exactly as configured in Whop
- Check for HTTPS requirement in production
- Verify URL encoding for query parameters

## Support

- Whop Documentation: https://docs.whop.com
- Whop Support: Contact through dashboard or support@whop.com
- For app-specific issues: Check browser console and ensure environment variables are set
