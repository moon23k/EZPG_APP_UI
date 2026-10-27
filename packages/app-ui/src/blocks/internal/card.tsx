import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { CheckGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

const MARK = 22;

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
  selected: {
    borderWidth: 2,
    padding: t.space[4] - 1,
    paddingRight: MARK + t.space[3],
    borderColor: t.colors.primary,
  },
  mark: {
    position: 'absolute',
    top: t.space[2],
    right: t.space[2],
    width: MARK,
    height: MARK,
    borderRadius: MARK / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.primary,
  },
}));

export function Card({
  children,
  onPress,
  onLongPress,
  selected,
  accessibilityLabel,
  style,
}: {
  children: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const t = useTheme();
  const s = useStyles();
  const frame = [s.card, selected && s.selected, style];
  const mark = selected ? (
    <View style={s.mark} testID="card-selected-mark">
      <CheckGlyph color={t.colors.primaryForeground} size={14} />
    </View>
  ) : null;
  if (!onPress && !onLongPress) {
    return (
      <View
        style={frame}
        accessibilityState={selected === undefined ? undefined : { selected }}
      >
        {children}
        {mark}
      </View>
    );
  }
  return (
    <PressableBase
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={selected === undefined ? undefined : { selected }}
      pressedStyle={s.pressed}
      style={frame}
    >
      {children}
      {mark}
    </PressableBase>
  );
}
