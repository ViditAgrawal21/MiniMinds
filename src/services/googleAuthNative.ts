import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  verified_email?: boolean;
  givenName?: string;
  familyName?: string;
}

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: '431774360335-juu55516hl18uu1of74b0bl4h7l5o7ma.apps.googleusercontent.com', // Web client ID from Google Cloud Console
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: '431774360335-juu55516hl18uu1of74b0bl4h7l5o7ma.apps.googleusercontent.com', // Using the same client ID for iOS
  scopes: ['profile', 'email'] // Request basic profile and email scope
});

export class GoogleAuthNative {
  private static instance: GoogleAuthNative;

  public static getInstance(): GoogleAuthNative {
    if (!GoogleAuthNative.instance) {
      GoogleAuthNative.instance = new GoogleAuthNative();
    }
    return GoogleAuthNative.instance;
  }

  // Sign in with Google
  public async signIn(): Promise<GoogleUser | null> {
    try {
      // Check if device has Google Play Services installed
      await GoogleSignin.hasPlayServices();
      
      // Sign in and get user info
      const signInResult = await GoogleSignin.signIn();
      
      // If no user info was returned, return null
      if (!signInResult) {
        return null;
      }
      
      // Safely extract properties using type assertion
      const userData = signInResult as any;
      
      // Convert to our GoogleUser format
      const googleUser: GoogleUser = {
        id: userData.user?.id || '',
        email: userData.user?.email || '',
        name: userData.user?.name || 
              `${String(userData.user?.givenName || '')} ${String(userData.user?.familyName || '')}`.trim() || 
              'Google User',
        picture: userData.user?.photo ? String(userData.user.photo) : undefined,
        givenName: userData.user?.givenName ? String(userData.user.givenName) : undefined,
        familyName: userData.user?.familyName ? String(userData.user.familyName) : undefined,
        verified_email: true // Assume verified since it's coming from Google
      };
      
      // Save user data
      await this.saveUserData(googleUser);
      
      return googleUser;
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      }
      
      throw error;
    }
  }

  // Check if user is currently signed in
  public async isSignedIn(): Promise<boolean> {
    try {
      // Type assertion to avoid TypeScript errors
      const googleSignin = GoogleSignin as any;
      if (typeof googleSignin.isSignedIn === 'function') {
        return await googleSignin.isSignedIn();
      }
      return false;
    } catch (error) {
      console.error('Error checking sign-in status:', error);
      return false;
    }
  }

  // Get current user info
  public async getCurrentUser(): Promise<GoogleUser | null> {
    try {
      const userInfoResult = await GoogleSignin.getCurrentUser();
      if (!userInfoResult) {
        return null;
      }
      
      // Safely extract properties using type assertion
      const userInfo = userInfoResult as any;
      
      return {
        id: userInfo.user?.id || '',
        email: userInfo.user?.email || '',
        name: userInfo.user?.name || 
              `${String(userInfo.user?.givenName || '')} ${String(userInfo.user?.familyName || '')}`.trim() || 
              'Google User',
        picture: userInfo.user?.photo ? String(userInfo.user.photo) : undefined,
        givenName: userInfo.user?.givenName ? String(userInfo.user.givenName) : undefined,
        familyName: userInfo.user?.familyName ? String(userInfo.user.familyName) : undefined,
        verified_email: true
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Sign out from Google
  public async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.multiRemove([
        'user_data',
        'is_authenticated',
        'auth_method',
      ]);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Save user data to AsyncStorage
  public async saveUserData(userData: GoogleUser): Promise<void> {
    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
      await AsyncStorage.setItem('is_authenticated', 'true');
      await AsyncStorage.setItem('auth_method', 'google');
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  // Get saved user data from AsyncStorage
  public async getSavedUserData(): Promise<GoogleUser | null> {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Check if user is authenticated from AsyncStorage
  public async isAuthenticated(): Promise<boolean> {
    try {
      const isAuth = await AsyncStorage.getItem('is_authenticated');
      return isAuth === 'true';
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }
}

export default GoogleAuthNative.getInstance();
