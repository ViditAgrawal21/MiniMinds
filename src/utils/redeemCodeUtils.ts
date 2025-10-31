import AsyncStorage from "@react-native-async-storage/async-storage";

const REDEEM_CODE_KEY = "@miniminds_redeem_code";
const VALID_REDEEM_CODES = ["98906", "27424"]; // Add more codes as needed

/**
 * Validate and store a redeem code
 * @param code - The redeem code to validate
 * @returns Promise<boolean> - True if code is valid and stored, false otherwise
 */
export const redeemCode = async (code: string): Promise<boolean> => {
  try {
    const trimmedCode = code.trim();
    
    if (VALID_REDEEM_CODES.includes(trimmedCode)) {
      const redeemData = {
        code: trimmedCode,
        redeemedAt: new Date().toISOString(),
        expiresAt: null, // null means lifetime access
      };
      
      await AsyncStorage.setItem(REDEEM_CODE_KEY, JSON.stringify(redeemData));
      console.log("✅ Redeem code activated successfully:", trimmedCode);
      return true;
    }
    
    console.log("❌ Invalid redeem code:", trimmedCode);
    return false;
  } catch (error) {
    console.error("Error redeeming code:", error);
    return false;
  }
};

/**
 * Check if user has an active redeem code
 * @returns Promise<boolean> - True if user has valid redeem code access
 */
export const hasActiveRedeemCode = async (): Promise<boolean> => {
  try {
    const storedData = await AsyncStorage.getItem(REDEEM_CODE_KEY);
    
    if (!storedData) {
      return false;
    }
    
    const redeemData = JSON.parse(storedData);
    
    // Check if code has expiration
    if (redeemData.expiresAt) {
      const expirationDate = new Date(redeemData.expiresAt);
      const now = new Date();
      
      if (now > expirationDate) {
        // Code has expired, remove it
        await AsyncStorage.removeItem(REDEEM_CODE_KEY);
        console.log("⏰ Redeem code has expired");
        return false;
      }
    }
    
    // Code is valid and not expired
    console.log("✅ Active redeem code found:", redeemData.code);
    return true;
  } catch (error) {
    console.error("Error checking redeem code:", error);
    return false;
  }
};

/**
 * Get redeem code details
 * @returns Promise<object | null> - Redeem code data or null
 */
export const getRedeemCodeDetails = async () => {
  try {
    const storedData = await AsyncStorage.getItem(REDEEM_CODE_KEY);
    
    if (!storedData) {
      return null;
    }
    
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Error getting redeem code details:", error);
    return null;
  }
};

/**
 * Remove/deactivate redeem code
 * @returns Promise<boolean> - True if successfully removed
 */
export const removeRedeemCode = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(REDEEM_CODE_KEY);
    console.log("🗑️ Redeem code removed");
    return true;
  } catch (error) {
    console.error("Error removing redeem code:", error);
    return false;
  }
};

/**
 * Check if a specific code is valid (without storing it)
 * @param code - The code to validate
 * @returns boolean - True if code is in valid codes list
 */
export const isValidRedeemCode = (code: string): boolean => {
  return VALID_REDEEM_CODES.includes(code.trim());
};
