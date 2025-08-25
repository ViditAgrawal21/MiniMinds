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

// Import the main layout that contains tab navigation and all main screens
import MainLayout from '../screens/main/_layout';

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
        
        if (!hasCompletedOnboarding) {
          // First time user - go through full flow
          setInitialRoute('Splash');
        } else if (!isLoggedIn) {
          // Returning user but not logged in
          setInitialRoute('Login');
        } else {
          // Logged in user - go to main app
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
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}>
      
      {/* Authentication Flow */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Transition Screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="selforchild" component={SelfOrChildScreen} />
      
      {/* Main App - This contains the tab navigation and all main screens */}
      <Stack.Screen name="MainApp" component={MainLayout} />
      
      {/* Legacy Home Screen (can be removed once MainApp is fully integrated) */}
      <Stack.Screen name="Home" component={HomeScreen} />
      
      {/* Add more screens as you create them */}
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigation;
