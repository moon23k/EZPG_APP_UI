import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type TaskTile = {
  key: string;
  icon: IconSlot;
  label: string;
  count: number;
  note?: string;
  onPress?: () => void;
};

export type TaskTilesProps = {
  items: readonly TaskTile[];
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    gap: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  tile: {
    flex: 1,
    gap: t.space[1],
    paddingVertical: t.space[3],
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.surface,
  },
  pressed: { backgroundColor: t.colors.border },
  count: {
    fontSize: t.typography.title.fontSize,
    lineHeight: t.typography.title.lineHeight,
    fontVariant: ['tabular-nums'],
  },
}));

export function TaskTiles({ items, style }: TaskTilesProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      {items.map((item) => (
        <PressableBase
          key={item.key}
          onPress={item.onPress}
          disabled={!item.onPress}
          accessibilityLabel={`${item.label} ${item.count}${item.note ? ` ${item.note}` : ''}`}
          style={s.tile}
          pressedStyle={s.pressed}
        >
          {renderIcon(item.icon, {
            color: t.colors.mutedForeground,
            size: t.iconSize.md,
          })}
          <Text variant="label" numberOfLines={1}>
            {item.label}
          </Text>
          <Text
            weight="bold"
            tone={item.count > 0 ? 'point' : 'muted'}
            style={s.count}
          >
            {item.count}
          </Text>
          <Text variant="caption" tone="muted" numberOfLines={1}>
            {item.note ?? ' '}
          </Text>
        </PressableBase>
      ))}
    </View>
  );
}
