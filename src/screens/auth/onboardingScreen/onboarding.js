import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { useTheme } from '../../../context/themeContext';
import CustomButton from '../../../components/common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: 'Welcome to MiniMinds',
      description: 'Discover the power of positive thinking and mental wellness.',
      // image: require('../../assets/images/onboarding1.png'),
    },
    {
      title: 'Track Your Progress',
      description: 'Monitor your mental health journey with our comprehensive tools.',
      // image: require('../../assets/images/onboarding2.png'),
    },
    {
      title: 'Get Started',
      description: 'Begin your journey to better mental health today.',
      // image: require('../../assets/images/onboarding3.png'),
    },
  ];

  const handleNext = async () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Mark onboarding as completed
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      navigation.replace('Login');
    }
  };

  const handleSkip = async () => {
    // Mark onboarding as completed even if skipped
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          {/* Placeholder for image */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Image</Text>
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {onboardingData[currentPage].title}
          </Text>
          <Text style={styles.description}>
            {onboardingData[currentPage].description}
          </Text>
        </View>
        
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <CustomButton
          label="Skip"
          callback={handleSkip}
          variant="outline"
          style={styles.skipButton}
        />
        <CustomButton
          label={currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          callback={handleNext}
          style={styles.nextButton}
        />
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: theme.colors.card,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  textContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.7,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.text,
    opacity: 0.3,
    marginHorizontal: 4,
  },
  activeDot: {
    opacity: 1,
    backgroundColor: theme.colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
  },
  skipButton: {
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export default OnBoardingScreen;
