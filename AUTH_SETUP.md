# Google OAuth Authentication Setup Guide

This guide will help you set up Google OAuth authentication for the Dateline application.

## Prerequisites

- A Google Cloud Platform (GCP) account
- Access to Google Cloud Console

## Step 1: Create a Google OAuth 2.0 Client ID

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - Choose **External** (unless you have a Google Workspace account)
   - Fill in the required information:
     - App name: `Dateline`
     - User support email: Your email
     - Developer contact information: Your email
   - Click **Save and Continue**
   - Add scopes (at minimum, `email` and `profile`)
   - Add test users if your app is in testing mode
   - Review and submit

6. Create the OAuth client:
   - Application type: **Web application**
   - Name: `Dateline Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for local development)
     - `http://localhost:3000` (if using a different port)
     - Add your production domain when ready
   - Authorized redirect URIs:
     - `http://localhost:5173` (for local development)
     - `http://localhost:3000` (if using a different port)
     - Add your production domain when ready
   - Click **Create**

7. Copy the **Client ID** (you'll need this in the next step)

## Step 2: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your Google OAuth Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

**Important:** 
- Replace `your-client-id-here.apps.googleusercontent.com` with your actual Client ID from Step 1
- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file

## Step 3: Install Dependencies

If you haven't already, install the required package:

```bash
npm install @react-oauth/google
```

Or if you're using a different package manager:

```bash
yarn add @react-oauth/google
# or
pnpm add @react-oauth/google
```

## Step 4: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your application (typically `http://localhost:5173`)

3. Click the **Sign up** or **Log in** button on the landing page

4. You should see a Google Sign-In modal

5. Click **Continue with Google** and complete the authentication flow

## Troubleshooting

### "Google OAuth Client ID not configured" Warning

- Make sure you've created a `.env` file in the root directory
- Verify the variable name is exactly `VITE_GOOGLE_CLIENT_ID`
- Restart your development server after adding the environment variable
- Check that the Client ID is correct (no extra spaces or quotes)

### "Failed to sign in with Google" Error

- Verify your authorized JavaScript origins include your current URL
- Check that your redirect URIs are correctly configured
- Ensure your OAuth consent screen is properly configured
- Check the browser console for detailed error messages

### Redirect URI Mismatch

- Make sure the redirect URI in your Google Cloud Console matches exactly with your application URL
- Include the protocol (`http://` or `https://`)
- Include the port number if using a non-standard port

## Production Deployment

When deploying to production:

1. Add your production domain to:
   - Authorized JavaScript origins
   - Authorized redirect URIs

2. Update your production environment variables with the same Client ID (or create a separate one for production)

3. Ensure your production environment has the `VITE_GOOGLE_CLIENT_ID` environment variable set

## Security Notes

- The Client ID is safe to expose in client-side code (it's public)
- Never expose your Client Secret (not needed for this implementation)
- Always use HTTPS in production
- Regularly review and rotate your OAuth credentials
- Monitor your OAuth usage in Google Cloud Console

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)

