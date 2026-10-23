import { type StyleProp, type ViewStyle } from 'react-native';
export type SparklineProps = {
  data: readonly number[];
  /** 기본 80 */
  width?: number;
  /** 기본 24 */
  height?: number;
  /** 기본 primary */
  color?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};
/** 축 없는 작은 추세선 */
export declare function Sparkline({
  data,
  width,
  height,
  color,
  accessibilityLabel,
  style,
}: SparklineProps): import('react').JSX.Element;
