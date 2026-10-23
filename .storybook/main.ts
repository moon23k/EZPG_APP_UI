import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  stories: ['../packages/*/src/**/*.stories.@(ts|tsx)'],
  core: { disableTelemetry: true },
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      pluginReactOptions: {
        babel: { plugins: ['react-native-worklets/plugin'] },
      },
    },
  },
  // 워크스페이스 패키지는 빌드 결과(lib)가 아니라 소스를 본다.
  viteFinal: (vite) => ({
    ...vite,
    resolve: {
      ...vite.resolve,
      conditions: [
        'ezpg-native-ui-source',
        'ezpg-native-blocks-source',
        ...(vite.resolve?.conditions ?? []),
      ],
    },
  }),
};

export default config;
