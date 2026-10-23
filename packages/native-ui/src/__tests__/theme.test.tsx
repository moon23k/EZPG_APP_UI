import { act, render, renderHook } from '@testing-library/react-native';
import { useState, type ReactNode } from 'react';
import { Text } from 'react-native';
import {
  createTheme,
  defaultThemes,
  makeStyles,
  ThemeProvider,
  useTheme,
  type Themes,
} from '../index';
import { contrastRatio } from '../utils/color';

const mockScheme = jest.fn<'light' | 'dark' | null, []>(() => 'dark');
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => mockScheme(),
}));

const wrap =
  (props: { themes?: Themes; colorScheme?: 'light' | 'dark' | 'system' }) =>
  ({ children }: { children: ReactNode }) => (
    <ThemeProvider {...props}>{children}</ThemeProvider>
  );

describe('createTheme', () => {
  it('picks a readable foreground for a brand primary', () => {
    const yellow = createTheme({ colors: { primary: '#facc15' } });
    const blue = createTheme({ colors: { primary: '#2563eb' } });
    expect(yellow.light.colors.primaryForeground).toBe(
      defaultThemes.light.colors.foreground
    );
    expect(blue.light.colors.primaryForeground).toBe('#ffffff');
    expect(
      contrastRatio('#2563eb', blue.light.colors.primaryForeground)
    ).toBeGreaterThan(4.5);
  });

  it('merges partial tokens and dark-only colors', () => {
    const themes = createTheme({
      radius: { md: 10 },
      colors: { primary: '#2563eb' },
      dark: { colors: { primary: '#60a5fa' } },
    });
    expect(themes.light.radius).toEqual({
      ...defaultThemes.light.radius,
      md: 10,
    });
    expect(themes.light.colors.primary).toBe('#2563eb');
    expect(themes.dark.colors.primary).toBe('#60a5fa');
    expect(themes.dark.colors.background).toBe(
      defaultThemes.dark.colors.background
    );
  });
});

describe('ThemeProvider', () => {
  it('defaults to light regardless of the device', async () => {
    const { result } = await renderHook(useTheme, { wrapper: wrap({}) });
    expect(result.current.scheme).toBe('light');
  });

  it('follows the device in system mode', async () => {
    const { result } = await renderHook(useTheme, {
      wrapper: wrap({ colorScheme: 'system' }),
    });
    expect(result.current.scheme).toBe('dark');
  });

  it('keeps the theme reference when the parent re-renders', async () => {
    const seen: unknown[] = [];
    let bump = () => {};
    function Probe() {
      seen.push(useTheme());
      return null;
    }
    function Parent() {
      const [n, setN] = useState(0);
      bump = () => setN(n + 1);
      return (
        <ThemeProvider>
          <Text>{n}</Text>
          <Probe />
        </ThemeProvider>
      );
    }
    await render(<Parent />);
    await act(async () => bump());
    expect(seen.length).toBeGreaterThan(1);
    expect(seen.every((t) => t === seen[0])).toBe(true);
  });
});

describe('makeStyles', () => {
  const useStyles = makeStyles((t) => ({ box: { padding: t.space[4] } }));

  it('returns the same styles for the same theme', async () => {
    const { result, rerender } = await renderHook(useStyles, {
      wrapper: wrap({}),
    });
    const first = result.current;
    await rerender({});
    expect(result.current).toBe(first);
    expect(first.box.padding).toBe(16);
  });
});
