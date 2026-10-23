import { render } from '@testing-library/react-native';
import fs from 'node:fs';
import path from 'node:path';
import type { ComponentType, ReactNode } from 'react';
import { ThemeProvider } from '../packages/app-ui/src/index';

// 모든 *.stories.tsx의 각 스토리를 light · dark로 렌더한다. 스토리가 곧 smoke test다.

type Story = {
  args?: object;
  render?: (args: object, ctx: object) => ReactNode;
};
type StoryModule = {
  default: { title: string; component?: ComponentType<object>; args?: object };
  [name: string]: unknown;
};

function findStories(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory())
      return entry.name === 'node_modules' ? [] : findStories(full);
    return entry.name.endsWith('.stories.tsx') ? [full] : [];
  });
}

export function renderAllStories(dir: string) {
  const cases = findStories(dir).flatMap((file) => {
    const mod: StoryModule = require(file);
    const { title, component: Component, args: metaArgs } = mod.default;
    return Object.entries(mod)
      .filter(([name]) => name !== 'default')
      .map(([name, value]) => {
        const story = value as Story;
        const args = { ...metaArgs, ...story.args };
        const element = story.render ? (
          story.render(args, {})
        ) : Component ? (
          <Component {...args} />
        ) : null;
        return [`${title} / ${name}`, element] as const;
      });
  });

  if (cases.length === 0) {
    it.todo(`stories in ${dir}`);
    return;
  }

  describe.each(['light', 'dark'] as const)('stories (%s)', (scheme) => {
    it.each(cases)('%s renders', async (_, element) => {
      await render(
        <ThemeProvider colorScheme={scheme}>{element}</ThemeProvider>
      );
    });
  });
}
