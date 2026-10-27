import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/theme-provider';

export type DividerProps = {
  inset?: number;
  style?: StyleProp<ViewStyle>;
};

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
