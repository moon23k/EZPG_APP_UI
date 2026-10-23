import { type ReactNode } from 'react';
import type { ColorScheme, Theme, Themes } from '../types';
export type ThemeProviderProps = {
  /** createTheme() 결과. 기본값은 기본 테마 */
  themes?: Themes;
  /** 기본값 'light'. 'system'은 기기 설정을 따른다 */
  colorScheme?: ColorScheme | 'system';
  children: ReactNode;
};
export declare function ThemeProvider({
  themes,
  colorScheme,
  children,
}: ThemeProviderProps): import('react').JSX.Element;
/** 가장 가까운 ThemeProvider의 테마. Provider가 없으면 기본 light 테마 */
export declare function useTheme(): Theme;
