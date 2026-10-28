import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: fixupConfigRules(compat.extends('@react-native', 'prettier')),
    plugins: { prettier },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['packages/app-ui/src/**/*.tsx'],
    ignores: [
      '**/*.stories.tsx',
      '**/__stories__/**',
      '**/__tests__/**',
      'packages/app-ui/src/charts/**',
      'packages/app-ui/src/blocks/site-preview-frame/**',
      'packages/app-ui/src/blocks/color-swatch-picker/**',
    ],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Property[key.name=/^(fontSize|lineHeight|padding|paddingTop|paddingBottom|paddingLeft|paddingRight|paddingHorizontal|paddingVertical|margin|marginTop|marginBottom|marginLeft|marginRight|marginHorizontal|marginVertical|gap|rowGap|columnGap|borderRadius)$/][value.type="Literal"][value.value>0]',
          message: '글자 크기 · 간격 · 모서리는 테마 토큰을 쓰세요.',
        },
      ],
    },
  },
  {
    ignores: ['**/node_modules/', '**/lib/', 'storybook-static/'],
  },
]);
