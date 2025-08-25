module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jestSetup.js'],
  moduleNameMapper: {
    '^@Components/(.*)$': '<rootDir>/src/components/$1',
  },
  transformIgnorePatterns: [
  'node_modules/(?!(react-native|@react-native|react-native-.*|@react-navigation|react-redux|@reduxjs/toolkit|redux-persist|react-clone-referenced-element)/)'
  ],
};
