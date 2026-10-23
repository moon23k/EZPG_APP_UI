import type {
  ColorScheme,
  Theme,
  ThemeColors,
  ThemeOverrides,
  Themes,
} from '../types';
import { pickForeground } from '../utils/color';
import { colors, tokens } from './tokens';

type Plain = Record<string, unknown>;

function merge<T>(base: T, override: unknown): T {
  if (override === undefined) return base;
  if (
    typeof base !== 'object' ||
    base === null ||
    typeof override !== 'object'
  ) {
    return override as T;
  }
  const result: Plain = { ...(base as Plain) };
  for (const [key, value] of Object.entries(override as Plain)) {
    result[key] = merge(result[key], value);
  }
  return result as T;
}

function resolveColors(
  scheme: ColorScheme,
  override: Partial<ThemeColors>
): ThemeColors {
  const base = colors[scheme];
  const result = { ...base, ...override };
  // primary만 바꾸면 그 위 글자색은 대비로 정한다.
  if (override.primary && !override.primaryForeground) {
    result.primaryForeground = pickForeground(
      override.primary,
      colors.light.foreground,
      '#ffffff'
    );
  }
  return result;
}

/**
 * 기본 토큰에 overrides를 덮어 light · dark 테마를 만든다.
 * 렌더 밖(모듈 최상단)이나 useMemo 안에서 호출한다.
 */
export function createTheme(overrides: ThemeOverrides = {}): Themes {
  const { colors: shared = {}, dark = {}, ...rest } = overrides;
  const base = merge(tokens, rest);
  const build = (
    scheme: ColorScheme,
    override: Partial<ThemeColors>
  ): Theme => ({
    ...base,
    scheme,
    colors: resolveColors(scheme, override),
  });
  return {
    light: build('light', shared),
    dark: build('dark', { ...shared, ...dark.colors }),
  };
}

export const defaultThemes = createTheme();
