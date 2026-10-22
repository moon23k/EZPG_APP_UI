import type { Decorator, Preview } from '@storybook/react-native-web-vite';
import { StyleSheet, View } from 'react-native';

// Phase 1에서 ThemeProvider로 교체한다. 지금은 배경만 전환한다.
const withTheme: Decorator = (Story, context) => (
  <View
    style={[
      styles.canvas,
      {
        backgroundColor:
          context.globals.theme === 'dark' ? '#0a0a0a' : '#ffffff',
      },
    ]}
  >
    <Story />
  </View>
);

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
  },
};

const styles = StyleSheet.create({
  canvas: { flex: 1, padding: 16 },
});

export default preview;
