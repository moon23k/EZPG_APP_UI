const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');

const root = path.resolve(__dirname, '..', 'packages', 'app-ui');

module.exports = getConfig(
  {
    presets: ['module:@react-native/babel-preset'],
    plugins: ['react-native-worklets/plugin'],
  },
  { root }
);
