import { type StyleProp, type ViewStyle } from 'react-native';
export type SegmentedTabsItem<T extends string> = {
  value: T;
  label: string;
};
export type SegmentedTabsProps<T extends string> = {
  /** 2~4개 */
  items: readonly SegmentedTabsItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
};
export declare function SegmentedTabs<T extends string>({
  items,
  value,
  onValueChange,
  style,
}: SegmentedTabsProps<T>): import('react').JSX.Element;
