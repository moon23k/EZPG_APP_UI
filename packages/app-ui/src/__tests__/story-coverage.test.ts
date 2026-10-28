import fs from 'node:fs';
import path from 'node:path';
import * as charts from '../charts';
import * as main from '../index';
import * as sortable from '../sortable';

const root = path.resolve(__dirname, '..');

function storyFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return storyFiles(full);
    return entry.name.endsWith('.stories.tsx') ? [full] : [];
  });
}

const infrastructure =
  /^(ThemeProvider|ToastProvider|ToastHost|PressableBase)$|Glyph$/;

it('every exported component has a story', () => {
  const covered = new Set(
    storyFiles(root).flatMap((file) =>
      [
        ...fs
          .readFileSync(file, 'utf8')
          .matchAll(/import \{([^}]+)\} from '\.\.?\/[^']+'/g),
      ].flatMap((m) => m[1]!.split(',').map((n) => n.trim()))
    )
  );
  const components = Object.entries({ ...main, ...charts, ...sortable })
    .filter(
      ([name, value]) =>
        /^[A-Z]/.test(name) &&
        !infrastructure.test(name) &&
        (typeof value === 'function' ||
          (typeof value === 'object' && value !== null && '$$typeof' in value))
    )
    .map(([name]) => name);
  expect(components.filter((name) => !covered.has(name))).toEqual([]);
});
