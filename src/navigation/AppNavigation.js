import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screens here
import SplashScreen from '../screens/auth/splashScreen/splash';
import LoginScreen from '../screens/auth/loginScreen/login';
import OnBoardingScreen from '../screens/auth/onboardingScreen/onboarding';
import HomeScreen from '../screens/home/home';
import WelcomeScreen from '../screens/main/WelcomeScreen';
import SelfOrChildScreen from '../screens/main/selforchild';

// Import Language Screen
import LanguageSelectScreen from '../screens/main/languageSelect/languageSelectScreen';

// Import Self Assessment Screen
import SelfOnboardingScreen from '../screens/main/self/SelfOnboarding';
import SelfThankYouScreen from '../screens/main/self/selfthankyou';
import { LanguageProvider } from 'src/context/LanguageContext';

// Import the main tab navigator
import MainTabNavigator from './MainTabNavigator';

// Import other screens as you create them
// import ProfileScreen from '../screens/main/profile-page/profile';
// import SettingsScreen from '../screens/main/settingsScreen/settings';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState('Splash');
  const [initialParams, setInitialParams] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Handle deep links when app is opened from a killed state
    const handleInitialURL = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          handleDeepLink(url);
        }
        
        // Check app state to determine initial route
        await checkAppState();
      } catch (e) {
        console.error('Error getting initial URL:', e);
      } finally {
        setIsReady(true);
      }
    };

    // Check if this is first launch or returning user
    const checkAppState = async () => {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const hasCompletedSelfAssessment = await AsyncStorage.getItem('hasCompletedSelfAssessment');
        const hasSelectedLanguage = await AsyncStorage.getItem('hasSelectedLanguage');
        
        if (!hasCompletedOnboarding) {
          // First time user - start with splash, then login
          setInitialRoute('Splash');
        } else if (!isLoggedIn) {
          // User has seen splash but not logged in
          setInitialRoute('Login');
        } else if (!hasSelectedLanguage) {
          // User is logged in but hasn't selected language
          setInitialRoute('LanguageSelect');
        } else if (!hasCompletedSelfAssessment) {
          // User has selected language but hasn't completed self-assessment
          setInitialRoute('SelfOnboarding');
        } else {
          // User has completed everything - go to main app
          setInitialRoute('MainApp');
        }
      } catch (error) {
        console.error('Error checking app state:', error);
        setInitialRoute('Splash');
      }
    };

    // Parse the URL and set initial route
    const handleDeepLink = url => {
      // Add your deep link handling logic here
      console.log('Deep link received:', url);
    };

    // Set up listeners for when the app is already running
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      handleDeepLink(url);
    });

    handleInitialURL();

    return () => {
      linkingSubscription.remove();
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <LanguageProvider>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        
        {/* Authentication Flow */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Language Selection */}
      <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
      
      {/* Self Assessment Flow */}
      <Stack.Screen name="SelfOnboarding" component={SelfOnboardingScreen} />
      <Stack.Screen name="SelfThankYou" component={SelfThankYouScreen} />
      
      {/* Main App - This contains the tab navigation and all main screens */}
      <Stack.Screen name="MainApp" component={MainTabNavigator} />
      
      {/* Legacy/Optional Screens */}
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="selforchild" component={SelfOrChildScreen} />
      
    </Stack.Navigator>
    </LanguageProvider>
  );
};

export default AppNavigation;
