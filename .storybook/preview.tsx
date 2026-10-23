import type { Decorator, Preview } from '@storybook/react-native-web-vite';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import {
  createTheme,
  defaultThemes,
  makeStyles,
  ThemeProvider,
  type Themes,
} from '../packages/app-ui/src';

const brands: Record<string, Themes> = {
  default: defaultThemes,
  blue: createTheme({ colors: { primary: '#2563eb' } }),
  yellow: createTheme({ colors: { primary: '#facc15' } }),
};

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
  <ThemeProvider
    themes={brands[globals.brand] ?? defaultThemes}
    colorScheme={globals.scheme}
  >
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
    brand: {
      description: 'Brand primary',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'blue', title: 'Blue #2563eb' },
          { value: 'yellow', title: 'Yellow #facc15' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { scheme: 'light', brand: 'default' },
  decorators: [withTheme],
  parameters: { layout: 'fullscreen' },
};

export default preview;
