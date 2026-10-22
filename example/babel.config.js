const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');

const packages = ['native-ui', 'native-blocks'].map((name) =>
  path.resolve(__dirname, '..', 'packages', name)
);

// 각 패키지의 src를 라이브러리 preset으로 변환한다.
module.exports = packages.reduce(
  (config, root) => getConfig(config, { root }),
  {
    presets: ['module:@react-native/babel-preset'],
  }
);
