import { AuthService } from "@/services/authService";
import { LicenseService } from "@/services/licenseService";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthService } from "../services/authService";
// import { LicenseService } from "../services/licenseService";

const PREMIUM_STATUS_KEY = "premium_status";

// Hardcoded legacy redeem codes (temporary / fallback until server validation)
const LEGACY_PREMIUM_CODE = "google@9422421316"; // Premium tier legacy code
const LEGACY_ULTRA_CODE = "google@8308936941"; // Ultra tier legacy code

// Plan types
export type PlanType =
  | "premium_monthly"
  | "premium_yearly"
  | "ultra_monthly"
  | "ultra_yearly"
  | "legacy"; // For existing users with old code

// Premium status interface
export interface PremiumStatus {
  isPremium: boolean;
  type?: PlanType | null; // legacy field, keep for compatibility
  features?: string[];
  source?: "legacy" | "api" | "none" | "local";
  expiryDate?: string; // legacy field
  planType?: PlanType;
  redeemedCode?: string;
  redeemedAt?: string;
  validUntil?: string;
  isLegacy?: boolean;
  // Tier flags
  hasPremiumTier?: boolean; // true for premium_* | legacy | ultra_*
  hasUltraTier?: boolean; // true for ultra_*
}

// Plan feature mapping
export const PLAN_FEATURES: Record<PlanType, string[]> = {
  premium_monthly: [
    "premium_scans",
    "primary_secondary_interventions",
    "video_content",
  ],
  premium_yearly: [
    "premium_scans",
    "primary_secondary_interventions",
    "video_content",
  ],
  ultra_monthly: [
    "unlimited_scans",
    "all_interventions",
    "professional_sessions",
    "video_content",
  ],
  ultra_yearly: [
    "unlimited_scans",
    "all_interventions",
    "professional_sessions",
    "video_content",
  ],
  legacy: [
    // Legacy users get premium-like features
    "premium_scans",
    "primary_secondary_interventions",
    "video_content",
  ],
};

// Helpers -------------------------------------------------------------
const isExpired = (iso?: string): boolean => {
  if (!iso) return false;
  try {
    return new Date(iso).getTime() < Date.now();
  } catch {
    return false;
  }
};

const monthsBetween = (start: Date, end: Date): number =>
  (end.getFullYear() - start.getFullYear()) * 12 +
  (end.getMonth() - start.getMonth());

const inferCycle = (
  tier: "premium" | "ultra",
  validUntil?: string,
): PlanType => {
  if (validUntil) {
    const end = new Date(validUntil);
    const now = new Date();
    if (monthsBetween(now, end) >= 10) return (tier + "_yearly") as PlanType;
  }
  return (tier + "_monthly") as PlanType;
};

// Public API ----------------------------------------------------------
export const getPremiumStatus = async (): Promise<PremiumStatus> => {
  try {
    // Backward compatibility (legacy flag)
    const legacyFlag = await AsyncStorage.getItem("isPremium");
    if (legacyFlag === "true") {
      return {
        isPremium: true,
        type: "legacy",
        features: PLAN_FEATURES.legacy,
        source: "legacy",
        hasPremiumTier: true,
        hasUltraTier: false,
      };
    }

    const raw = await AsyncStorage.getItem(PREMIUM_STATUS_KEY);
    if (!raw) {
      return {
        isPremium: false,
        type: null,
        features: [],
        source: "none",
        hasPremiumTier: false,
        hasUltraTier: false,
      };
    }

    const status = JSON.parse(raw) as PremiumStatus;
    const plan = status.planType || status.type || null;

    // Expiry check
    if (isExpired(status.validUntil)) {
      return {
        ...status,
        isPremium: false,
        hasPremiumTier: false,
        hasUltraTier: false,
      };
    }

    const hasUltra = plan === "ultra_monthly" || plan === "ultra_yearly";
    const hasPremium =
      hasUltra ||
      plan === "premium_monthly" ||
      plan === "premium_yearly" ||
      plan === "legacy";

    return {
      ...status,
      hasPremiumTier: hasPremium,
      hasUltraTier: hasUltra,
      isPremium: hasPremium,
      features: plan ? PLAN_FEATURES[plan as PlanType] : status.features || [],
    };
  } catch (e) {
    console.error("getPremiumStatus error:", e);
    return {
      isPremium: false,
      type: null,
      features: [],
      source: "none",
      hasPremiumTier: false,
      hasUltraTier: false,
    };
  }
};

export const setPremiumStatus = async (
  status: PremiumStatus,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(PREMIUM_STATUS_KEY, JSON.stringify(status));
  } catch (e) {
    console.error("setPremiumStatus error:", e);
    throw e;
  }
};

// Helper function to create premium status from license data (for sign-in activation)
export const createPremiumStatusFromLicense = (licenseData: {
  licenseType?: string;
  validUntil?: string;
  redeemedTime?: string;
  daysRemaining?: number;
}): PremiumStatus => {
  console.log("🏗️ Creating premium status from license data:", licenseData);
  
  // Determine plan type from license type
  const planType: PlanType =
    licenseData.licenseType === "ultra" ? "ultra_monthly" : "premium_monthly";

  const status: PremiumStatus = {
    isPremium: true,
    planType,
    features: PLAN_FEATURES[planType],
    redeemedAt: licenseData.redeemedTime || new Date().toISOString(),
    validUntil: licenseData.validUntil || calculateExpiryDate(planType),
    isLegacy: false,
    source: "api",
    hasPremiumTier: true,
    hasUltraTier: licenseData.licenseType === "ultra",
  };

  console.log("✅ Created premium status:", {
    planType: status.planType,
    validUntil: status.validUntil,
    hasUltraTier: status.hasUltraTier,
  });

  return status;
};

// Calculate expiry date based on plan key
const calculateExpiryDate = (planType: PlanType): string => {
  const now = new Date();
  switch (planType) {
    case "premium_monthly":
    case "ultra_monthly":
      now.setMonth(now.getMonth() + 1);
      break;
    case "premium_yearly":
    case "ultra_yearly":
      now.setFullYear(now.getFullYear() + 1);
      break;
    default:
      now.setFullYear(now.getFullYear() + 1);
  }
  return now.toISOString();
};

// Infer PlanType from a code string (very conservative)
const determinePlanTypeFromCode = (code: string): PlanType | null => {
  const upper = code.toUpperCase();
  if (upper.includes("ULTRA") && upper.includes("YEAR")) return "ultra_yearly";
  if (upper.includes("ULTRA") && upper.includes("MONTH")) {
    return "ultra_monthly";
  }
  if (upper.includes("PREM") && upper.includes("YEAR")) return "premium_yearly";
  if (upper.includes("PREM") && upper.includes("MONTH")) {
    return "premium_monthly";
  }
  return null;
};

// Redeem via backend API
const redeemCodeViaAPI = async (
  licenseCode: string,
): Promise<{ success: boolean; message: string; errorCode?: string }> => {
  console.log(
    "🌐 API redemption started for code:",
    licenseCode.substring(0, 4) + "***",
  );
  
  const token = await AuthService.getStoredToken();
  if (!token) {
    console.log("❌ API redemption failed: No authentication token");
    return {
      success: false,
      message: "Please log in to redeem a code.",
      errorCode: "NO_TOKEN",
    };
  }

  console.log("✅ Token available, calling LicenseService.redeemLicense");
  try {
    const res = await LicenseService.redeemLicense(licenseCode, token);
    console.log("📡 API response:", {
      success: res?.success,
      message: res?.message,
      hasData: !!res?.data,
      error: res?.error,
    });

    if (!res?.success) {
      console.log("❌ API redemption failed:", res?.message || "Unknown error");
      return {
        success: false,
        message: res?.message || "License redemption failed",
        errorCode: res?.error || "API_ERROR",
      };
    }

    console.log("✅ API redemption successful, processing license data");
    const data = res.data || ({} as any);
    let validUntil: string | undefined = (data as any).valid_until;
    const rawPlan: unknown =
      (data as any).plan_type ??
      (data as any).plan ??
      (data as any).license_type;
    const apiPlan =
      typeof rawPlan === "string" ? rawPlan.toLowerCase().trim() : null;
    const features: string[] = Array.isArray((data as any).features)
      ? ((data as any).features as string[])
      : [];

    // Fallback: compute validUntil from validity_days if provided
    if (!validUntil && typeof (data as any).validity_days === "number") {
      const days = (data as any).validity_days as number;
      const dt = new Date();
      dt.setDate(dt.getDate() + Math.max(0, days));
      validUntil = dt.toISOString();
    }

    let planType: PlanType | null = null;
    if (apiPlan) {
      if (apiPlan.includes("ultra") && apiPlan.includes("year")) {
        planType = "ultra_yearly";
      } else if (apiPlan.includes("ultra") && apiPlan.includes("month")) {
        planType = "ultra_monthly";
      } else if (apiPlan.includes("ultra")) {
        planType = inferCycle("ultra", validUntil);
      } else if (apiPlan.includes("premium") && apiPlan.includes("year")) {
        planType = "premium_yearly";
      } else if (apiPlan.includes("premium") && apiPlan.includes("month")) {
        planType = "premium_monthly";
      } else if (apiPlan.includes("premium")) {
        planType = inferCycle("premium", validUntil);
      } else if (apiPlan.includes("legacy")) {
        planType = "legacy";
      }
    }

    if (!planType && features.length) {
      const feats = features.map((f) => f.toLowerCase());
      const isUltra =
        feats.includes("unlimited_scans") ||
        feats.includes("professional_sessions") ||
        feats.includes("all_interventions");
      if (isUltra) {
        planType = inferCycle("ultra", validUntil);
      } else {
        planType = inferCycle("premium", validUntil);
      }
    }

    if (!planType) planType = inferCycle("premium", validUntil);

    const status: PremiumStatus = {
      isPremium: true,
      planType,
      features: PLAN_FEATURES[planType],
      redeemedCode: licenseCode,
      redeemedAt: new Date().toISOString(),
      validUntil: validUntil || calculateExpiryDate(planType),
      isLegacy: false,
      source: "api",
      hasPremiumTier:
        planType.startsWith("premium") ||
        planType.startsWith("ultra") ||
        planType === "legacy",
      hasUltraTier: planType.startsWith("ultra"),
    };

    console.log("💾 Saving premium status:", {
      planType: status.planType,
      validUntil: status.validUntil,
      hasPremiumTier: status.hasPremiumTier,
      hasUltraTier: status.hasUltraTier,
    });
    await setPremiumStatus(status);
    
    console.log("🎉 API redemption completed successfully");
    return { success: true, message: res.message || "Plan activated" };
  } catch (e) {
    console.error("💥 redeemCodeViaAPI error:", e);
    return {
      success: false,
      message: "License redemption failed",
      errorCode: "NETWORK_ERROR",
    };
  }
};

// Main redeem function (keeps legacy behavior but prioritizes API)
export const redeemCode = async (
  code: string,
): Promise<{ success: boolean; message: string }> => {
  console.log("🚀 Main redeemCode function started");
  try {
    const trimmed = code.trim();
    console.log(
      "🔍 Checking redemption method for code:",
      trimmed.substring(0, 4) + "***",
    );

    // 1) Legacy hardcoded codes
    if (trimmed === LEGACY_PREMIUM_CODE || trimmed === LEGACY_ULTRA_CODE) {
      console.log("🏛️ Legacy hardcoded code detected");
      const isUltra = trimmed === LEGACY_ULTRA_CODE;
      console.log("📊 Legacy code type:", isUltra ? "Ultra" : "Premium");
      
      const plan = isUltra ? "ultra_monthly" : "legacy";
      const status: PremiumStatus = {
        isPremium: true,
        planType: plan,
        features: PLAN_FEATURES[plan],
        redeemedCode: code,
        redeemedAt: new Date().toISOString(),
        isLegacy: !isUltra,
        hasPremiumTier: true,
        hasUltraTier: isUltra,
        validUntil: calculateExpiryDate(
          isUltra ? "ultra_monthly" : "premium_monthly",
        ),
      };
      
      console.log("💾 Saving legacy premium status");
      await setPremiumStatus(status);
      const message = isUltra ? "Ultra activated" : "Premium activated";
      console.log("✅ Legacy redemption successful:", message);
      return { success: true, message };
    }

    // 2) API-first redemption (CRITICAL FIX: No fallback after API failure)
    console.log("🌐 Attempting API-based redemption");
    const api = await redeemCodeViaAPI(trimmed);
    
    // If API call succeeded, return result
    if (api.success) {
      console.log("✅ API redemption successful");
      return api;
    }
    
    console.log("❌ API redemption failed, checking error type");
    // If API call failed with specific known errors, return the error without fallback
    if (
      api.errorCode &&
      ["API_ERROR", "NETWORK_ERROR", "NO_TOKEN"].includes(api.errorCode)
    ) {
      console.log(
        "🚫 API redemption failed with known error:",
        api.errorCode,
        "-",
        api.message,
      );
      console.log("🔒 Blocking fallback due to API error");
      return { success: false, message: api.message };
    }

    // 3) Conservative local inference ONLY for completely offline/unknown codes
    // This should only run if the API is completely unreachable
    console.log("🔍 Attempting local inference as last resort");
    const inferred = determinePlanTypeFromCode(trimmed);
    
    if (inferred) {
      // Additional safety check: Only in development mode
      const isDev = typeof __DEV__ !== "undefined" ? __DEV__ : false;
      console.log("🏗️ Development mode check:", isDev);
      
      if (!isDev) {
        console.log("🚫 Production mode: Blocking local inference");
        return {
          success: false,
          message:
            "License validation required. Please check your network connection.",
        };
      }

      console.warn("⚠️ Using local inference in dev mode for code:", trimmed);
      const status: PremiumStatus = {
        isPremium: true,
        planType: inferred,
        features: PLAN_FEATURES[inferred],
        redeemedCode: code,
        redeemedAt: new Date().toISOString(),
        validUntil: calculateExpiryDate(inferred),
        isLegacy: false,
        hasPremiumTier:
          inferred.startsWith("premium") || inferred.startsWith("ultra"),
        hasUltraTier: inferred.startsWith("ultra"),
      };
      console.log("💾 Saving inferred premium status");
      await setPremiumStatus(status);
      const message = `${inferred.replace("_", " ")} activated (dev)`;
      console.log("✅ Local inference successful:", message);
      return { success: true, message };
    }

    // 4) Final fallback - ONLY in development and only for testing
    const isDev = typeof __DEV__ !== "undefined" ? __DEV__ : false;
    if (isDev && trimmed.length >= 8) {
      console.warn("⚠️ Using dev fallback for testing code:", trimmed);
      const status: PremiumStatus = {
        isPremium: true,
        planType: "premium_monthly",
        features: PLAN_FEATURES.premium_monthly,
        redeemedCode: code,
        redeemedAt: new Date().toISOString(),
        validUntil: calculateExpiryDate("premium_monthly"),
        isLegacy: false,
        source: "local",
        hasPremiumTier: true,
        hasUltraTier: false,
      };
      
      console.log("💾 Saving dev fallback status");
      await setPremiumStatus(status);
      console.log("✅ Dev fallback redemption successful");
      return { success: true, message: "Premium activated (dev)" };
    }

    console.log("❌ All redemption methods failed");
    return { success: false, message: "Invalid or unrecognized code" };
  } catch (e) {
    console.error("💥 redeemCode error:", e);
    return { success: false, message: "Failed to redeem code" };
  }
};

// Access helpers ------------------------------------------------------
export const canAccessFeature = async (
  requiredPlan: "free" | "basic" | "premium" | "ultra",
): Promise<boolean> => {
  // Map legacy naming: 'basic' => Premium tier, 'premium' => Ultra tier
  const normalized: "free" | "premium" | "ultra" =
    requiredPlan === "basic"
      ? "premium"
      : requiredPlan === "premium"
        ? "ultra"
        : requiredPlan;

  if (normalized === "free") return true;
  const status = await getPremiumStatus();
  const hasPremium = !!status.hasPremiumTier;
  const hasUltra = !!status.hasUltraTier;
  if (normalized === "premium") return hasPremium;
  if (normalized === "ultra") return hasUltra;
  return false;
};

export const getUserTier = async (): Promise<"free" | "premium" | "ultra"> => {
  const status = await getPremiumStatus();
  if (status.hasUltraTier) return "ultra";
  if (status.hasPremiumTier) return "premium";
  return "free";
};

export const hasPremiumTier = async (): Promise<boolean> => {
  const status = await getPremiumStatus();
  return !!status.hasPremiumTier;
};

export const hasUltraTier = async (): Promise<boolean> => {
  const status = await getPremiumStatus();
  return !!status.hasUltraTier;
};

export const hasFeatureAccess = async (feature: string): Promise<boolean> => {
  const status = await getPremiumStatus();
  if (!status.isPremium) return false;
  return status.features?.includes(feature) || false;
};

export const resetPremiumStatus = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PREMIUM_STATUS_KEY);
    await AsyncStorage.removeItem("isPremium"); // legacy flag
  } catch (e) {
    console.error("resetPremiumStatus error:", e);
  }
};

export const getFeatureListForPlan = (planType: PlanType): string[] => {
  return PLAN_FEATURES[planType] || [];
};

export const hasUnlimitedScans = async (): Promise<boolean> => {
  return await hasFeatureAccess("unlimited_scans");
};

export const hasPremiumScans = async (): Promise<boolean> => {
  return (
    (await hasFeatureAccess("premium_scans")) ||
    (await hasFeatureAccess("unlimited_scans"))
  );
};

export const hasProfessionalSessions = async (): Promise<boolean> => {
  return await hasFeatureAccess("professional_sessions");
};

export const hasVideoContent = async (): Promise<boolean> => {
  return await hasFeatureAccess("video_content");
};
