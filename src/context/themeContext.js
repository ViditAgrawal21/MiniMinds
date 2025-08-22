import React, {createContext, useContext} from 'react';
import {DefaultTheme} from '@react-navigation/native';

// Custom light theme configuration
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF9500',
    text: '#000000',
    subtext: '#666666',
    border: '#E5E5E5',
    card: '#F8F9FA',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
  },
};

// Create the theme context
const ThemeContext = createContext({
  theme: CustomLightTheme,
});

// Theme Provider Component
export const ThemeProvider = ({children}) => {
  return (
    <ThemeContext.Provider
      value={{
        theme: CustomLightTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
