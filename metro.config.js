const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const projectRoot = __dirname;
const config = {
	watchFolders: [projectRoot],
	resolver: {
		extraNodeModules: {
			'@Components': path.resolve(projectRoot, 'src/components'),
		},
		blacklistRE: /(ios\/.*|android\/.*)/,
	},
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
