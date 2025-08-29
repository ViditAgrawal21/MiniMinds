/**
 * ThoughtPro React Native App
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { store, persistor } from './src/redux';
import { ThemeProvider } from './src/context/themeContext';
import { DatabaseProvider } from './src/context/DatabaseContext';
import AppNavigation from './src/navigation/AppNavigation';
import { LoadingSpinner } from './src/components';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <DatabaseProvider>
          <SafeAreaProvider>
            <ThemeProvider>
              <NavigationContainer>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <AppNavigation />
              </NavigationContainer>
            </ThemeProvider>
          </SafeAreaProvider>
        </DatabaseProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
