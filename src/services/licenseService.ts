const BASE_URL = "https://booking-system-468212.el.r.appspot.com";

export interface LicenseCreateRequest {
  email: string;
  plan_type: string;
  validity_days: number;
  features: string[];
}

export interface LicenseCreateResponse {
  success: boolean;
  message: string;
  data: {
    license_code: string;
    plan_type: string;
    features: string[];
    validity_days: number;
  };
}

export interface LicenseRedeemResponse {
  success: boolean;
  message: string;
  error?: string;
  code?: string; // Backend error codes like 'license_already_used', 'unauthorized'
  data?: {
    license_code?: string;
    license_type?: string;
    redeemed_time?: string;
    user_email?: string;
    plan_type?: string;
    features?: string[];
    valid_until?: string;
    license_details?: {
      used: boolean;
      redeemed_time?: string;
      user_email?: string;
      validity_days?: number;
    };
  };
}

export interface LicenseValidityResponse {
  success: boolean;
  is_valid: boolean;
  valid_until: string;
  days_remaining: number;
}

export class LicenseService {
  // Create a plan-specific license (Admin only - for backend use)
  static async createLicense(
    email: string,
    planType: string,
    validityDays: number,
    features: string[],
    token: string,
  ): Promise<LicenseCreateResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/license/create-license`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          plan_type: planType,
          validity_days: validityDays,
          features,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "License creation failed");
      }

      return data;
    } catch (error) {
      console.error("License creation error:", error);
      throw error;
    }
  }

  // Redeem a license code
  static async redeemLicense(
    licenseCode: string,
    token: string,
  ): Promise<LicenseRedeemResponse> {
    console.log("📡 LicenseService.redeemLicense called");
    console.log("🔑 License code:", licenseCode.substring(0, 4) + "***");
    console.log("🎫 Token available:", !!token);
    
    try {
      const requestBody = { license_code: licenseCode };
      console.log("📤 API request to:", `${BASE_URL}/api/license/redeem`);
      console.log("📝 Request body:", requestBody);
      
      const response = await fetch(`${BASE_URL}/api/license/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("📊 API response status:", response.status);
      console.log("🌐 API response ok:", response.ok);
      
      const data = await response.json();
      console.log("📋 API response data:", {
        success: data.success,
        message: data.message,
        error: data.error,
        hasData: !!data.data,
      });

      if (!response.ok) {
        console.log("❌ API response not ok, throwing error");
        console.log(
          "🔍 Error details:",
          data.error || "License redemption failed",
        );
        throw new Error(data.error || "License redemption failed");
      }

      console.log("✅ License redemption API call successful");
      return data;
    } catch (error) {
      console.error("💥 License redemption error:", error);
      throw error;
    }
  }

  // Check user's current license status (for sign-in time check)
  static async checkUserCurrentLicense(token: string): Promise<{
    hasActiveLicense: boolean;
    licenseType?: string;
    validUntil?: string;
    redeemedTime?: string;
    daysRemaining?: number;
  }> {
    console.log("🔍 LicenseService.checkUserCurrentLicense called");
    
    try {
      // Try GET method first
      let response = await fetch(`${BASE_URL}/api/license/check-validity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📊 User license check response status:", response.status);
      
      // If GET returns 405, try POST method
      if (response.status === 405) {
        console.log("⚠️ 405 Method Not Allowed - trying POST method");
        response = await fetch(`${BASE_URL}/api/license/check-validity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
        console.log(
          "📊 User license check response status (POST):",
          response.status,
        );
      }

      // Handle JSON parsing errors (HTML responses)
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("💥 Failed to parse JSON response:", parseError);
        console.log("ℹ️ Likely HTML error response - assuming no license");
        return { hasActiveLicense: false };
      }

      console.log("📋 User license check response data:", {
        success: data.success,
        isValid: data.is_valid,
        hasData: !!data.data,
        error: data.error,
        message: data.message,
      });

      // Handle 400 error specifically - means no license found or invalid request
      if (response.status === 400) {
        console.log("ℹ️ No active license found for user (400 response)");
        return { hasActiveLicense: false };
      }

      if (!response.ok) {
        if (response.status === 404) {
          // No active license found
          console.log("ℹ️ No active license found for user (404 response)");
          return { hasActiveLicense: false };
        }
        // Don't throw error - just return no license to avoid blocking login
        console.log("⚠️ License check returned error, assuming no license:", {
          status: response.status,
          error: data.error || data.message,
        });
        return { hasActiveLicense: false };
      }

      if (data.success && data.is_valid) {
        // Log the COMPLETE API response to debug structure issues
        console.log("🔍 COMPLETE API RESPONSE:", JSON.stringify(data, null, 2));
        
        // Extract license data from the API response
        const licenseType = data.data?.license_type || "premium";
        const validUntil = data.data?.valid_till;
        const redeemedTime = data.data?.usage_status?.used_at;
        const daysRemaining = data.data?.days_remaining;
        
        console.log("🎯 Extracted license details:", {
          licenseType,
          validUntil,
          redeemedTime,
          daysRemaining,
          licenseCode: data.data?.license_code,
        });
        
        return {
          hasActiveLicense: true,
          licenseType,
          validUntil,
          redeemedTime,
          daysRemaining,
        };
      }

      console.log("ℹ️ User license not active or invalid");
      return { hasActiveLicense: false };
    } catch (error) {
      console.error("💥 User license check error:", error);
      // Don't throw error - just return no license to avoid blocking login
      return { hasActiveLicense: false };
    }
  }

  // Check license validity
  static async checkLicenseValidity(
    licenseCode: string,
    token: string,
  ): Promise<LicenseValidityResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/license/check-validity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          license_code: licenseCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "License validity check failed");
      }

      return data;
    } catch (error) {
      console.error("License validity check error:", error);
      throw error;
    }
  }

  // Check if current user has already redeemed this license
  static async checkUserRedemptionStatus(
    licenseCode: string,
    token: string,
  ): Promise<{
    alreadyRedeemed: boolean;
    isCurrentUser: boolean;
    redemptionDetails?: {
      license_type: string;
      redeemed_time: string;
      user_email: string;
      valid_until: string;
    };
    message: string;
  }> {
    console.log("🔍 LicenseService.checkUserRedemptionStatus called");
    console.log(
      "🔑 Checking redemption status for:",
      licenseCode.substring(0, 4) + "***",
    );
    
    try {
      const requestBody = { license_code: licenseCode };
      console.log(
        "📤 User redemption check API request to:",
        `${BASE_URL}/api/license/redeem`,
      );
      
      // Try to redeem to get detailed error information
      const response = await fetch(`${BASE_URL}/api/license/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("📊 User redemption check response status:", response.status);
      
      const data = await response.json();
      console.log("📋 User redemption check response data:", {
        success: data.success,
        message: data.message,
        code: data.code,
        hasData: !!data.data,
      });

      // If successful, license was available and just redeemed
      if (response.ok && data.success) {
        console.log("✅ License was available and successfully redeemed");
        console.log("📊 License data from successful redemption:", data.data);
        
        // Return license details if available for immediate plan activation
        if (data.data) {
          return {
            alreadyRedeemed: false,
            isCurrentUser: true,
            redemptionDetails: {
              license_type: data.data.license_type || "premium",
              redeemed_time:
                data.data.redeemed_time || new Date().toISOString(),
              user_email: data.data.user_email || "",
              valid_until: data.data.valid_until || "",
            },
            message: "License successfully redeemed",
          };
        }
        
        return {
          alreadyRedeemed: false,
          isCurrentUser: true,
          message: "License successfully redeemed",
        };
      }

      // Handle specific error cases based on backend API documentation
      if (data.code === "license_already_used" && response.status === 400) {
        console.log("⚠️ License already used - checking if by current user");
        
        // License already used - check if it was by the current user
        // The backend should return redemption details in the error response
        const redemptionDetails = data.data;
        
        if (redemptionDetails) {
          console.log("📝 Redemption details found:", {
            user_email: redemptionDetails.user_email,
            redeemed_time: redemptionDetails.redeemed_time,
            license_type: redemptionDetails.license_type,
          });
          
          return {
            alreadyRedeemed: true,
            isCurrentUser: true, // Backend only returns error if current user already redeemed
            redemptionDetails: {
              license_type: redemptionDetails.license_type || "premium",
              redeemed_time: redemptionDetails.redeemed_time,
              user_email: redemptionDetails.user_email,
              valid_until: redemptionDetails.valid_until || "",
            },
            message: "You have already redeemed this license code",
          };
        }
        
        return {
          alreadyRedeemed: true,
          isCurrentUser: true,
          message: "You have already redeemed this license code",
        };
      }

      if (data.code === "unauthorized" && response.status === 403) {
        console.log("🚫 License assigned to different user");
        return {
          alreadyRedeemed: true,
          isCurrentUser: false,
          message: "This license is assigned to a different email address",
        };
      }

      // Invalid license code
      if (response.status === 404) {
        console.log("❌ Invalid license code");
        return {
          alreadyRedeemed: false,
          isCurrentUser: false,
          message: "Invalid license code",
        };
      }

      // Other errors
      console.log("❌ Other redemption error:", data.message);
      return {
        alreadyRedeemed: false,
        isCurrentUser: false,
        message: data.message || "Unable to check license status",
      };
    } catch (error) {
      console.error("💥 License user redemption check error:", error);
      return {
        alreadyRedeemed: false,
        isCurrentUser: false,
        message: "Unable to check license status. Please try again.",
      };
    }
  }

  // Pre-validate license before redemption
  static async validateLicenseBeforeRedeem(
    licenseCode: string,
    token: string,
  ): Promise<{
    isValid: boolean;
    canRedeem: boolean;
    message: string;
    details?: any;
  }> {
    console.log("🔍 LicenseService.validateLicenseBeforeRedeem called");
    console.log(
      "🔑 Validating license code:",
      licenseCode.substring(0, 4) + "***",
    );
    
    try {
      const requestBody = { license_code: licenseCode };
      console.log(
        "📤 Pre-validation API request to:",
        `${BASE_URL}/api/license/validate-before-redeem`,
      );
      
      const response = await fetch(
        `${BASE_URL}/api/license/validate-before-redeem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        },
      );

      console.log("📊 Pre-validation response status:", response.status);
      console.log("🌐 Pre-validation response ok:", response.ok);
      
      const data = await response.json();
      console.log("📋 Pre-validation response data:", {
        error: data.error,
        hasDetails: !!data.details,
      });

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          console.log("⚠️ License conflict detected (already used)");
          return {
            isValid: true,
            canRedeem: false,
            message: data.error || "License already used",
            details: data.details,
          };
        }
        
        console.log("❌ Pre-validation failed - invalid license");
        return {
          isValid: false,
          canRedeem: false,
          message: data.error || "Invalid license code",
        };
      }

      console.log("✅ Pre-validation successful - license available");
      return {
        isValid: true,
        canRedeem: true,
        message: "License is valid and available",
        details: data.details,
      };
    } catch (error) {
      console.error("💥 License pre-validation error:", error);
      return {
        isValid: false,
        canRedeem: false,
        message: "Unable to validate license. Please try again.",
      };
    }
  }

  // Get license details (Admin only)
  static async getLicenseDetails(
    licenseCode: string,
    token: string,
  ): Promise<any> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/license/details/${licenseCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get license details");
      }

      return data;
    } catch (error) {
      console.error("License details error:", error);
      throw error;
    }
  }
}
