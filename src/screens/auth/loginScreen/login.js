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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../../context/themeContext';
import { CustomTextInput, Header } from '../../../components';
import CustomButton from '../../../components/common/CustomButton';
import { selectAuthLoading, selectAuthError } from '../../../redux/ReducerHelpers/selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
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
      
      // Navigate to main app
      navigation.replace('MainApp');
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

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <Header 
        title="Login"
        showBackButton={false}
        style={styles.header}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ThoughtPro</Text>
          <Text style={styles.welcomeText}>Welcome back!</Text>
        </View>
        
        <View style={styles.formContainer}>
          <CustomTextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={emailError}
            autoCapitalize="none"
          />
          
          <CustomTextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={passwordError}
          />
          
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
          
          <CustomButton
            label="Login"
            callback={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />
          
          <CustomButton
            label="Forgot Password?"
            callback={handleForgotPassword}
            variant="outline"
            style={styles.forgotButton}
          />
        </View>
        
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
          </Text>
          <CustomButton
            label="Sign Up"
            callback={handleSignUp}
            variant="outline"
            style={styles.signUpButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 18,
    color: theme.colors.text,
    opacity: 0.7,
  },
  formContainer: {
    marginVertical: 20,
  },
  loginButton: {
    marginTop: 20,
  },
  forgotButton: {
    marginTop: 10,
  },
  errorText: {
    color: '#ff3333',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  signUpText: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 10,
  },
  signUpButton: {
    width: '100%',
  },
});

export default LoginScreen;
