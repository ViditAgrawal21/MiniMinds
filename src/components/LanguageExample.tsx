/**
 * Example component showing how to use the new Language Context
 * This demonstrates best practices for internationalization in the app
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

const LanguageExample: React.FC = () => {
  const { t, locale, setLocale, supportedLanguages, isLoading } = useLanguage();

  const handleLanguageChange = async (langCode: string) => {
    try {
      await setLocale(langCode);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>{t('loading', 'Loading...')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {t('example.title', 'Language Context Example')}
      </Text>
      
      <Text style={styles.subtitle}>
        {t('example.currentLanguage', 'Current Language')}: {supportedLanguages[locale]}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('example.switchLanguage', 'Switch Language')}
        </Text>
        
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <TouchableOpacity
            key={code}
            style={[
              styles.languageButton,
              locale === code && styles.activeButton,
            ]}
            onPress={() => handleLanguageChange(code)}
          >
            <Text
              style={[
                styles.buttonText,
                locale === code && styles.activeButtonText,
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('example.sampleTexts', 'Sample Texts')}
        </Text>
        
        <Text style={styles.sampleText}>
          {t('welcome', 'Welcome to ThoughtPro')}
        </Text>
        
        <Text style={styles.sampleText}>
          {t('navigation.home', 'Home')}
        </Text>
        
        <Text style={styles.sampleText}>
          {t('navigation.insights', 'Insights')}
        </Text>
        
        <Text style={styles.sampleText}>
          {t('navigation.mindTools', 'Mind Tools')}
        </Text>
        
        <Text style={styles.sampleText}>
          {t('navigation.profile', 'Profile')}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('example.features', 'Features')}
        </Text>
        
        <Text style={styles.featureText}>
          • {t('example.feature1', 'Automatic language persistence')}
        </Text>
        <Text style={styles.featureText}>
          • {t('example.feature2', 'Real-time language switching')}
        </Text>
        <Text style={styles.featureText}>
          • {t('example.feature3', 'Loading states and error handling')}
        </Text>
        <Text style={styles.featureText}>
          • {t('example.feature4', 'Type-safe translation functions')}
        </Text>
        <Text style={styles.featureText}>
          • {t('example.feature5', 'Consistent API across components')}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  languageButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sampleText: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    color: '#333',
  },
  featureText: {
    fontSize: 14,
    marginVertical: 3,
    color: '#666',
  },
});

export default LanguageExample;
