import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../../context/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    // Check user state and navigate accordingly
    const checkUserState = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Show splash for 2 seconds
        
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        
        if (!hasCompletedOnboarding) {
          // First time user - go to onboarding
          navigation.replace('OnBoarding');
        } else if (!selectedLanguage) {
          // User needs to select language
          navigation.replace('MainApp', { screen: 'LanguageSelectScreen' });
        } else if (!isLoggedIn) {
          // User needs to login
          navigation.replace('Login');
        } else {
          // User is logged in - go to main app
          navigation.replace('MainApp');
        }
      } catch (error) {
        console.error('Error checking user state:', error);
        // On error, default to onboarding
        navigation.replace('OnBoarding');
      }
    };

    checkUserState();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <View style={styles.logoContainer}>
        {/* Add your logo here */}
        <Text style={styles.logoText}>ThoughtPro</Text>
        <Text style={styles.tagline}>Think Better, Live Better</Text>
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
});

export default SplashScreen;
