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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
