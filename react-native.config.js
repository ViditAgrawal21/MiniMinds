module.exports = {
  assets: ['./src/assets/fonts'],
  dependencies: {
    'react-native-sqlite-storage': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-sqlite-storage/platforms/android',
          packageImportPath: 'import org.pgsqlite.SQLitePluginPackage;',
          packageInstance: 'new SQLitePluginPackage()',
        },
        ios: {
          podspecPath: '../node_modules/react-native-sqlite-storage/react-native-sqlite-storage.podspec',
        },
      },
    },
  },
};
