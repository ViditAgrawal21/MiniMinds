import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://booking-system-468212.el.r.appspot.com";
const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";
const TEMP_PW_PREFIX = "reg_pw:"; // store generated registration password per email

// Add network diagnostics helper
export const testNetworkConnection = async (): Promise<void> => {
  console.log("🔍 Testing network connection...");
  
  try {
    // Test basic connectivity
    const basicController = new AbortController();
    const basicTimeout = setTimeout(() => basicController.abort(), 5000);
    const testResponse = await fetch("https://httpbin.org/get", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: basicController.signal,
    });
    clearTimeout(basicTimeout);
    console.log("✅ Basic internet connectivity:", testResponse.status);
  } catch (error) {
    console.log("❌ No internet connectivity:", error);
  }

  try {
    // Test your API specifically
    const apiController = new AbortController();
    const apiTimeout = setTimeout(() => apiController.abort(), 5000);
    const apiResponse = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: "test", password: "test" }), // Invalid but should get response
      signal: apiController.signal,
    });
    clearTimeout(apiTimeout);
    console.log("✅ API endpoint reachable:", apiResponse.status);
  } catch (error) {
    console.log("❌ API not reachable:", error);
  }
};

export interface User {
  // Backend currently returns numeric id; keep backward compatibility with string usage
  id: string | number;
  email: string;
  username: string;
  role: string;
  is_verified: boolean;
  // Allow unknown extra fields without breaking (e.g., created_at, updated_at, pending_psychologist_code)
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ApiResponse {
  message: string;
  success?: boolean;
  error?: string;
  token?: string; // (Not returned by current verify endpoint per docs; kept for forward compatibility)
  userId?: string; // For registration response (backend may not supply; optional)
}

export interface LoginResponse {
  token: string;
  user: User;
}

export class AuthService {
  // Register a new user
  static async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<ApiResponse> {
    // Ensure we POST to the correct registration endpoints first to avoid slow failing attempts
    const endpoints = [
      `${BASE_URL}/api/users/register`,
      `${BASE_URL}/api/register`,
      // last resort: login is NOT a registration endpoint; keep only as defensive fallback
      `${BASE_URL}/api/users/login`,
    ];

    const payload = JSON.stringify({
      username,
      email,
      password,
      role: "user",
    });

    for (let i = 0; i < endpoints.length; i += 1) {
      const url = endpoints[i];
      try {
  const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        });

        let data: any = {};
        try {
          data = await response.json();
        } catch {
          // Non-JSON response; ignore, we'll synthesize below
        }

  if (!response.ok) {
          const errMsg =
            data.error || data.message || `HTTP ${response.status}`;
          // Existing user detection (409 conflict or common phrases)
          if (response.status === 409 || /already|taken|exist/i.test(errMsg)) {
            return {
              success: false,
              message: errMsg,
              error: errMsg,
            };
          }
          // 404 fallback only
          if (response.status === 404 && i < endpoints.length - 1) {
            console.warn(`Register endpoint 404 at ${url}, trying fallback...`);
            continue;
          }
          throw new Error(errMsg);
        }

        return {
          success: true,
          message: data.message || "User registered. OTP sent.",
          userId: data.userId,
        };
      } catch (error) {
        if (__DEV__) {
          console.error("Registration error (attempt", i + 1, url, "):", error);
        }
        if (i === endpoints.length - 1) {
          return {
            success: false,
            error:
              error instanceof Error ? error.message : "Registration failed",
            message:
              error instanceof Error ? error.message : "Registration failed",
          };
        }
      }
    }

    return {
      success: false,
      error: "Registration failed",
      message: "Registration failed",
    };
  }

  // Verify (email) verification code (endpoint path still uses /otp/verify on backend)
  static async verifyOTP(email: string, code: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp_code: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "OTP verification failed");
      }

      return {
        success: true,
        message: data.message,
        token: data.token, // May be undefined (docs show only message)
      };
    } catch (error) {
      console.error("OTP verification error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "OTP verification failed",
        message: "OTP verification failed",
      };
    }
  }

  // Store auth token
  static async storeToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  }

  // Login user (expects server response possibly nested: { success, message, data: { token, user } })
  static async loginUser(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    if (__DEV__) {
      console.log("🔐 Attempting login for:", email);
      console.log("🌐 API URL:", `${BASE_URL}/api/users/login`);
    }
    
    try {
      const requestBody = { email, password };
      if (__DEV__) {
        console.log("📤 Request body:", JSON.stringify(requestBody));
      }
      
      // Add timeout and additional headers for better Android compatibility
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // Increase to 30s for initial debugging
      
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "ThoughtHealer-Mobile/1.0",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (__DEV__) {
        console.log("📡 Response status:", response.status);
        console.log(
          "📡 Response headers:",
          Object.fromEntries(response.headers.entries()),
        );
      }

      let raw: any; // eslint-disable-line @typescript-eslint/no-explicit-any
      try {
        raw = await response.json();
        if (__DEV__) {
          console.log("📥 Response data:", JSON.stringify(raw));
        }
      } catch (jsonError) {
        if (__DEV__) {
          console.log("❌ Failed to parse JSON response:", jsonError);
        }
        const textResponse = await response.text();
        if (__DEV__) {
          console.log("📥 Raw response text:", textResponse);
        }
        raw = {};
      }

      if (!response.ok) {
        const errMsg =
          raw?.error ||
          raw?.message ||
          `Login failed (HTTP ${response.status})`;
        if (__DEV__) {
          console.log("❌ Login failed with error:", errMsg);
          console.log("📄 Full error response:", JSON.stringify(raw));
        }
        throw new Error(errMsg);
      }

      if (__DEV__) {
        console.log("🎯 Successful response received");
      }

      // Support both legacy flat shape and new nested shape
      const token = raw?.data?.token || raw?.token;
      const user = raw?.data?.user || raw?.user;

      if (__DEV__) {
        console.log("🔍 Extracted token:", token ? "Present" : "Missing");
        console.log("🔍 Extracted user:", user ? "Present" : "Missing");
      }

      if (!token || !user) {
        if (__DEV__) {
          console.log("❌ Missing token or user in response");
        }
        throw new Error("Malformed login response: missing token or user");
      }

      // Normalize id to string for consistency in rest of app if needed
      const normalizedUser: User = {
        ...user,
        id: user.id, // keep original but consumer can treat as string | number
      };

      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(normalizedUser));

      if (__DEV__) {
        console.log("✅ Login successful, token stored");
      }
      return { token, user: normalizedUser };
    } catch (error) {
      if (__DEV__) {
        console.error("❌ Login error details:", {
          error: error instanceof Error ? error.message : error,
          stack: error instanceof Error ? error.stack : undefined,
          name: error instanceof Error ? error.name : undefined,
        });
      }
      
      // Handle specific network errors with user-friendly messages
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error(
            "Network timeout - please check your internet connection and try again",
          );
        }
        if (error.message.includes("Network request failed")) {
          throw new Error(
            "Unable to connect to server - please check your network settings",
          );
        }
      }
      
      throw error;
    }
  }

  // Get stored token
  static async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error("Error getting stored token:", error);
      return null;
    }
  }

  // Get stored user data
  static async getStoredUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting stored user:", error);
      return null;
    }
  }

  // Check if user is authenticated
  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    if (!token) return false;

    // Basic JWT expiry check with polyfill for atob
    try {
      // Use polyfill for React Native environments that don't have atob
      const base64Decode = (str: string) => {
        try {
          // Native atob if available
          if (typeof atob !== "undefined") {
            return atob(str);
          }
          // Manual base64 decode fallback
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          let result = "";
          let i = 0;

          str = str.replace(/[^A-Za-z0-9+/]/g, "");

          while (i < str.length) {
            const encoded1 = chars.indexOf(str.charAt(i++));
            const encoded2 = chars.indexOf(str.charAt(i++));
            const encoded3 = chars.indexOf(str.charAt(i++));
            const encoded4 = chars.indexOf(str.charAt(i++));

            const bitmap =
              (encoded1 << 18) | (encoded2 << 12) | (encoded3 << 6) | encoded4;

            result += String.fromCharCode((bitmap >> 16) & 255);
            if (encoded3 !== 64) {
              result += String.fromCharCode((bitmap >> 8) & 255);
            }
            if (encoded4 !== 64) result += String.fromCharCode(bitmap & 255);
          }
          return result;
        } catch {
          throw new Error("Invalid base64");
        }
      };

      const parts = token.split(".");
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(base64Decode(parts[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  // Clear authentication data
  static async clearAuth(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.error("Error clearing auth:", error);
    }
  }

  // Resend OTP
  static async resendOTP(email: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/otp/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          // Endpoint not implemented on backend; treat as graceful unsupported feature
          return {
            success: false,
            error: "not_found",
            message: "Resend not supported on server",
          };
        }
        throw new Error(data.error || "Failed to resend OTP");
      }

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      if (
        error instanceof Error &&
        /not supported|not_found|404/i.test(error.message)
      ) {
        // Suppress noisy logging for unsupported endpoint
      } else {
        console.error("Resend OTP error:", error);
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to resend OTP",
        message: "Failed to resend OTP",
      };
    }
  }

  // For email assumption - create a temporary user session
  static async createTempUserSession(email: string): Promise<void> {
    try {
      const tempUser: User = {
        id: `temp_${Date.now()}`,
        email,
        username: email.split("@")[0],
        role: "user",
        is_verified: false,
      };
      
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(tempUser));
    } catch (error) {
      console.error("Error creating temp user session:", error);
    }
  }
}

// Standalone function exports for easy importing
export interface InitiateOtpResult {
  success: boolean;
  status?: "registered" | "existing";
  userId?: string;
  message?: string;
  existingUser?: boolean; // convenience flag
}

// Unified helper: attempt registration, fallback to resend OTP for existing users
export const initiateOtpForEmail = async (
  email: string,
  planType?: string,
): Promise<InitiateOtpResult> => {
  try {
    const reg = await registerUser(email, planType || "plan");
    if (reg.success) {
      return {
        success: true,
        status: "registered",
        userId: reg.userId,
        message: reg.message || "Verification code sent to your email.",
      };
    }
    const errText = `${reg.error || ""} ${reg.message || ""}`.toLowerCase();
    if (
      /already/.test(errText) ||
      /exist/.test(errText) ||
      /409/.test(errText)
    ) {
      // Existing user; per API a new code is not (re)sent via registration. Caller should switch to password login.
      return {
        success: true,
        status: "existing",
        existingUser: true,
        message: "Account already exists. Please sign in with your password.",
      };
    }
    return {
      success: false,
      message: reg.message || "Failed to start verification flow",
    };
  } catch (e) {
    console.error("initiateOtpForEmail error", e);
    return {
      success: false,
      message: "Unexpected error starting verification flow",
    };
  }
};

// Store and retrieve the generated registration password (needed after verification to log in)
const storeTempPassword = async (email: string, password: string) => {
  try {
    await AsyncStorage.setItem(
      `${TEMP_PW_PREFIX}${email.toLowerCase()}`,
      password,
    );
  } catch (e) {
    console.warn("Failed to persist temp password", e);
  }
};

export const getTempPasswordForEmail = async (email: string) => {
  try {
    return (
      (await AsyncStorage.getItem(`${TEMP_PW_PREFIX}${email.toLowerCase()}`)) ||
      null
    );
  } catch {
    return null;
  }
};

export const registerUser = async (email: string, planType: string) => {
  const username = email.split("@")[0];
  const password = `${planType}_${Date.now()}`; // Temporary password (not shown to user)
  const res = await AuthService.registerUser(username, email, password);
  if (res.success) {
    await storeTempPassword(email, password);
  }
  return res;
};

// After verification, perform login using stored temp password (if present)
export const finalizeVerificationLogin = async (email: string) => {
  const tempPw = await getTempPasswordForEmail(email);
  if (!tempPw) {
    return {
      success: false,
      message: "No registration password stored. Please sign in manually.",
    };
  }
  try {
    const login = await AuthService.loginUser(email, tempPw);
    return { success: true, token: login.token };
  } catch {
    return {
      success: false,
      message: "Automatic sign-in failed. Please sign in with your password.",
    };
  }
};

export const verifyOTP = (email: string, otp: string) =>
  AuthService.verifyOTP(email, otp);

export const resendOTP = async (email: string) => {
  return AuthService.resendOTP(email);
};

export const storeToken = (token: string) => AuthService.storeToken(token);

export const loginUser = (email: string, password: string) =>
  AuthService.loginUser(email, password);

export const getCurrentUser = () => AuthService.getStoredUser();

export const logout = () => AuthService.clearAuth();

export const createTempUserSession = (email: string) =>
  AuthService.createTempUserSession(email);