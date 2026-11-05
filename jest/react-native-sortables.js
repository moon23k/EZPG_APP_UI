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
