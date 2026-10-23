import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import type { ColorScheme, Theme, Themes } from '../types';
import { defaultThemes } from './create-theme';

const ThemeContext = createContext<Theme>(defaultThemes.light);

export type ThemeProviderProps = {
  /** createTheme() 결과. 기본값은 기본 테마 */
  themes?: Themes;
  /** 기본값 'light'. 'system'은 기기 설정을 따른다 */
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

/** 가장 가까운 ThemeProvider의 테마. Provider가 없으면 기본 light 테마 */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}
