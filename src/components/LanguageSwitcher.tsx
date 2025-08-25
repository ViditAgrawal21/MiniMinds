import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { t, locale, setLocale, supportedLanguages, isLoading } = useLanguage();

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await setLocale(languageCode);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>{t('loading', 'Loading...')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('languageSelect.selectLanguage', 'Select Language')}</Text>
      {Object.entries(supportedLanguages).map(([code, name]) => (
        <TouchableOpacity
          key={code}
          style={[
            styles.languageButton,
            locale === code && styles.activeLanguageButton,
          ]}
          onPress={() => handleLanguageChange(code)}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.languageText,
              locale === code && styles.activeLanguageText,
            ]}
          >
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageButton: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeLanguageButton: {
    backgroundColor: '#007AFF',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  activeLanguageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LanguageSwitcher;
