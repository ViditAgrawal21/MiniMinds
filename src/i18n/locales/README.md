# Language Context & Internationalization (i18n) System

A comprehensive language management system for ThoughtPro app with proper state management, persistence, and React Native integration.

## Features

- **Centralized Language Management**: Single source of truth for language state
- **Automatic Persistence**: Languages are automatically saved and restored
- **Real-time Switching**: Instant language changes across the entire app
- **Type Safety**: Full TypeScript support with proper typing
- **Loading States**: Proper loading indicators during language changes
- **Error Handling**: Graceful error handling with user feedback
- **Consistent API**: Single hook interface for all language operations

## Architecture

```
src/
├── app/
│   ├── context/
│   │   └── LanguageContext.tsx      # Main language context provider
│   └── i18n/
│       ├── i18n.ts                  # i18next configuration
│       ├── languageManager.ts       # Language utilities
│       └── index.ts                 # Exports
├── Hooks/
│   └── useLanguage.ts              # Custom hook for language access
├── locales/
│   ├── en/translation.json         # English translations
│   ├── hi/translation.json         # Hindi translations
│   └── mr/translation.json         # Marathi translations
└── components/
    ├── LanguageSwitcher.tsx        # Language selector component
    └── LanguageExample.tsx         # Usage example
```

## Quick Start

### 1. Provider Setup (Already configured in App.tsx)

```tsx
import { LanguageProvider } from '@/app/context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      {/* Your app components */}
    </LanguageProvider>
  );
}
```

### 2. Basic Usage in Components

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useLanguage } from '@/app/context/LanguageContext';

const MyComponent = () => {
  const { t, locale, setLocale } = useLanguage();

  return (
    <View>
      <Text>{t('welcome', 'Welcome!')}</Text>
      <Text>Current: {locale}</Text>
    </View>
  );
};
```

### 3. Language Switching

```tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useLanguage } from '@/app/context/LanguageContext';

const LanguageButton = () => {
  const { setLocale, supportedLanguages } = useLanguage();

  const changeToHindi = async () => {
    try {
      await setLocale('hi');
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <TouchableOpacity onPress={changeToHindi}>
      <Text>Switch to Hindi</Text>
    </TouchableOpacity>
  );
};
```

## API Reference

### useLanguage Hook

```tsx
const {
  locale,              // Current language code (string)
  setLocale,           // Function to change language (async)
  supportedLanguages,  // Available languages object
  isLoading,          // Loading state boolean
  t,                  // Translation function
} = useLanguage();
```

#### Methods

- **`setLocale(languageCode: string): Promise<void>`**
  - Changes the current language
  - Automatically persists to AsyncStorage
  - Updates i18n instance
  - Triggers re-render of all consuming components

- **`t(key: string, fallback?: string): string`**
  - Translates a key to current language
  - Returns fallback if key not found
  - Example: `t('welcome', 'Welcome!')`

#### Properties

- **`locale: string`** - Current language code ('en', 'hi', 'mr')
- **`supportedLanguages: Record<string, string>`** - Available languages
- **`isLoading: boolean`** - True during language changes

## Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| `en` | English  | English     |
| `hi` | Hindi    | हिंदी        |
| `mr` | Marathi  | मराठी        |

## Translation Keys Structure

Translation keys follow a hierarchical structure:

```json
{
  "navigation": {
    "home": "Home",
    "insights": "Insights",
    "mindTools": "Mind Tools",
    "profile": "Profile"
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "ok": "OK",
    "cancel": "Cancel"
  },
  "languageSelect": {
    "selectLanguage": "Select Language",
    "english": "English",
    "hindi": "हिंदी",
    "marathi": "मराठी"
  }
}
```

## Best Practices

### 1. Always use the Context Hook

```tsx
// ✅ Good - Uses context for consistency
const { t } = useLanguage();

// ❌ Avoid - Direct i18n usage bypasses context
import { t } from 'react-i18next';
```

### 2. Handle Loading States

```tsx
const MyComponent = () => {
  const { t, isLoading } = useLanguage();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <Text>{t('content')}</Text>;
};
```

### 3. Provide Fallbacks

```tsx
// Always provide fallback text
const title = t('screen.title', 'Default Title');
```

### 4. Use Semantic Keys

```tsx
// ✅ Good - Semantic and hierarchical
t('profile.settings.language')

// ❌ Avoid - Generic or unclear
t('text1')
```

### 5. Handle Errors Gracefully

```tsx
const handleLanguageChange = async (lang: string) => {
  try {
    await setLocale(lang);
  } catch (error) {
    Alert.alert(
      t('error', 'Error'),
      t('languageChangeFailed', 'Failed to change language')
    );
  }
};
```

## Advanced Features

### Custom Language Detection

The system automatically detects and loads the previously selected language on app startup.

### Type-Safe Translations

The context provides type-safe access to all translation features:

```tsx
interface LanguageContextProps {
  locale: string;
  setLocale: (locale: string) => Promise<void>;
  supportedLanguages: Record<string, string>;
  isLoading: boolean;
  t: (key: string, options?: any) => string;
}
```

### Error Boundaries

The context includes proper error handling for failed language changes:

```tsx
const setLocale = useCallback(async (newLocale: string) => {
  try {
    setIsLoading(true);
    await changeLanguage(newLocale);
    setLocaleState(newLocale);
  } catch (error) {
    console.error('Error changing language:', error);
    throw error; // Re-throw for component handling
  } finally {
    setIsLoading(false);
  }
}, []);
```

## Migration Guide

If you're updating from the old language system:

1. **Replace direct i18n usage** with the context hook
2. **Update language change calls** to use the async `setLocale` function
3. **Add loading state handling** where appropriate
4. **Use the unified storage key** (`selectedLanguage`)

### Before

```tsx
import { changeLanguage } from '@/app/i18n/languageManager';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
changeLanguage('hi'); // Sync call
```

### After

```tsx
import { useLanguage } from '@/app/context/LanguageContext';

const { t, setLocale, isLoading } = useLanguage();
await setLocale('hi'); // Async call
```

## Troubleshooting

### Common Issues

1. **Translations not updating**: Ensure you're using the context hook, not direct i18n
2. **Loading states**: Always handle the `isLoading` state for better UX
3. **Storage conflicts**: Use consistent `selectedLanguage` key across the app
4. **Missing fallbacks**: Always provide fallback text for translations

### Debug Mode

Enable debug mode in development:

```tsx
// In i18n.ts
debug: __DEV__, // Already configured
```

This will log translation key misses and other i18n events to the console.

## Performance Considerations

- **Lazy Loading**: Translations are loaded on-demand
- **Caching**: Language preferences are cached in AsyncStorage
- **Re-rendering**: Only components using the hook re-render on language change
- **Memory**: Minimal memory footprint with efficient state management

## Contributing

When adding new languages:

1. Add language code to `supportedLanguages` in `languageManager.ts`
2. Create translation file in `src/locales/{code}/translation.json`
3. Import translations in `i18n.ts`
4. Test all flows with the new language

## Installation

The required packages are already installed:
```bash
yarn add react-i18next i18next
```

## See Also

- [React Native i18n Best Practices](https://react.i18next.com/)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [TypeScript React Context Patterns](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context)
