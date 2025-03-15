const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: {sourceExts, assetExts},
} = defaultConfig;
const path = require('path');

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const config = {
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
  },
  watchFolders: [path.resolve(__dirname, '../')],
};
module.exports = wrapWithReanimatedMetroConfig(config);
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
