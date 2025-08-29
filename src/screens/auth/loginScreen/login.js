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
  initiateOtpForEmail,
  verifyOTP,
  resendOTP,
  storeToken,
  finalizeVerificationLogin,
  loginUser,
  testNetworkConnection,
  AuthService,
} from '../services/authService';
import {
  canRequestCode,
  markCodeRequested,
} from '../utils/verificationRateLimiter';
import {
  setPremiumStatus,
} from '../../../utils/premiumUtils';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mode, setMode] = useState("choose");
  const [authMode, setAuthMode] = useState("signin");
  const [sending, setSending] = useState(false);
  const [otp, setOtp] = useState(""); // verification code (6 digits)
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [pwSigningIn, setPwSigningIn] = useState(false);
  const [codeRequestCooldown, setCodeRequestCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

 
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
      navigation.navigate("LanguageSelect");
    } catch (error) {
      console.error("Error skipping sign-in:", error);
      Alert.alert("Error", "Failed to proceed. Please try again.");
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
      const res = await initiateOtpForEmail(email, "premium_monthly");
      if (res.success && res.status === "registered") {
        setMode("otp");
        setTimer(60);
        setCanResend(false);
        setOtp("");
        await markCodeRequested(email);
      } else if (res.success && res.status === "existing") {
        // Existing user: registration endpoint signaled account presence.
        Alert.alert(
          "Account Exists",
          "This email is already registered. Please enter the verification code previously sent or sign in using your password.",
        );
        setMode("otp"); // still allow code entry if user has one
      } else {
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
      const res = await verifyOTP(email, otp);
      if (res.success) {
        if (res.token) {
          await storeToken(res.token);
          navigation.navigate("LanguageSelect");
          return;
        }
        // If no token, attempt automatic login using stored temp password
        const auto = await finalizeVerificationLogin(email);
        if (auto.success && auto.token) {
          await storeToken(auto.token);
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
      const r = await resendOTP(email);
      if (r.success) {
        setTimer(60);
        setCanResend(false);
        setOtp("");
        await markCodeRequested(email);
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
      const res = await loginUser(email, password);
      await storeToken(res.token);
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
      <TouchableOpacity
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
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.altAuthButton]}
        onPress={() => {
          // Use React 18's automatic batching for smoother updates
          setAuthMode("signin");
          setMode("email");
        }}
      >
        <Text style={styles.altAuthText}>Use Email (Password / Code)</Text>
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
          style={[
            styles.inlineAuthSwitchButton,
            authMode === "signin" && styles.inlineAuthSwitchButtonActive,
          ]}
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
        <TouchableOpacity
          onPress={() => setAuthMode("signup")}
          style={[
            styles.inlineAuthSwitchButton,
            authMode === "signup" && styles.inlineAuthSwitchButtonActive,
          ]}
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
        <TouchableOpacity
          onPress={() => setAuthMode("signin")}
          style={[
            styles.inlineAuthSwitchButton,
            authMode === "signin" && styles.inlineAuthSwitchButtonActive,
          ]}
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
        <TouchableOpacity
          onPress={() => {
            setAuthMode("signup");
            setMode("email");
          }}
          style={[
            styles.inlineAuthSwitchButton,
            authMode === "signup" && styles.inlineAuthSwitchButtonActive,
          ]}
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
      <Text style={styles.sectionTitle}>
        {authMode === "signin" ? "Password Sign In" : "Create Account"}
      </Text>
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.textInput, styles.passwordInput]}
          placeholder="Your password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          editable={!pwSigningIn}
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <CustomIcon
            type="IO"
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#9ca3af"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.primaryButton, pwSigningIn && styles.disabledButton]}
        onPress={handlePasswordSignIn}
        disabled={pwSigningIn}
      >
        {pwSigningIn ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryButtonText}>
            {authMode === "signin" ? "Sign In" : "Create Account"}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switchMode}
        onPress={() => setMode("choose")}
      >
        <Text style={styles.switchModeText}>← Back</Text>
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
          {mode === "choose" && (
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Welcome</Text>
              <Text style={styles.welcomeDescription}>
                Sign in to access your personalized mental wellness journey
              </Text>
            </View>
          )}
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
    width: 100,
    height: 100,
    marginBottom: 20,
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
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
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  welcomeDescription: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonSection: {
    gap: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#374151",
  },
  skipButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginTop: -10,
    marginBottom: 0,
  },
  skipButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#6366f1",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#6366f1",
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
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 2,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#374151",
    marginTop: 8,
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#1e293b",
    backgroundColor: "#f8fafc",
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
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  switchMode: {
    paddingVertical: 4,
    alignItems: "center",
  },
  switchModeText: {
    color: "#6366f1",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
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
    color: "#6366f1",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  countdownText: {
    color: "#6b7280",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  altAuthButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  altAuthText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#475569",
  },
  /* Auth mode toggle styles */
  inlineAuthSwitchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    alignSelf: "center",
    width: 280,
  },
  inlineAuthSwitchButton: {
    flex: 1,
    borderRadius: 12,
    margin: 2,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  inlineAuthSwitchButtonActive: {
    backgroundColor: "#ffffff",
  },
  inlineAuthSwitchText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
  },
  inlineAuthSwitchTextActive: {
    color: "#1e293b",
  },
});




export default LoginScreen;
