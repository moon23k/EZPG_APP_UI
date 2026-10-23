import { type StyleProp, type ViewStyle } from 'react-native';
export type DividerProps = {
  /** 왼쪽 들여쓰기(px). ListRow의 leading 뒤부터 긋을 때 쓴다 */
  inset?: number;
  style?: StyleProp<ViewStyle>;
};
/** 가로 구분선. 목록에서는 FlatList의 ItemSeparatorComponent로 쓴다 */
export declare function Divider({
  inset,
  style,
}: DividerProps): import('react').JSX.Element;
