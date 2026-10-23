import { type StyleProp, type ViewStyle } from 'react-native';
export type StatusBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'destructive';
export type StatusBadgeProps = {
  /** 기본 'neutral' */
  tone?: StatusBadgeTone;
  children: string;
  style?: StyleProp<ViewStyle>;
};
export declare function StatusBadge({
  tone,
  children,
  style,
}: StatusBadgeProps): import('react').JSX.Element;
