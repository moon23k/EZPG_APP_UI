import type { ComponentType, ReactNode } from 'react';

type StoryArgs = Record<string, unknown>;

type StoryObject = {
  name?: string;
  args?: StoryArgs;
  render?: (args: StoryArgs, context: unknown) => ReactNode;
};

type StoryModule = {
  default: {
    title: string;
    component?: ComponentType<StoryArgs>;
    args?: StoryArgs;
  };
  [exportName: string]: unknown;
};

export type CatalogStory = {
  id: string;
  name: string;
  render: () => ReactNode;
};

export type CatalogEntry = {
  title: string;
  stories: CatalogStory[];
};

// Storybook(web)과 같은 packages/*/src/**/*.stories.tsx를 그대로 읽는다. 카탈로그를 따로 관리하지 않는다.
const context = require.context(
  '../../../packages',
  true,
  /^\.\/[^/]+\/src\/.*\.stories\.tsx$/
);

const startCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());

function toEntry(mod: StoryModule): CatalogEntry {
  const meta = mod.default;
  const stories = Object.entries(mod)
    .filter(
      ([key, value]) =>
        key !== 'default' && typeof value === 'object' && value !== null
    )
    .map(([key, value]) => {
      const story = value as StoryObject;
      const args = { ...meta.args, ...story.args };
      const Component = meta.component;
      return {
        id: `${meta.title}/${key}`,
        name: story.name ?? startCase(key),
        render: () =>
          story.render ? (
            story.render(args, {})
          ) : Component ? (
            <Component {...args} />
          ) : null,
      };
    });
  return { title: meta.title, stories };
}

export const catalog: CatalogEntry[] = context
  .keys()
  .map((key) => toEntry(context(key) as StoryModule))
  .sort((a, b) => a.title.localeCompare(b.title));
