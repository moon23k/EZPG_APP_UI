import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import type { ColorScheme, Theme, Themes } from '../types';
import { defaultThemes } from './create-theme';

const ThemeContext = createContext<Theme>(defaultThemes.light);

export type ThemeProviderProps = {
  themes?: Themes;
  colorScheme?: ColorScheme | 'system';
  children: ReactNode;
};

export function ThemeProvider({
  themes = defaultThemes,
  colorScheme = 'light',
  children,
}: ThemeProviderProps) {
  const device = useColorScheme();
  const scheme: ColorScheme =
    colorScheme === 'system'
      ? device === 'dark'
        ? 'dark'
        : 'light'
      : colorScheme;
  const theme = useMemo(() => themes[scheme], [themes, scheme]);
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
