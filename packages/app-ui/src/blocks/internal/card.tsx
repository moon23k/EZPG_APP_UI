import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';

const useStyles = makeStyles((t) => ({
  card: {
    gap: t.space[3],
    padding: t.space[4],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  pressed: { backgroundColor: t.colors.muted },
}));

/** blocks 공용 카드 틀. onPress가 있으면 누를 수 있다 */
export function Card({
  children,
  onPress,
  accessibilityLabel,
  style,
}: {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const s = useStyles();
  if (!onPress) return <View style={[s.card, style]}>{children}</View>;
  return (
    <PressableBase
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      pressedStyle={s.pressed}
      style={[s.card, style]}
    >
      {children}
    </PressableBase>
  );
}
