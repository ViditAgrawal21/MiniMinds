import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useTranslation } from 'react-i18next';
import i18n from "@/i18n/locales/i18n";
import { changeLanguage, getCurrentLanguage, getSupportedLanguages } from "@/i18n/locales/languageManager";

export interface LanguageContextProps {
  locale: string;
  setLocale: (locale: string) => Promise<void>;
  supportedLanguages: Record<string, string>;
  isLoading: boolean;
  t: (key: string, fallback?: string) => string;  // ✅ CHANGED
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [locale, setLocaleState] = useState<string>(getCurrentLanguage());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supportedLanguages = getSupportedLanguages();

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        setIsLoading(true);
        const currentLang = getCurrentLanguage();
        setLocaleState(currentLang);
      } catch (error) {
        console.error('Error initializing language:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, []);

  // Listen to i18n language changes
  useEffect(() => {
    const onLanguageChanged = (lng: string) => {
      setLocaleState(lng);
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, []);

  const setLocale = useCallback(async (newLocale: string) => {
    try {
      setIsLoading(true);
      await changeLanguage(newLocale);
      setLocaleState(newLocale);
    } catch (error) {
      console.error('Error changing language:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ NEW: Wrapper function to handle fallback text properly
  const tWithFallback = useCallback((key: string, fallback?: string): string => {
    try {
      const translation = t(key);
      // If translation equals the key, it means the key wasn't found
      if (translation === key && fallback) {
        return fallback;
      }
      return String(translation || fallback || key);
    } catch (error) {
      console.error('Translation error:', error);
      return fallback || key;
    }
  }, [t]);

  const contextValue: LanguageContextProps = {
    locale,
    setLocale,
    supportedLanguages,
    isLoading,
    t: tWithFallback,  // ✅ CHANGED from 't' to 'tWithFallback'
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    const fallbackLocale = i18n?.language || getCurrentLanguage();
    return {
      locale: fallbackLocale,
      setLocale: async (newLocale: string) => {
        try {
          await changeLanguage(newLocale);
        } catch (err) {
          console.error('Fallback setLocale error:', err);
          throw err;
        }
      },
      supportedLanguages: getSupportedLanguages(),
      isLoading: false,
      // ✅ CHANGED: Fallback t function
      t: i18n && typeof i18n.t === 'function' 
        ? (key: string, fallback?: string): string => {
            try {
              const translation = i18n.t(key);
              return String(translation === key && fallback ? fallback : translation);
            } catch {
              return fallback || key;
            }
          }
        : (k: string, fallback?: string) => fallback || k,
    } as LanguageContextProps;
  }

  return context;
};