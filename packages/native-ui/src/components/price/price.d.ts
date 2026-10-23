import { type StyleProp, type ViewStyle } from 'react-native';
import type { TypographyVariant } from '../../types';
/** 12000 → '12,000원'. 웹 · Jest · 네이티브에서 같은 결과를 내도록 Intl을 쓰지 않는다 */
export declare function formatPrice(value: number, unit?: string): string;
export type PriceProps = {
  value: number;
  /** 할인 전 가격. value보다 클 때만 취소선으로 표시한다 */
  originalValue?: number;
  /** 기본 'body' */
  variant?: TypographyVariant;
  unit?: string;
  style?: StyleProp<ViewStyle>;
};
export declare function Price({
  value,
  originalValue,
  variant,
  unit,
  style,
}: PriceProps): import('react').JSX.Element;
