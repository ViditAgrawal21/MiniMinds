import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../context/themeContext';

const SplashScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    // Navigate to the next screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('OnBoarding');
    }, 2000);

    return () => clearTimeout(timer);
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
