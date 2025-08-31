import AsyncStorage from "@react-native-async-storage/async-storage";

interface LicenseEntry {
  email: string;
  licenseCode: string;
  plan: string;
  isActive: boolean;
  expiryDate?: string;
  features: string[];
}

// Define valid license codes locally
const VALID_LICENSES: LicenseEntry[] = [
  {
    email: "tanmay.raut20@pccoepune.org",
    licenseCode: "4EB03FEONDQTUYQH",
    plan: "premium_yearly",
    isActive: true,
    features: [
      "premium_scans",
      "primary_secondary_interventions",
      "video_content",
      "all_interventions",
    ],
  },
  {
    email: "test@example.com",
    licenseCode: "TEST123456789",
    plan: "ultra_yearly",
    isActive: true,
    features: [
      "unlimited_scans",
      "all_interventions",
      "professional_sessions",
      "video_content",
    ],
  },
  // Add more license combinations here as needed
];

const LICENSE_ACCESS_KEY = "license_access";

export interface LicenseValidationResult {
  isValid: boolean;
  details?: LicenseEntry;
  message: string;
}

export const validateLicenseLocally = (
  email: string,
  licenseCode: string,
): LicenseValidationResult => {
  const license = VALID_LICENSES.find(
    (l) =>
      l.email.toLowerCase() === email.toLowerCase() &&
      l.licenseCode === licenseCode &&
      l.isActive,
  );

  if (license) {
    return {
      isValid: true,
      details: license,
      message: `License validated successfully for ${license.plan} plan`,
    };
  }

  return {
    isValid: false,
    message: "Invalid email and license code combination",
  };
};

export const storeLicenseAccess = async (
  email: string,
  licenseCode: string,
  licenseDetails: LicenseEntry,
): Promise<void> => {
  try {
    const licenseAccess = {
      email,
      licenseCode,
      plan: licenseDetails.plan,
      features: licenseDetails.features,
      activatedAt: new Date().toISOString(),
      isActive: true,
      expiryDate: licenseDetails.expiryDate,
    };

    await AsyncStorage.setItem(
      LICENSE_ACCESS_KEY,
      JSON.stringify(licenseAccess),
    );
  } catch (error) {
    console.error("Error storing license access:", error);
    throw error;
  }
};

export const getLicenseAccess = async (): Promise<any | null> => {
  try {
    const licenseData = await AsyncStorage.getItem(LICENSE_ACCESS_KEY);
    return licenseData ? JSON.parse(licenseData) : null;
  } catch (error) {
    console.error("Error getting license access:", error);
    return null;
  }
};

export const hasValidLicense = async (): Promise<boolean> => {
  try {
    const licenseData = await getLicenseAccess();
    if (!licenseData) return false;

    // Check if license is still active
    if (licenseData.expiryDate) {
      const expiryDate = new Date(licenseData.expiryDate);
      const now = new Date();
      if (now > expiryDate) {
        await clearLicenseAccess();
        return false;
      }
    }

    return licenseData.isActive === true;
  } catch (error) {
    console.error("Error checking license validity:", error);
    return false;
  }
};

export const clearLicenseAccess = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LICENSE_ACCESS_KEY);
  } catch (error) {
    console.error("Error clearing license access:", error);
  }
};

export const getAllValidLicenses = (): LicenseEntry[] => {
  return VALID_LICENSES.filter((l) => l.isActive);
};

// Validate license via API (for future use)
export const validateLicenseViaAPI = async (
  email: string,
  licenseCode: string,
): Promise<LicenseValidationResult> => {
  try {
    const response = await fetch(
      "https://booking-system-468212.el.r.appspot.com/api/license/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          license_code: licenseCode,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        isValid: false,
        message: data.error || "License validation failed",
      };
    }

    return {
      isValid: true,
      details: data.details,
      message: data.message || "License validated successfully",
    };
  } catch (error) {
    console.error("API license validation error:", error);
    // Fallback to local validation
    return validateLicenseLocally(email, licenseCode);
  }
};
