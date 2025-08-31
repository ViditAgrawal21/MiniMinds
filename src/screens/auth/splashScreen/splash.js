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

      <Image resizeMethod={"scale"} source={require('@/assets/images/thought-pro-splash.png')} style={{
        height:height,
        width:width
      }} />

      {/* <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ThoughtPro</Text>
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
