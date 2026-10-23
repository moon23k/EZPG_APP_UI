import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/theme-provider';

export type DividerProps = {
  /** 왼쪽 들여쓰기(px). ListRow의 leading 뒤부터 긋을 때 쓴다 */
  inset?: number;
  style?: StyleProp<ViewStyle>;
};

/** 가로 구분선. 목록에서는 FlatList의 ItemSeparatorComponent로 쓴다 */
export function Divider({ inset = 0, style }: DividerProps) {
  const t = useTheme();
  return (
    <View
      accessible={false}
      style={[
        {
          height: StyleSheet.hairlineWidth,
          marginLeft: inset,
          backgroundColor: t.colors.border,
        },
        style,
      ]}
    />
  );
}
