# Google OAuth Authentication Setup Guide

This guide provides comprehensive instructions for setting up and configuring Google OAuth 2.0 authentication for the Dateline application.

## Overview

The authentication system uses Google OAuth 2.0 for secure user authentication. It includes:
- Token validation and management
- Session management with automatic expiration
- Secure token storage
- Support for both new user sign-up and returning user sign-in
- Automatic token refresh (when backend is available)

## Prerequisites

- A Google Cloud Platform (GCP) account
- Access to Google Cloud Console
- Node.js and npm installed

## Step 1: Create Google OAuth 2.0 Credentials

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click the project dropdown at the top
   - Click "New Project" or select an existing project
   - Give it a name (e.g., "Dateline App")
   - Click "Create"

3. **Enable Google+ API**
   - Navigate to **APIs & Services** > **Library**
   - Search for "Google+ API" or "People API"
   - Click on it and click "Enable"

4. **Configure OAuth Consent Screen**
   - Go to **APIs & Services** > **OAuth consent screen**
   - Choose **External** (unless you have a Google Workspace account)
   - Fill in the required information:
     - **App name**: `Dateline`
     - **User support email**: Your email address
     - **Developer contact information**: Your email address
   - Click **Save and Continue**
   - **Scopes**: Add the following scopes:
     - `email`
     - `profile`
     - `openid`
   - Click **Save and Continue**
   - **Test users**: Add test users if your app is in testing mode
   - Click **Save and Continue**
   - Review and click **Back to Dashboard**

5. **Create OAuth Client ID**
   - Go to **APIs & Services** > **Credentials**
   - Click **+ CREATE CREDENTIALS** > **OAuth client ID**
   - **Application type**: Select **Web application**
   - **Name**: `Dateline Web Client`
   - **Authorized JavaScript origins**:
     - For development: `http://localhost:3000`
     - For production: Add your production domain (e.g., `https://yourdomain.com`)
   - **Authorized redirect URIs**:
     - For development: `http://localhost:3000`
     - For production: Add your production domain
   - Click **Create**
   - **Copy the Client ID** (you'll need this in the next step)

## Step 2: Configure Environment Variables

1. **Create `.env` file**
   - In the root of your project (`dateline-1/`), create a file named `.env`
   - **Important**: The `.env` file is already in `.gitignore` and will not be committed to version control

2. **Add your Google OAuth Client ID**
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```

   Replace `your-client-id-here.apps.googleusercontent.com` with the actual Client ID from Step 1.

3. **Optional: Configure Additional Settings**
   ```env
   # Token refresh threshold (in seconds, default: 300 = 5 minutes)
   VITE_TOKEN_REFRESH_THRESHOLD=300

   # Session timeout (in seconds, default: 3600 = 1 hour)
   VITE_SESSION_TIMEOUT=3600

   # Backend API URL (if you have a backend for token validation)
   # VITE_API_URL=https://api.yourdomain.com
   ```

## Step 3: Verify Installation

1. **Install Dependencies** (if not already done)
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Test Authentication**
   - Navigate to the landing page
   - Click "Sign up" or "Log in"
   - Click "Continue with Google"
   - You should be redirected to Google's sign-in page
   - After signing in, you should be redirected back and authenticated

## Security Best Practices

### Environment Variables
- ✅ **Never commit `.env` files to version control**
- ✅ **Use different Client IDs for development and production**
- ✅ **Rotate credentials if they are ever exposed**
- ✅ **Use environment-specific `.env` files** (`.env.development`, `.env.production`)

### Token Management
- ✅ Tokens are stored securely in localStorage
- ✅ Tokens are automatically validated on app load
- ✅ Sessions expire after the configured timeout
- ✅ Expired tokens are automatically cleared

### Production Considerations
1. **Use HTTPS**: Always use HTTPS in production
2. **Backend Validation**: For production, implement backend token validation
3. **Token Refresh**: Implement token refresh via backend for better security
4. **CORS Configuration**: Ensure proper CORS settings in Google Cloud Console
5. **Rate Limiting**: Implement rate limiting on authentication endpoints

## Troubleshooting

### "Google OAuth Client ID not configured"
- Ensure `.env` file exists in the project root
- Verify `VITE_GOOGLE_CLIENT_ID` is set correctly
- Restart the development server after adding environment variables

### "Failed to sign in with Google"
- Check that the Client ID is correct
- Verify authorized JavaScript origins include your current URL
- Check browser console for detailed error messages
- Ensure Google+ API or People API is enabled in Google Cloud Console

### "Token is invalid or expired"
- Clear browser localStorage and try again
- Check that the token hasn't expired (default: 1 hour)
- Verify network connectivity

### Redirect URI Mismatch
- Ensure the redirect URI in Google Cloud Console matches your current URL exactly
- For development: `http://localhost:3000`
- Check for trailing slashes or protocol mismatches

## Architecture

### Authentication Flow

1. **User clicks "Sign in" or "Sign up"**
   - Opens authentication modal
   - Both actions use the same Google OAuth flow

2. **Google OAuth Flow**
   - User is redirected to Google sign-in
   - User grants permissions
   - Google returns access token

3. **Token Validation**
   - Token is validated with Google's API
   - User information is fetched
   - Token and user data are stored securely

4. **Session Management**
   - Session start time is recorded
   - Token expiry is tracked
   - Periodic validation ensures token is still valid

5. **User Recognition**
   - System checks if user is new or returning
   - New users are registered
   - Returning users are signed in

### File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context and provider
├── services/
│   └── authService.ts            # Authentication service with token management
├── components/
│   └── auth/
│       └── AuthModal.tsx         # Authentication modal component
└── types/
    └── index.ts                  # Type definitions including User and AuthContextValue
```

## API Reference

### AuthContext Methods

- `signIn()`: Initiates Google OAuth sign-in flow
- `signOut()`: Signs out the current user and clears all auth data
- `isAuthenticated`: Boolean indicating if user is authenticated
- `isLoading`: Boolean indicating if auth state is being checked
- `user`: Current user object (null if not authenticated)

### AuthService Functions

- `handleAuthSuccess(tokenResponse)`: Processes successful authentication
- `verifyAuthentication()`: Verifies current authentication state
- `clearAuthData()`: Clears all stored authentication data
- `isNewUser(userId)`: Checks if user is new
- `isTokenExpired()`: Checks if current token is expired
- `isSessionExpired()`: Checks if session has timed out

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Ensure Google Cloud Console configuration is correct
4. Review this documentation for common issues

## Next Steps

For production deployment:
1. Set up a backend API for token validation
2. Implement token refresh mechanism
3. Add user database for persistent user storage
4. Set up proper error logging and monitoring
5. Configure production environment variables
6. Set up CI/CD with secure secret management

