import AsyncStorage from "@react-native-async-storage/async-storage";

// API endpoints - replace with your actual backend URLs
const API_BASE = "https://your-backend-api.com/api";

// Store auth token in AsyncStorage
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('auth_token', token);
    await AsyncStorage.setItem('is_authenticated', 'true');
    return true;
  } catch (e) {
    console.error("Error storing token:", e);
    return false;
  }
};

// Initiate OTP verification for email
export const initiateOtpForEmail = async (email, planType = 'free') => {
  try {
    // In a real implementation, this would call your backend API
    // For now, simulate a successful response with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock API response
    return {
      success: true,
      status: "registered",
      message: "Verification code sent successfully"
    };
  } catch (error) {
    console.error("OTP initiation error:", error);
    return {
      success: false,
      message: error.message || "Failed to send verification code"
    };
  }
};

// Verify OTP code
export const verifyOTP = async (email, otp) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes - always succeed if OTP is 123456
    const isValid = otp === "123456";
    
    if (isValid) {
      // Mock successful verification with token
      return {
        success: true,
        token: "mock_auth_token_" + Date.now(),
        message: "Email verified successfully"
      };
    } else {
      return {
        success: false,
        message: "Invalid verification code"
      };
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return {
      success: false,
      message: error.message || "Verification failed"
    };
  }
};

// Resend OTP
export const resendOTP = async (email) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    return {
      success: true,
      message: "Verification code resent successfully"
    };
  } catch (error) {
    console.error("Resend OTP error:", error);
    return {
      success: false,
      message: error.message || "Failed to resend code"
    };
  }
};

// Complete login after OTP verification
export const finalizeVerificationLogin = async (email) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock response
    return {
      success: true,
      token: "mock_auth_token_finalized_" + Date.now(),
      message: "Login successful"
    };
  } catch (error) {
    console.error("Login finalization error:", error);
    return {
      success: false,
      message: error.message || "Failed to complete login"
    };
  }
};

// Login with email and password
export const loginUser = async (email, password) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // For demo: accept any password longer than 5 chars
    if (password.length >= 6) {
      return {
        success: true,
        token: "mock_password_auth_token_" + Date.now(),
        message: "Login successful"
      };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Test network connection - for diagnostics
export const testNetworkConnection = async () => {
  try {
    const start = Date.now();
    const response = await fetch('https://www.google.com', { method: 'HEAD' });
    const latency = Date.now() - start;
    
    return {
      connected: response.ok,
      latency: latency
    };
  } catch (error) {
    console.error("Network test failed:", error);
    return {
      connected: false,
      error: error.message
    };
  }
};
