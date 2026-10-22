const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
  conditions: ['ezpg-native-ui-source', 'ezpg-native-blocks-source'],
});

// 카탈로그가 src/**/*.stories.tsx를 자동으로 읽는다.
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
