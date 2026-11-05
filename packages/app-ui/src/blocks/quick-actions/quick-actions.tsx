import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type QuickAction = {
  key: string;
  icon: IconSlot;
  label: string;
  onPress: () => void;
};

export type QuickActionsProps = {
  items: readonly QuickAction[];
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    gap: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: t.space[1],
    paddingVertical: t.space[3],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.muted,
  },
  pressed: { backgroundColor: t.colors.border },
}));

export function QuickActions({ items, style }: QuickActionsProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      {items.map((item) => (
        <PressableBase
          key={item.key}
          onPress={item.onPress}
          accessibilityLabel={item.label}
          style={s.item}
          pressedStyle={s.pressed}
        >
          {renderIcon(item.icon, {
            color: t.colors.foreground,
            size: t.iconSize.md,
          })}
          <Text variant="caption" numberOfLines={1}>
            {item.label}
          </Text>
        </PressableBase>
      ))}
    </View>
  );
}
