import type { TextStyle } from 'react-native';

export type ColorScheme = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
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
  radius: { sm: number; md: number; lg: number; full: number };
  typography: Record<TypographyVariant, TypographyToken>;
  fontFamily: string | undefined;
  maxFontScale: number;
  shadow: { sm: string; md: string };
  motion: { duration: number };
  opacity: { pressed: number; disabled: number };
  iconSize: { sm: number; md: number };
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
  colors?: Partial<ThemeColors>;
  dark?: { colors?: Partial<ThemeColors> };
};
