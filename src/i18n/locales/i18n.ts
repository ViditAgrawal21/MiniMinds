import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
const en = require('./en/translation.json');
const hi = require('./hi/translation.json');
const mr = require('./mr/translation.json');

const LANGUAGE_KEY = 'selectedLanguage';

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  mr: {
    translation: mr,
  },
};

// Language detector for React Native
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      const defaultLanguage = savedLanguage || 'en';
      callback(defaultLanguage);
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // fallback language if translation is missing
    
    interpolation: {
      escapeValue: false, // react already does escaping
    },
    
    // Additional options for React Native
    compatibilityJSON: 'v4', // Use v4 for better compatibility
    
    // Debug mode - set to false in production
    debug: __DEV__,
    
    // React options
    react: {
      useSuspense: false, // Important for React Native
    },
  });

export default i18n;

// Export the translation function
export const { t } = i18n;
