import AsyncStorage from "@react-native-async-storage/async-storage";

const PREMIUM_STATUS_KEY = "premium_status";
const VALID_REDEEM_CODE = "google@9422421316";

export interface PremiumStatus {
  isPremium: boolean;
  redeemedCode?: string;
  redeemedAt?: string;
}

// Get current premium status
export const getPremiumStatus = async (): Promise<PremiumStatus> => {
  try {
    const stored = await AsyncStorage.getItem(PREMIUM_STATUS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { isPremium: false };
  } catch (error) {
    console.error("Error getting premium status:", error);
    return { isPremium: false };
  }
};

// Set premium status
export const setPremiumStatus = async (
  status: PremiumStatus,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(PREMIUM_STATUS_KEY, JSON.stringify(status));
  } catch (error) {
    console.error("Error setting premium status:", error);
    throw error;
  }
};

// Redeem a code
export const redeemCode = async (
  code: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (code.trim() === VALID_REDEEM_CODE) {
      const premiumStatus: PremiumStatus = {
        isPremium: true,
        redeemedCode: code,
        redeemedAt: new Date().toISOString(),
      };
      
      await setPremiumStatus(premiumStatus);
      
      return {
        success: true,
        message: "Code redeemed successfully! You now have premium access.",
      };
    } else {
      return {
        success: false,
        message: "Invalid redeem code. Please check and try again.",
      };
    }
  } catch (error) {
    console.error("Error redeeming code:", error);
    return {
      success: false,
      message: "An error occurred while redeeming the code. Please try again.",
    };
  }
};

// Check if user can access a feature based on plan requirement
export const canAccessFeature = async (
  requiredPlan: "free" | "basic" | "premium",
): Promise<boolean> => {
  if (requiredPlan === "free") {
    return true;
  }
  
  const premiumStatus = await getPremiumStatus();
  
  // If user has premium, they can access everything
  if (premiumStatus.isPremium) {
    return true;
  }
  
  // For basic features, only allow if not premium required
  if (requiredPlan === "basic") {
    return false; // For now, treating basic as premium
  }
  
  return false;
};

// Reset premium status (for testing or logout)
export const resetPremiumStatus = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PREMIUM_STATUS_KEY);
  } catch (error) {
    console.error("Error resetting premium status:", error);
  }
};
