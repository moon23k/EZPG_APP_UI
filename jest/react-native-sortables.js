// reanimated 4.7은 jest에서 네이티브 초기화 코드를 불러와 실패한다.
// 정렬 동작은 기기에서 확인하고, 테스트는 렌더 · 콜백 연결만 본다.
const React = require('react');
const { View } = require('react-native');

function Grid({ data, renderItem, keyExtractor }) {
  return React.createElement(
    View,
    null,
    data.map((item, index) =>
      React.createElement(
        View,
        { key: keyExtractor(item) },
        renderItem({ item, index })
      )
    )
  );
}

function Handle({ children }) {
  return children;
}

module.exports = { __esModule: true, default: { Grid, Handle } };
