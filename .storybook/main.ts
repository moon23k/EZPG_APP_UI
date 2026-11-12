import type { StorybookConfig } from '@storybook/react-native-web-vite';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

const compiled = Object.fromEntries(
  [
    ['react-native-reanimated', 'lib/module/index'],
    ['react-native-worklets', 'lib/module/index'],
    ['react-native-gesture-handler', 'lib/module/index'],
    ['react-native-sortables', 'dist/module/index'],
    ['react-native-svg', 'lib/module/index'],
  ].map(([name, entry]) => {
    const dir = path.dirname(
      require.resolve(`${name}/package.json`, {
        paths: [path.resolve('packages/app-ui')],
      })
    );
    return [name, path.join(dir, entry!)];
  })
);

const reanimatedSrc = /^react-native-reanimated\/src\/(.*)$/;
const reanimatedLib = path.dirname(compiled['react-native-reanimated']!);
const reanimatedSrcPlugin = {
  name: 'reanimated-src-to-lib',
  resolveId(id: string) {
    const match = reanimatedSrc.exec(id);
    if (!match) return null;
    const file = path.join(reanimatedLib, `${match[1]}.js`);
    return fs.existsSync(file) ? file : null;
  },
};

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
  viteFinal: (vite) => ({
    ...vite,
    plugins: [reanimatedSrcPlugin, ...(vite.plugins ?? [])],
    optimizeDeps: {
      ...vite.optimizeDeps,
      include: [
        ...(vite.optimizeDeps?.include ?? []),
        ...Object.keys(compiled).filter(
          (name) => name !== 'react-native-sortables'
        ),
      ],
      exclude: [
        ...(vite.optimizeDeps?.exclude ?? []),
        'react-native-sortables',
      ],
      rolldownOptions: {
        ...vite.optimizeDeps?.rolldownOptions,
        shimMissingExports: true,
        plugins: [reanimatedSrcPlugin],
      },
    },
    resolve: {
      ...vite.resolve,
      alias: [
        ...Object.entries(compiled).map(([name, entry]) => ({
          find: new RegExp(`^${name}$`),
          replacement: entry,
        })),
        ...(Array.isArray(vite.resolve?.alias)
          ? vite.resolve.alias
          : Object.entries(vite.resolve?.alias ?? {}).map(
              ([find, replacement]) => ({
                find,
                replacement: replacement as string,
              })
            )),
      ],
      conditions: ['zdot-app-ui-source', ...(vite.resolve?.conditions ?? [])],
    },
  }),
};

export default config;
