import { type StyleProp, type ViewStyle } from 'react-native';
export type ChartDatum = {
  label: string;
  value: number;
};
export type LineChartProps = {
  data: readonly ChartDatum[];
  /** 기본 200 */
  height?: number;
  /** y축 라벨. 기본은 천 단위 쉼표 */
  formatY?: (value: number) => string;
  /** x축 라벨. 기본은 label 그대로 */
  formatX?: (label: string, index: number) => string;
  /** 점을 눌렀을 때. 넘기면 각 구간이 눌린다 */
  onPointPress?: (datum: ChartDatum, index: number) => void;
  /** 기본은 최고 · 최저 · 마지막 값 요약 */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};
export declare function LineChart({
  data,
  height,
  formatY,
  formatX,
  onPointPress,
  accessibilityLabel,
  style,
}: LineChartProps): import('react').JSX.Element;
