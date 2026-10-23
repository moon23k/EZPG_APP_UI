import {
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
export type SkeletonProps = {
  /** 기본 '100%' */
  width?: DimensionValue;
  /** 기본 16 */
  height?: DimensionValue;
  /** 기본 radius.sm */
  radius?: number;
  style?: StyleProp<ViewStyle>;
};
/** 불러오는 중인 자리. '동작 줄이기'가 켜져 있으면 깜빡이지 않는다 */
export declare function Skeleton({
  width,
  height,
  radius,
  style,
}: SkeletonProps): import('react').JSX.Element;
