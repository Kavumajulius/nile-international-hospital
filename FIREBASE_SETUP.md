# Firebase Authentication Setup Guide

This guide provides comprehensive instructions for setting up Firebase Authentication with Google provider for the Dateline application.

## Overview

The authentication system uses **Firebase Authentication** with Google provider for secure user authentication. Firebase provides:
- Automatic token management and refresh
- Built-in security features
- Easy integration with other Firebase services
- Production-ready authentication

## Prerequisites

- A Google account
- Access to Firebase Console
- Node.js and npm installed

## Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Add project" or "Create a project"
   - Enter project name: `Dateline` (or your preferred name)
   - Click "Continue"
   - (Optional) Enable Google Analytics
   - Click "Create project"
   - Wait for project creation to complete
   - Click "Continue"

## Step 2: Enable Google Authentication

1. **Navigate to Authentication**
   - In the Firebase Console, click on "Authentication" in the left sidebar
   - Click "Get started" if this is your first time

2. **Enable Google Sign-In**
   - Click on the "Sign-in method" tab
   - Click on "Google" provider
   - Toggle "Enable" to ON
   - Enter your project support email
   - Click "Save"

## Step 3: Register Your Web App

1. **Add Web App**
   - In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
   - Click "Project settings"
   - Scroll down to "Your apps" section
   - Click the Web icon `</>`
   - Enter app nickname: `Dateline Web`
   - (Optional) Check "Also set up Firebase Hosting"
   - Click "Register app"

2. **Copy Firebase Configuration**
   - You'll see your Firebase configuration object
   - It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   - **Copy these values** - you'll need them in the next step

## Step 4: Configure Environment Variables

1. **Create `.env` file**
   - In the root of your project (`dateline-1/`), create a file named `.env`
   - **Important**: The `.env` file is already in `.gitignore` and will not be committed

2. **Add Firebase Configuration**
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

   Replace the placeholder values with your actual Firebase configuration values from Step 3.

3. **Optional: Add Database URL** (if using Realtime Database)
   ```env
   VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   ```

4. **Optional: Configure Session Timeout**
   ```env
   VITE_SESSION_TIMEOUT=3600  # Session timeout in seconds (default: 1 hour)
   ```

## Step 5: Install Firebase SDK

Install the Firebase SDK:

```bash
npm install firebase
```

## Step 6: Verify Installation

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Authentication**
   - Navigate to the landing page
   - Click "Sign up" or "Log in"
   - Click "Continue with Google"
   - You should be redirected to Google's sign-in page
   - After signing in, you should be authenticated and redirected to onboarding

## Security Best Practices

### Environment Variables
- ✅ **Never commit `.env` files to version control**
- ✅ **Use different Firebase projects for development and production**
- ✅ **Rotate API keys if they are ever exposed**
- ✅ **Use environment-specific `.env` files** (`.env.development`, `.env.production`)

### Firebase Security Rules
- ✅ Configure Firebase Security Rules for Firestore/Realtime Database
- ✅ Set up proper authentication rules
- ✅ Review and test security rules regularly

### Production Considerations
1. **Use HTTPS**: Always use HTTPS in production
2. **Authorized Domains**: Add your production domain in Firebase Console
   - Go to Authentication > Settings > Authorized domains
   - Add your production domain
3. **Rate Limiting**: Firebase handles rate limiting automatically
4. **Token Refresh**: Firebase automatically refreshes tokens

## Troubleshooting

### "Firebase configuration incomplete"
- Ensure `.env` file exists in the project root
- Verify all `VITE_FIREBASE_*` variables are set correctly
- Restart the development server after adding environment variables
- Check browser console for specific missing keys

### "Firebase: Error (auth/popup-closed-by-user)"
- User closed the sign-in popup
- This is normal behavior - user can try again

### "Firebase: Error (auth/popup-blocked)"
- Browser blocked the popup
- User needs to allow pop-ups for your domain
- Consider using redirect flow instead of popup

### "Firebase: Error (auth/unauthorized-domain)"
- Your domain is not authorized in Firebase Console
- Go to Authentication > Settings > Authorized domains
- Add your domain (e.g., `localhost` for development)

### "Firebase: Error (auth/network-request-failed)"
- Network connectivity issue
- Check internet connection
- Verify Firebase services are accessible

## Authorized Domains

Firebase requires you to authorize domains that can use authentication:

1. Go to Firebase Console
2. Navigate to **Authentication** > **Settings** > **Authorized domains**
3. Add your domains:
   - `localhost` (for development - usually already added)
   - Your production domain (e.g., `yourdomain.com`)

## Architecture

### Authentication Flow

1. **User clicks "Sign in" or "Sign up"**
   - Opens authentication modal
   - Both actions use the same Firebase Google Auth flow

2. **Firebase Google Authentication**
   - User clicks "Continue with Google"
   - Firebase opens Google sign-in popup
   - User grants permissions
   - Firebase returns authenticated user

3. **User Registration/Sign-In**
   - Firebase automatically handles user creation
   - System detects if user is new or returning
   - User data is stored locally
   - Session is started

4. **Session Management**
   - Session start time is recorded
   - Firebase handles token refresh automatically
   - Periodic validation ensures session is still valid

### File Structure

```
src/
├── config/
│   └── firebase.ts              # Firebase configuration and initialization
├── contexts/
│   └── AuthContext.tsx          # Authentication context using Firebase
├── services/
│   └── authService.ts           # Authentication service with Firebase Auth
├── components/
│   └── auth/
│       └── AuthModal.tsx        # Authentication modal component
└── types/
    └── index.ts                 # Type definitions
```

## API Reference

### AuthContext Methods

- `signIn()`: Initiates Firebase Google sign-in flow
- `signOut()`: Signs out the current user
- `isAuthenticated`: Boolean indicating if user is authenticated
- `isLoading`: Boolean indicating if auth state is being checked
- `isSigningIn`: Boolean indicating if sign-in is in progress
- `authError`: String with error message (if any)
- `user`: Current user object (null if not authenticated)

### AuthService Functions

- `signInWithGoogle()`: Signs in with Google via Firebase
- `signOut()`: Signs out via Firebase
- `verifyAuthentication()`: Verifies current authentication state
- `onAuthStateChange(callback)`: Sets up auth state observer
- `clearAuthData()`: Clears all stored authentication data
- `isNewUser(userId)`: Checks if user is new
- `isSessionExpired()`: Checks if session has timed out

## Migration from Google OAuth

If you were previously using `@react-oauth/google`, the migration to Firebase is complete. The API remains the same, but now uses Firebase Authentication under the hood.

**Removed dependency**: `@react-oauth/google` (can be removed if not used elsewhere)

**New dependency**: `firebase`

## Next Steps

For production deployment:
1. Set up Firebase Hosting (optional)
2. Configure Firestore/Realtime Database (if needed)
3. Set up Firebase Security Rules
4. Configure production environment variables
5. Add production domain to authorized domains
6. Set up monitoring and analytics

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Ensure Firebase project is configured correctly
4. Check Firebase Console for authentication logs
5. Review this documentation for common issues

