import AsyncStorage from "@react-native-async-storage/async-storage";

// Rate limiting helper for verification code requests
// Prevents users from requesting too many codes in a short time

// Constants
const CODE_REQUEST_KEY_PREFIX = 'code_request_';
const MIN_REQUEST_INTERVAL_SEC = 60; // 60 seconds between requests

/**
 * Checks if the user can request a new verification code
 * @param {string} email - User's email address
 * @returns {Promise<{allowed: boolean, waitSeconds: number}>} Object indicating if request is allowed
 */
export const canRequestCode = async (email) => {
  if (!email) return { allowed: false, waitSeconds: MIN_REQUEST_INTERVAL_SEC };
  
  try {
    const key = `${CODE_REQUEST_KEY_PREFIX}${email.toLowerCase().trim()}`;
    const lastRequestTime = await AsyncStorage.getItem(key);
    
    if (!lastRequestTime) {
      return { allowed: true, waitSeconds: 0 };
    }
    
    const now = Date.now();
    const elapsed = (now - parseInt(lastRequestTime)) / 1000; // seconds
    
    if (elapsed >= MIN_REQUEST_INTERVAL_SEC) {
      return { allowed: true, waitSeconds: 0 };
    } else {
      const remaining = Math.ceil(MIN_REQUEST_INTERVAL_SEC - elapsed);
      return { allowed: false, waitSeconds: remaining };
    }
  } catch (error) {
    console.error("Rate limit check error:", error);
    // If we can't check the rate limit, allow the request to proceed
    return { allowed: true, waitSeconds: 0 };
  }
};

/**
 * Marks that a code has been requested for an email
 * @param {string} email - User's email address
 * @returns {Promise<boolean>} Whether the operation succeeded
 */
export const markCodeRequested = async (email) => {
  if (!email) return false;
  
  try {
    const key = `${CODE_REQUEST_KEY_PREFIX}${email.toLowerCase().trim()}`;
    await AsyncStorage.setItem(key, Date.now().toString());
    return true;
  } catch (error) {
    console.error("Rate limit marking error:", error);
    return false;
  }
};
