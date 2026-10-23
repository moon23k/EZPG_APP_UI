import type { ThemeOverrides, Themes } from '../types';
/**
 * 기본 토큰에 overrides를 덮어 light · dark 테마를 만든다.
 * 렌더 밖(모듈 최상단)이나 useMemo 안에서 호출한다.
 */
export declare function createTheme(overrides?: ThemeOverrides): Themes;
export declare const defaultThemes: Themes;
