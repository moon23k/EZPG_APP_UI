const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');

const root = path.resolve(__dirname, '..', 'packages', 'native-ui');

// 패키지 src를 라이브러리 preset으로 변환한다.
module.exports = getConfig(
  {
    presets: ['module:@react-native/babel-preset'],
    // 반드시 마지막 플러그인
    plugins: ['react-native-worklets/plugin'],
  },
  { root }
);
