// Jest setup for React Native project
// Mock AsyncStorage native module
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-vector-icons to avoid native font linking in tests
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

// SafeAreaContext official mock
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock')
);

// Screens mock (avoid native deps)
jest.mock('react-native-screens', () => ({
  enableScreens: () => {},
  screensEnabled: () => false,
}));

// Gesture handler mock
jest.mock('react-native-gesture-handler', () => {
  const RNGH = require('react-native-gesture-handler/jestSetup');
  return RNGH;
});
