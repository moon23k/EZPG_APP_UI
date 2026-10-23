import type { StorybookConfig } from '@storybook/react-native-web-vite';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

// 웹에서는 이 라이브러리들을 TS 원본(react-native 필드)이 아니라 컴파일된 빌드로 불러온다.
// worklets babel 플러그인이 TS 원본을 처리하지 못한다.
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
        paths: [path.resolve('packages/native-ui')],
      })
    );
    return [name, path.join(dir, entry!)];
  })
);

// gesture-handler가 reanimated의 TS 원본 경로를 직접 require한다. 컴파일된 파일로 바꾼다.
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
  // 워크스페이스 패키지는 빌드 결과(lib)가 아니라 소스를 본다.
  viteFinal: (vite) => ({
    ...vite,
    plugins: [reanimatedSrcPlugin, ...(vite.plugins ?? [])],
    // react-native-svg가 react-native-web에 없는 TurboModuleRegistry를 import한다(웹에서는 안 씀).
    // 첫 스토리를 열 때 재최적화가 일어나 모듈이 끊기지 않도록 시작할 때 미리 묶는다.
    optimizeDeps: {
      ...vite.optimizeDeps,
      include: [
        ...(vite.optimizeDeps?.include ?? []),
        ...Object.keys(compiled).filter(
          (name) => name !== 'react-native-sortables'
        ),
      ],
      // sortables는 worklet 함수를 쓰므로 미리 묶지 않고 babel(worklets 플러그인)을 거치게 한다.
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
      conditions: [
        'ezpg-native-ui-source',
        'ezpg-native-blocks-source',
        ...(vite.resolve?.conditions ?? []),
      ],
    },
  }),
};

export default config;
