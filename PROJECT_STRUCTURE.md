# ThoughtPro Project Structure

This document outlines the complete folder structure implemented in ThoughtPro, based on the Aurom-User-App template.

## 📁 Folder Structure

```
ThoughtPro/
├── src/
│   ├── app/                          # Application screens
│   │   └── [Your screen folders here]
│   ├── assets/                       # Static assets
│   │   ├── fonts/                    # Font files
│   │   ├── icons/                    # Icon assets
│   │   └── images/                   # Image assets
│   ├── auth/                         # Authentication screens
│   │   ├── loginScreen/
│   │   │   └── login.js
│   │   ├── onboardingScreen/
│   │   │   └── onboarding.js
│   │   └── splashScreen/
│   │       └── splash.js
│   ├── components/                   # Reusable UI components
│   │   ├── CustomButton.js
│   │   ├── CustomTextInput.js
│   │   ├── Header.js
│   │   ├── LoadingSpinner.js
│   │   └── index.js                  # Component exports
│   ├── Configs/                      # Configuration files
│   │   └── API/
│   │       ├── index.js              # API configuration
│   │       └── Endpoints.js          # API endpoints
│   ├── context/                      # React Context providers
│   │   └── themeContext.js           # Theme management
│   ├── Hooks/                        # Custom React hooks
│   │   ├── UseFetch/
│   │   │   └── index.js              # API fetch hook
│   │   └── useNetworkStatus.js       # Network status hook
│   ├── navigator/                    # Navigation configuration
│   │   └── AppNavigation.js          # Main stack navigation
│   ├── ReduxState/                   # Redux state management
│   │   ├── ReducerHelpers/
│   │   │   └── index.js              # Redux helper functions
│   │   ├── Slices/
│   │   │   ├── authSlice.js          # Authentication slice
│   │   │   └── index.js              # Combined reducers
│   │   └── index.js                  # Store configuration
│   └── utils/                        # Utility functions
│       ├── axiosInstance.js          # HTTP client configuration
│       ├── constants.js              # App constants
│       ├── errorHandling.js          # Error handling utilities
│       ├── helpers.js                # General helper functions
│       ├── useBackPress.js           # Android back press hook
│       └── index.js                  # Utility exports
└── App.tsx                           # Main app component
```

## 🛠️ Key Features Implemented

### 1. State Management (Redux)
- **Redux Toolkit** for efficient state management
- **Redux Persist** for state persistence
- Pre-configured **auth slice** for authentication
- Helper functions for easy state access

### 2. Navigation
- **React Navigation v6** setup
- Stack navigation configured
- Deep linking support ready
- Theme integration with navigation

### 3. Theme System
- Clean light theme configuration
- Context-based theme management
- Navigation theme integration
- Consistent color palette

### 4. Component Library
- Reusable UI components (Button, TextInput, Header, etc.)
- Consistent styling patterns
- Theme-aware components

### 5. API Integration
- Axios instance with interceptors
- API endpoints configuration
- Custom fetch hook
- Error handling utilities

### 6. Utilities
- Storage helpers (AsyncStorage)
- Validation functions
- Format utilities
- Error handling
- Network status monitoring

## 🚀 Getting Started

### Dependencies Installed
```bash
@reduxjs/toolkit
react-redux
redux-persist
redux
@react-native-async-storage/async-storage
react-native-vector-icons
axios
```

### 📱 **Your Next Steps:**

1. **Create your specific screen folders** (home, profile, settings, etc.)
2. **Add screens to navigation** in `src/navigator/AppNavigation.js`:
   ```javascript
   // Import your screen
   import YourScreen from '../app/yourScreen/yourScreen';
   
   // Add to Stack.Navigator
   <Stack.Screen name="YourScreen" component={YourScreen} />
   ```
3. **Navigate between screens** using:
   ```javascript
   navigation.navigate('ScreenName')     // Push new screen
   navigation.replace('ScreenName')      // Replace current screen
   navigation.goBack()                   // Go back to previous screen
   ```
4. Build your screens using the provided components and utilities
5. Add your API endpoints to the configuration
6. Customize the theme colors to match your brand

## 📝 Example Screen Template

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/themeContext';
import { Header, CustomButton } from '../../components';
import { useSelector, useDispatch } from 'react-redux';

const YourScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Header 
        title="Your Screen" 
        onLeftPress={() => navigation.goBack()} 
      />
      <View style={styles.content}>
        <Text style={styles.title}>Your Screen Content</Text>
        <CustomButton 
          title="Navigate to Another Screen"
          onPress={() => navigation.navigate('AnotherScreen')}
          loading={loading}
        />
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
});

export default YourScreen;
```

## 🎯 Ready to Use

Your project now has a complete, production-ready folder structure with:
- ✅ State management setup
- ✅ Navigation configured
- ✅ Theme system implemented
- ✅ Reusable components
- ✅ API integration ready
- ✅ Utility functions
- ✅ Error handling
- ✅ Storage utilities

You can now focus on building your specific screens and features!
