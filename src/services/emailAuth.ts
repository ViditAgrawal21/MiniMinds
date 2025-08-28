import AsyncStorage from '@react-native-async-storage/async-storage';

// Define interfaces for authentication
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  status?: string;
  userId?: string;
}

export interface RateLimitResponse {
  allowed: boolean;
  waitSeconds: number;
}

export class EmailAuthService {
  private static instance: EmailAuthService;
  private baseUrl: string = 'https://api.thoughtpro.app/auth'; // Replace with your actual API URL
  
  public static getInstance(): EmailAuthService {
    if (!EmailAuthService.instance) {
      EmailAuthService.instance = new EmailAuthService();
    }
    return EmailAuthService.instance;
  }
  
  // Login with email and password
  public async loginWithPassword(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { 
          success: false, 
          message: data.message || 'Login failed. Please check your credentials.' 
        };
      }
      
      if (data.token) {
        await this.storeToken(data.token);
        await AsyncStorage.setItem('user_email', email);
        await AsyncStorage.setItem('auth_method', 'email_password');
        await AsyncStorage.setItem('is_authenticated', 'true');
      }
      
      return { 
        success: true, 
        token: data.token,
        userId: data.userId 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Network error. Please check your connection and try again.' 
      };
    }
  }
  
  // Register new user with email (initiates OTP flow)
  public async initiateOtpForEmail(email: string, planType: string = 'free'): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, planType }),
      });
      
      const data = await response.json();
      
      return {
        success: response.ok,
        status: data.status, // 'registered' or 'existing'
        message: data.message
      };
    } catch (error) {
      console.error('OTP initialization error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }
  
  // Verify OTP code
  public async verifyOTP(email: string, code: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });
      
      const data = await response.json();
      
      if (data.token) {
        await this.storeToken(data.token);
        await AsyncStorage.setItem('user_email', email);
        await AsyncStorage.setItem('auth_method', 'email_otp');
        await AsyncStorage.setItem('is_authenticated', 'true');
      }
      
      return {
        success: response.ok,
        token: data.token,
        message: data.message
      };
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }
  
  // Resend OTP code
  public async resendOTP(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      return {
        success: response.ok,
        message: data.message
      };
    } catch (error) {
      console.error('Resend OTP error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }
  
  // Check rate limits for code requests
  public async canRequestCode(email: string): Promise<RateLimitResponse> {
    try {
      const lastRequest = await AsyncStorage.getItem(`last_otp_request_${email}`);
      
      if (!lastRequest) {
        return { allowed: true, waitSeconds: 0 };
      }
      
      const lastTimestamp = parseInt(lastRequest, 10);
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - lastTimestamp) / 1000);
      const cooldownPeriod = 60; // 1 minute cooldown
      
      if (elapsedSeconds < cooldownPeriod) {
        return { allowed: false, waitSeconds: cooldownPeriod - elapsedSeconds };
      }
      
      return { allowed: true, waitSeconds: 0 };
    } catch (error) {
      console.error('Rate limit check error:', error);
      return { allowed: true, waitSeconds: 0 }; // Default to allowing on error
    }
  }
  
  // Mark code as requested for rate limiting
  public async markCodeRequested(email: string): Promise<void> {
    try {
      await AsyncStorage.setItem(`last_otp_request_${email}`, Date.now().toString());
    } catch (error) {
      console.error('Error marking code requested:', error);
    }
  }
  
  // Store authentication token
  public async storeToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Error storing token:', error);
      throw error;
    }
  }
  
  // Get stored authentication token
  public async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }
  
  // Check if user is authenticated
  public async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      const isAuth = await AsyncStorage.getItem('is_authenticated');
      return !!token && isAuth === 'true';
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }
  
  // Complete verification and login
  public async finalizeVerificationLogin(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/finalize-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.token) {
        await this.storeToken(data.token);
        await AsyncStorage.setItem('user_email', email);
        await AsyncStorage.setItem('auth_method', 'email_verified');
        await AsyncStorage.setItem('is_authenticated', 'true');
      }
      
      return {
        success: response.ok,
        token: data.token,
        message: data.message
      };
    } catch (error) {
      console.error('Finalization error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }
  
  // Logout user
  public async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        'auth_token',
        'user_email',
        'auth_method',
        'is_authenticated'
      ]);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
  
  // Test network connection (for debugging)
  public async testNetworkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/ping`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Network test error:', error);
      return false;
    }
  }
}

export default EmailAuthService.getInstance();
