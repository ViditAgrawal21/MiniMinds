import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../context/themeContext';
import { CustomTextInput, Header } from '../../../components';
import CustomButton from '../../../components/common/CustomButton';
import CustomIcon from '../../../components/CustomIcon';
import { selectAuthLoading, selectAuthError } from '../../../redux/ReducerHelpers/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleAuthNative, {
  GoogleUser,
} from '../../../services/googleAuthNative';
import {
  AuthService,
  initiateOtpForEmail,
  verifyOTP,
  resendOTP,
  storeToken,
  finalizeVerificationLogin,
  loginUser,
  testNetworkConnection,
} from '../../../services/authService';
import {
  canRequestCode,
  markCodeRequested,
} from '../utils/verificationRateLimiter';
import {
  createPremiumStatusFromLicense,
  setPremiumStatus,
} from '../../../utils/premiumUtils';
import { LicenseService } from '@/services/licenseService';


const checkAndActivateUserLicense = async (
  token,
  userEmail,
) => {
  console.log("🔍 Checking user's existing license after login");
  
  try {
    const licenseStatus = await LicenseService.checkUserCurrentLicense(token);
    
    if (licenseStatus.hasActiveLicense) {
      console.log("🎉 User has active license - activating premium status");
      
      const premiumStatus = createPremiumStatusFromLicense({
        licenseType: licenseStatus.licenseType,
        validUntil: licenseStatus.validUntil,
        redeemedTime: licenseStatus.redeemedTime,
        daysRemaining: licenseStatus.daysRemaining,
      });
      
      await setPremiumStatus(premiumStatus);
      
      // Show welcome message with subscription details
      const planName =
        licenseStatus.licenseType === "ultra" ? "Ultra" : "Premium";
      const daysText = licenseStatus.daysRemaining
        ? `${licenseStatus.daysRemaining} days remaining`
        : "Active subscription";

      Alert.alert(
        "Welcome Back! 🎉",
        `Your ${planName} subscription is active.\n${daysText}`,
        [{ text: "Continue", style: "default" }],
      );
      
      return true;
    } else {
      console.log("ℹ️ No active license found for user");
      return false;
    }
  } catch (error) {
    console.error("💥 Error checking user license:", error);
    // Don't block login on license check error
    return false;
  }
};

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("choose");
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sending, setSending] = useState(false);
  const [otp, setOtp] = useState(""); // verification code (6 digits)
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [pwSigningIn, setPwSigningIn] = useState(false);
  const [codeRequestCooldown, setCodeRequestCooldown] = useState(0);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Check if user is already authenticated on component mount
  useEffect(() => {

    const checkAuthStatus = async () => {
      try {
        const isAuthenticated = await AuthService.isAuthenticated();
        if (isAuthenticated) {
          const user = await AuthService.getStoredUser();
          if (user) {
            console.log("User already authenticated:", user.email);
            navigation.navigate("MainApp");
            return;
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };  
    
    // checkAuthStatus();
  }, [navigation]);

 
  // No need for response handling effect with native Google Auth

  // OTP resend countdown
  useEffect(() => {
    if (mode === "otp" && !canResend && timer > 0) {
      const interval = setInterval(() => setTimer((p) => p - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setCanResend(true);
  }, [timer, canResend, mode]);

  // Local rate limit countdown (separate from resend timer inside OTP screen)
  useEffect(() => {
    if (codeRequestCooldown <= 0) return;
    const int = setInterval(
      () => setCodeRequestCooldown((p) => (p > 0 ? p - 1 : 0)),
      1000,
    );
    return () => clearInterval(int);
  }, [codeRequestCooldown]);

  // Auto verify when 6 digits entered
  useEffect(() => {
    if (mode === "otp" && otp.length === 6 && !verifying) {
      handleVerifyOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, mode]);

  // Email validation helper
  const validateEmail = (val) => 
    /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val.trim());

  const handleGoogleLogin = async () => {
    setIsGoogleSigningIn(true);
    try {
      // Check if Google Play Services are available on Android
      await GoogleAuthNative.isSignedIn(); // This will indirectly check for play services
      
      // Use native Google Sign-In
      const userInfo = await GoogleAuthNative.signIn();
      
      if (userInfo) {
        // Data is automatically saved by the native module
        // Also create a temporary AuthService session for consistency
        await AuthService.createTempUserSession(userInfo.email);
        
        // Navigate to language selection after successful sign-in
        navigation.navigate("LanguageSelect");
      } else {
        // Handle the case when userInfo is null but no error was thrown
        Alert.alert(
          "Sign In Failed",
          "Could not retrieve user information from Google. Please try again."
        );
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      
      // Don't show alert if user just cancelled the sign-in
      if (error.code !== 12501 && error.code !== 'SIGN_IN_CANCELLED') { // Handle both numeric and string codes
        Alert.alert(
          "Authentication Error",
          "Failed to complete Google sign-in. Please try again.",
        );
      }
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const handleSkipForNow = async () => {
    try {
      // Create a temporary user session for skip functionality
      await AuthService.createTempUserSession("guest@thoughtpro.app");
      navigation.navigate("LanguageSelect");
    } catch (error) {
      console.error("Error skipping sign-in:", error);
      Alert.alert("Error", "Failed to proceed. Please try again.");
    }
  };

  // Add logout functionality for testing purposes
  const handleLogout = async () => {
    try {
      await AuthService.clearAuth();
      Alert.alert("Success", "Logged out successfully");
      setMode("choose");
      setEmail("");
      setPassword("");
      setOtp("");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  // Check current user authentication status
  const checkCurrentUser = async () => {
    try {
      const user = await AuthService.getStoredUser();
      const isAuth = await AuthService.isAuthenticated();
      const token = await AuthService.getStoredToken();
      
      console.log("Current User:", user);
      console.log("Is Authenticated:", isAuth);
      console.log("Has Token:", !!token);
      
      if (user && isAuth) {
        Alert.alert(
          "User Status", 
          `Logged in as: ${user.email}\nUsername: ${user.username}\nRole: ${user.role}`
        );
      } else {
        Alert.alert("User Status", "No authenticated user found");
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      Alert.alert("Error", "Failed to check user status");
    }
  };

  const handleSendOtp = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }
    const rl = await canRequestCode(email);
    if (!rl.allowed) {
      setCodeRequestCooldown(rl.waitSeconds);
      Alert.alert(
        "Please Wait",
        `You can request a new code in ${rl.waitSeconds}s.`,
      );
      return;
    }
    setSending(true);
    try {
      // Use the unified helper function that uses AuthService internally
      const res = await initiateOtpForEmail(email, "premium_monthly");
      if (res.success && res.status === "registered") {
        setMode("otp");
        setTimer(60);
        setCanResend(false);
        setOtp("");
        await markCodeRequested(email);
        
        console.log("✅ OTP initiated successfully via AuthService");
        Alert.alert("Success", "Verification code sent to your email!");
      } else if (res.success && res.status === "existing") {
        // Existing user: registration endpoint signaled account presence.
        Alert.alert(
          "Account Exists",
          "This email is already registered. Please enter the verification code previously sent or sign in using your password.",
        );
        setMode("otp"); // still allow code entry if user has one
      } else {
        console.error("❌ OTP initiation failed:", res.message);
        Alert.alert("Error", res.message || "Failed to start verification");
      }
    } catch (e) {
      console.error("OTP start error", e);
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Enter the 6-digit code");
      return;
    }
    setVerifying(true);
    try {
      // Use AuthService.verifyOTP for proper verification
      const res = await AuthService.verifyOTP(email, otp);
      if (res.success) {
        if (res.token) {
          // Store token using AuthService method
          await AuthService.storeToken(res.token);
          
          // Check for premium license after successful verification
          await checkAndActivateUserLicense(res.token, email);
          
          navigation.navigate("LanguageSelect");
          return;
        }
        // If no token, attempt automatic login using stored temp password
        const auto = await finalizeVerificationLogin(email);
        if (auto.success && auto.token) {
          // Store token using AuthService method
          await AuthService.storeToken(auto.token);
          
          // Check for premium license after successful login
          await checkAndActivateUserLicense(auto.token, email);
          
          navigation.navigate("LanguageSelect");
        } else {
          Alert.alert(
            "Verified",
            "Email verified. Please sign in using your password.",
          );
          // Return to email screen for user to choose alternative path
          setMode("email");
        }
      } else {
        Alert.alert("Error", res.message || "Invalid or expired code");
      }
    } catch (e) {
      console.error("Verify OTP error", e);
      Alert.alert("Error", "Verification failed. Try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    const rl = await canRequestCode(email);
    if (!rl.allowed) {
      setCodeRequestCooldown(rl.waitSeconds);
      Alert.alert(
        "Please Wait",
        `You can request another code in ${rl.waitSeconds}s.`,
      );
      return;
    }
    setResending(true);
    try {
      // Use AuthService.resendOTP for proper resend functionality
      const r = await AuthService.resendOTP(email);
      if (r.success) {
        setTimer(60);
        setCanResend(false);
        setOtp("");
        await markCodeRequested(email);
        Alert.alert("Success", "Verification code sent again!");
      } else {
        Alert.alert("Error", r.message || "Could not resend code");
      }
    } catch (e) {
      console.error("Resend error", e);
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handlePasswordSignIn = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Error", "Enter a valid email first");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Enter your password");
      return;
    }
    
    // Start diagnostics only in development, and do not block UI/login
    if (__DEV__) {
      // fire-and-forget; any errors are ignored
      testNetworkConnection().catch(() => {});
    }
    
    setPwSigningIn(true);
    try {
      // Use AuthService.loginUser directly for better error handling
      const res = await AuthService.loginUser(email, password);
      
      // Store token using AuthService method
      await AuthService.storeToken(res.token);
      
      // Check for premium license after successful login
      await checkAndActivateUserLicense(res.token, email);
      
      navigation.navigate("LanguageSelect");
    } catch (e) {
      console.log("🚨 Login failed in UI:", e);
      Alert.alert(
        "Sign In Failed",
        e?.message || "Invalid credentials or network error",
      );
    } finally {
      setPwSigningIn(false);
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  

  const renderChoose = () => (
    <View style={styles.buttonSection}>
      <View style={styles.authModeToggleRow}>
        <TouchableOpacity
          style={[
            styles.authModeToggle,
            authMode === "signin" && styles.authModeToggleActive,
          ]}
          onPress={() => setAuthMode("signin")}
        >
          <Text
            style={[
              styles.authModeToggleText,
              authMode === "signin" && styles.authModeToggleTextActive,
            ]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.authModeToggle,
            authMode === "signup" && styles.authModeToggleActive,
          ]}
          onPress={() => setAuthMode("signup")}
        >
          <Text
            style={[
              styles.authModeToggleText,
              authMode === "signup" && styles.authModeToggleTextActive,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.authModeCaption}>
        {authMode === "signin"
          ? "Welcome back – choose a method to sign in."
          : "Create a new account – choose a method to sign up."}
      </Text>
      {/* <TouchableOpacity
        style={[styles.googleButton, (isLoading || isGoogleSigningIn) && styles.disabledButton]}
        onPress={handleGoogleLogin}
        activeOpacity={0.8}
        disabled={isLoading || isGoogleSigningIn}
      >
        {isGoogleSigningIn ? (
          <ActivityIndicator size="small" color="#374151" />
        ) : (
          <>
            <Image
              source={{
                uri: "https://developers.google.com/identity/images/g-logo.png",
              }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>
              {authMode === "signin"
                ? "Sign In with Google"
                : "Sign Up with Google"}
            </Text>
          </>
        )}
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.altAuthButton]}
        onPress={() => setMode(authMode === "signup" ? "email" : "password")}
      >
        <Text style={styles.altAuthText}>
          {authMode === "signin"
            ? "Use Email (Password / Code)"
            : "Use Email (Verification Code)"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkipForNow}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <Text style={[styles.skipButtonText, isLoading && styles.disabledText]}>
          Skip for now
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmail = () => (
    <View style={styles.formBlock}>
      <View style={styles.inlineAuthSwitchRow}>
        <TouchableOpacity
          onPress={() => {
            setAuthMode("signin");
            setMode("password");
          }}
        >
          <Text
            style={[
              styles.inlineAuthSwitchText,
              authMode === "signin" && styles.inlineAuthSwitchTextActive,
            ]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <Text style={styles.inlineDivider}>|</Text>
        <TouchableOpacity onPress={() => setAuthMode("signup")}>
          <Text
            style={[
              styles.inlineAuthSwitchText,
              authMode === "signup" && styles.inlineAuthSwitchTextActive,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>
        {authMode === "signup"
          ? "Create Account with Email"
          : "Email Verification Code"}
      </Text>
      <Text style={styles.inputLabel}>Email Address</Text>
      <TextInput
        style={styles.textInput}
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        editable={!sending}
      />
      <TouchableOpacity
        style={[styles.primaryButton, sending && styles.disabledButton]}
        onPress={handleSendOtp}
        disabled={sending || codeRequestCooldown > 0}
      >
        {sending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>
            {codeRequestCooldown > 0
              ? `Wait ${codeRequestCooldown}s`
              : authMode === "signup"
                ? "Send Verification Code"
                : "Send Code"}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.altAuthButton}
        onPress={() => setMode("password")}
      >
        <Text style={styles.altAuthText}>Use Password Instead</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switchMode}
        onPress={() => setMode("choose")}
      >
        <Text style={styles.switchModeText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPassword = () => (
    <View style={styles.formBlock}>
      <View style={styles.inlineAuthSwitchRow}>
        <TouchableOpacity onPress={() => setAuthMode("signin")}>
          <Text
            style={[
              styles.inlineAuthSwitchText,
              authMode === "signin" && styles.inlineAuthSwitchTextActive,
            ]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <Text style={styles.inlineDivider}>|</Text>
        <TouchableOpacity
          onPress={() => {
            setAuthMode("signup");
            setMode("email");
          }}
        >
          <Text
            style={[
              styles.inlineAuthSwitchText,
              authMode === "signup" && styles.inlineAuthSwitchTextActive,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Password Sign In</Text>
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        editable={!pwSigningIn}
      />
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!pwSigningIn}
      />
      <TouchableOpacity
        style={[styles.primaryButton, pwSigningIn && styles.disabledButton]}
        onPress={handlePasswordSignIn}
        disabled={pwSigningIn}
      >
        {pwSigningIn ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switchMode}
        onPress={() => setMode("email")}
      >
        <Text style={styles.switchModeText}>Use Verification Code Instead</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOtp = () => (
    <View style={styles.formBlock}>
      <Text style={styles.sectionTitle}>Enter Verification Code</Text>
      <Text style={styles.otpSubtitle}>Code sent to: {email}</Text>
      <TextInput
        style={styles.otpInput}
        placeholder="000000"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={(v) => setOtp(v.replace(/[^0-9]/g, "").slice(0, 6))}
        editable={!verifying}
      />
      <TouchableOpacity
        style={[styles.primaryButton, verifying && styles.disabledButton]}
        onPress={handleVerifyOtp}
        disabled={verifying}
      >
        {verifying ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>Verify & Continue</Text>
        )}
      </TouchableOpacity>
      <View style={styles.resendRow}>
        {canResend ? (
          <TouchableOpacity onPress={handleResendOtp} disabled={resending}>
            {resending ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Text style={styles.resendText}>Resend Code</Text>
            )}
          </TouchableOpacity>
        ) : (
          <Text style={styles.countdownText}>
            Resend in: {formatTime(timer)}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.switchMode}
        onPress={() => setMode("email")}
      >
        <Text style={styles.switchModeText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/thought-pro-icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Thought Pro</Text>
          <Text style={styles.subtitle}>Your Mental Wellness Companion</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.welcomeDescription}>
              Sign in to access your personalized mental wellness journey
            </Text>
          </View>
          {mode === "choose" && renderChoose()}
          {mode === "email" && renderEmail()}
          {mode === "password" && renderPassword()}
          {mode === "otp" && renderOtp()}
        </View>
                <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{" "}
            <Text style={styles.linkText}>Terms</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}



const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#6b7280",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  welcomeSection: {
    marginBottom: 48,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  welcomeDescription: {
    fontSize: 16,
    fontWeight: "400",
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonSection: {
    gap: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  skipButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8B5CF6",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    fontWeight: "500",
    color: "#8B5CF6",
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.6,
  },
  /* New styles for email + OTP */
  formBlock: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginTop: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    backgroundColor: "#fff",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    top: 14,
    padding: 4,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  switchMode: {
    paddingVertical: 4,
    alignItems: "center",
  },
  switchModeText: {
    color: "#007AFF",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  otpSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 14,
    textAlign: "center",
    fontSize: 24,
    letterSpacing: 6,
    fontFamily: "Poppins_600SemiBold",
    backgroundColor: "#fff",
  },
  resendRow: {
    marginTop: 8,
    alignItems: "center",
  },
  resendText: {
    color: "#007AFF",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  countdownText: {
    color: "#6b7280",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  altAuthButton: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  altAuthText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#374151",
  },
  /* Auth mode toggle styles */
  authModeToggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 8,
  },
  authModeToggle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
  },
  authModeToggleActive: {
    backgroundColor: "#007AFF",
  },
  authModeToggleText: {
    fontFamily: "Poppins_500Medium",
    color: "#374151",
    fontSize: 14,
  },
  authModeToggleTextActive: {
    color: "#fff",
  },
  authModeCaption: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
    fontFamily: "Poppins_400Regular",
    marginBottom: 16,
  },
  inlineAuthSwitchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  inlineAuthSwitchText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#6b7280",
  },
  inlineAuthSwitchTextActive: {
    color: "#007AFF",
  },
  inlineDivider: {
    color: "#d1d5db",
    fontSize: 14,
  },
});




export default LoginScreen;
