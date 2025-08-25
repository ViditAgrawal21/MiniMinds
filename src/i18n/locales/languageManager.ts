import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use consistent storage key with the rest of the app
const LANGUAGE_KEY = 'selectedLanguage';

export const supportedLanguages = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
};

export const getCurrentLanguage = (): string => {
  return i18n.language || 'en';
};

export const changeLanguage = async (languageCode: string): Promise<void> => {
  try {
    if (!supportedLanguages.hasOwnProperty(languageCode)) {
      throw new Error(`Unsupported language: ${languageCode}`);
    }
    
    await i18n.changeLanguage(languageCode);
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
  } catch (error) {
    console.error('Error changing language:', error);
    throw error;
  }
};

export const loadSavedLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && supportedLanguages.hasOwnProperty(savedLanguage)) {
      await i18n.changeLanguage(savedLanguage);
      return savedLanguage;
    }
    return 'en'; // Default language
  } catch (error) {
    console.error('Error loading saved language:', error);
    return 'en';
  }
};

export const getSupportedLanguages = (): Record<string, string> => {
  return supportedLanguages;
};

export const isLanguageSupported = (languageCode: string): boolean => {
  return supportedLanguages.hasOwnProperty(languageCode);
};

// Helper function to get language name
export const getLanguageName = (languageCode: string): string => {
  return supportedLanguages[languageCode as keyof typeof supportedLanguages] || 'Unknown';
};
