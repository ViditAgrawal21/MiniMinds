// Main i18n instance
export { default } from './i18n';

// Language management utilities
export {
  changeLanguage,
  getCurrentLanguage,
  getSupportedLanguages,
  loadSavedLanguage,
  isLanguageSupported,
  getLanguageName,
  supportedLanguages,
} from './languageManager';

// React hooks - prefer using the context-based hooks for better integration
export { useTranslation } from 'react-i18next';

// Direct translation function (use sparingly, prefer context-based t function)
export { t } from './i18n';
