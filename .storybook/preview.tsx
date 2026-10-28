import type { Decorator, Preview } from '@storybook/react-native-web-vite';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import {
  defaultThemes,
  makeStyles,
  ThemeProvider,
} from '../packages/app-ui/src';

const useStyles = makeStyles((t) => ({
  canvas: {
    flex: 1,
    padding: t.space[4],
    backgroundColor: t.colors.background,
  },
}));

function Canvas({ children }: { children: ReactNode }) {
  return <View style={useStyles().canvas}>{children}</View>;
}

const withTheme: Decorator = (Story, { globals }) => (
  <ThemeProvider themes={defaultThemes} colorScheme={globals.scheme}>
    <Canvas>
      <Story />
    </Canvas>
  </ThemeProvider>
);

const preview: Preview = {
  globalTypes: {
    scheme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Scheme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { scheme: 'light' },
  decorators: [withTheme],
  parameters: { layout: 'fullscreen' },
};

export default preview;
