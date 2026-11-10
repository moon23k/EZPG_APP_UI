import { View } from 'react-native';
import { Text } from '../../components/text/text';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ToolRowItem = {
  key: string;
  icon: IconSlot;
  label: string;
  onPress: () => void;
  active?: boolean;
  disabled?: boolean;
};

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: t.space[1],
  },
  item: { alignItems: 'center', gap: t.space[1], flex: 1 },
  round: {
    width: t.controlSize.sm,
    height: t.controlSize.sm,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.surface,
  },
  on: { backgroundColor: t.colors.primaryTint },
}));

export function ToolRow({ items }: { items: readonly ToolRowItem[] }) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.row}>
      {items.map((item) => (
        <PressableBase
          key={item.key}
          onPress={item.onPress}
          disabled={item.disabled}
          accessibilityLabel={item.label}
          accessibilityState={{ selected: !!item.active }}
          style={s.item}
        >
          <View style={[s.round, item.active && s.on]}>
            {renderIcon(item.icon, {
              color: item.active ? t.colors.primary : t.colors.foreground,
              size: t.iconSize.md,
            })}
          </View>
          <Text
            variant="caption"
            tone={item.active ? 'default' : 'muted'}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </PressableBase>
      ))}
    </View>
  );
}
