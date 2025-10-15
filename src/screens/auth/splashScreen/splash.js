import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../../../context/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    // Check user state and navigate accordingly

setTimeout(() => {
  navigation.replace('Login');
}, 1500);

  }, [navigation]);

const {height,width} = useWindowDimensions()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      <Image 
        resizeMode="stretch" 
        source={require('@/assets/images/mini-minds-splash-icon.png')} 
        style={styles.splashImage} 
      />

      {/* Optional: Keep text as fallback or remove completely */}
      {/* <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Mini Minds</Text>
        <Text style={styles.tagline}>Think Better, Live Better</Text>
      </View> */}
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
  splashImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
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
