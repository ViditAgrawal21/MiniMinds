import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';

// Import your screens here
import SplashScreen from '../auth/splashScreen/splash';
import LoginScreen from '../auth/loginScreen/login';
import OnBoardingScreen from '../auth/onboardingScreen/onboarding';
import HomeScreen from '../app/homeScreen/home';

// Import other screens as you create them
// import ProfileScreen from '../app/profileScreen/profile';
// import SettingsScreen from '../app/settingsScreen/settings';

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
      } catch (e) {
        console.error('Error getting initial URL:', e);
      } finally {
        setIsReady(true);
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
      
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      
      {/* Add more screens as you create them */}
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigation;
