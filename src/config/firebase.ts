/**
 * Firebase Configuration
 * Initialize Firebase app and authentication
 */
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate that all required config values are present
const requiredConfigKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'messagingSenderId',
  'appId',
] as const;

const missingKeys = requiredConfigKeys.filter(
  (key) => !firebaseConfig[key]
);

if (missingKeys.length > 0) {
  console.warn(
    `Firebase configuration incomplete. Missing: ${missingKeys.join(', ')}`
  );
  console.warn(
    'Please set the following environment variables in your .env file:'
  );
  missingKeys.forEach((key) => {
    console.warn(`  VITE_FIREBASE_${key.toUpperCase().replace(/([A-Z])/g, '_$1')}`);
  });
}

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Authentication
export const auth: Auth = getAuth(app);

// Configure Google Auth Provider
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account', // Force account selection
});

// Export the Firebase app instance
export default app;

