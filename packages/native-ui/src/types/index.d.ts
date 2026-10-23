import type { TextStyle } from 'react-native';
export type ColorScheme = 'light' | 'dark';
export type ThemeColors = {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
  primary: string;
  primaryForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  info: string;
  infoForeground: string;
};
export type TypographyVariant =
  'caption' | 'body' | 'bodyLg' | 'title' | 'display';
export type TypographyToken = {
  fontSize: number;
  lineHeight: number;
  fontWeight: TextStyle['fontWeight'];
};
export type ThemeTokens = {
  space: {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    8: number;
    10: number;
    12: number;
    16: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  typography: Record<TypographyVariant, TypographyToken>;
  /** undefined이면 시스템 폰트 */
  fontFamily: string | undefined;
  /** 기기 글자 크기 설정이 적용되는 최대 배율 */
  maxFontScale: number;
  /** `boxShadow` 값 (New Architecture) */
  shadow: {
    sm: string;
    md: string;
  };
  motion: {
    duration: number;
  };
  opacity: {
    pressed: number;
    disabled: number;
  };
  iconSize: {
    sm: number;
    md: number;
  };
  /** 최소 터치 영역 (iOS 44, Android 48) */
  minTouchSize: number;
};
export type Theme = ThemeTokens & {
  scheme: ColorScheme;
  colors: ThemeColors;
};
export type Themes = Record<ColorScheme, Theme>;
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export type ThemeOverrides = DeepPartial<ThemeTokens> & {
  /** light · dark 공통 */
  colors?: Partial<ThemeColors>;
  /** dark에만 적용 (colors보다 우선) */
  dark?: {
    colors?: Partial<ThemeColors>;
  };
};
export {};
