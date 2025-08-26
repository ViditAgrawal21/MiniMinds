import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../context/themeContext';
import { CustomTextInput, Header } from '../../../components';
import CustomButton from '../../../components/common/CustomButton';
import { selectAuthLoading, selectAuthError } from '../../../redux/ReducerHelpers/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  // userId retained previously, now omitted to suppress unused warnings
  const [pwSigningIn, setPwSigningIn] = useState(false);
  const [codeRequestCooldown, setCodeRequestCooldown] = useState(0);
  const isLoading = false;

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validation
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    if (!isValid) return;
    
    try {
      // Dispatch login action
      // dispatch(loginUser({ email, password }));
      
      // For now, just simulate successful login
      // Replace this with actual login logic
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userEmail', email);
      
      // Navigate to language selector after login
      navigation.replace('LanguageSelect');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'Something went wrong. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented here.');
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Registration functionality will be implemented here.');
  };

  const handleSkipForNow = async () => {
    try {
      // Set login as completed (skip authentication for now)
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to language selector
      navigation.replace('LanguageSelect');
    } catch (error) {
      console.error('Skip error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
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
      <TouchableOpacity
        style={[styles.googleButton, isLoading && styles.disabledButton]}
        onPress={() => {
          setMode("google");
          handleGoogleLogin();
        }}
        activeOpacity={0.8}
        
      >
        {isLoading ? (
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
      </TouchableOpacity>
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
        onPress={() => {navigation.navigate("LanguageSelect")}}

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
    fontFamily: "Poppins_500Medium",
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
    fontFamily: "Poppins_500Medium",
    color: "#8B5CF6",
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
    fontFamily: "Poppins_500Medium",
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
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
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
    fontFamily: "Poppins_500Medium",
    color: "#111827",
    backgroundColor: "#fff",
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
    fontFamily: "Poppins_600SemiBold",
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
