/** WCAG 대비 비율 (1~21) */
export declare function contrastRatio(a: string, b: string): number;
/** 배경 위에서 대비가 더 큰 글자색 */
export declare function pickForeground(
  background: string,
  dark: string,
  light: string
): string;
