// Helper utilities for i18n
import i18n from '@/i18n/locales/i18n';

/**
 * Get the current language code
 */
export const getCurrentLanguage = (): string => {
  return i18n.language || 'en';
};

/**
 * Change the current language
 */
export const changeLanguage = async (language: string): Promise<void> => {
  await i18n.changeLanguage(language);
};

/**
 * Check if current language is Hindi
 */
export const isHindi = (): boolean => {
  return getCurrentLanguage() === 'hi';
};

/**
 * Check if current language is Marathi
 */
export const isMarathi = (): boolean => {
  return getCurrentLanguage() === 'mr';
};

/**
 * Check if current language is English
 */
export const isEnglish = (): boolean => {
  return getCurrentLanguage() === 'en';
};

/**
 * Get language name for API calls
 */
export const getLanguageForAPI = (): string => {
  const lang = getCurrentLanguage();
  switch (lang) {
    case 'hi':
      return 'hindi';
    case 'mr':
      return 'marathi';
    default:
      return 'english';
  }
};

/**
 * Get short language code for API calls
 */
export const getShortLanguageCode = (): string => {
  const lang = getCurrentLanguage();
  return lang === 'hi' ? 'hi' : lang === 'mr' ? 'mr' : 'en';
};
