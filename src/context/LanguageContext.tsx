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
  t: (key: string, options?: any) => string;
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

  const contextValue: LanguageContextProps = {
    locale,
    setLocale,
    supportedLanguages,
    isLoading,
    t,
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
    // If the provider isn't mounted, return a safe fallback using the i18n singleton
    // so components can still read current language and call t().
    const fallbackLocale = i18n?.language || getCurrentLanguage();
    return {
      locale: fallbackLocale,
      // setLocale will attempt to change i18n language but won't rely on provider
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
      t: i18n && typeof i18n.t === 'function' ? i18n.t.bind(i18n) : (k: string, o?: any) => k,
    } as LanguageContextProps;
  }

  return context;
};
