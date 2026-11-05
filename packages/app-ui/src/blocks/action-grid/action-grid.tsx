import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ActionGridItem = {
  key: string;
  icon: IconSlot;
  label: string;
  value?: string;
  onPress: () => void;
};

export type ActionGridProps = {
  items: readonly ActionGridItem[];
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  item: {
    flexBasis: '48%',
    flexGrow: 1,
    gap: t.space[2],
    padding: t.space[3],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.muted,
  },
  pressed: { backgroundColor: t.colors.border },
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  label: { flex: 1 },
}));

export function ActionGrid({ items, style }: ActionGridProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      {items.map((item) => (
        <PressableBase
          key={item.key}
          onPress={item.onPress}
          accessibilityLabel={[item.label, item.value]
            .filter(Boolean)
            .join(' ')}
          style={s.item}
          pressedStyle={s.pressed}
        >
          {renderIcon(item.icon, {
            color: t.colors.primary,
            size: t.iconSize.md,
          })}
          <View style={s.row}>
            <Text
              variant="label"
              weight="bold"
              numberOfLines={1}
              style={s.label}
            >
              {item.label}
            </Text>
            {item.value ? (
              <Text variant="caption" tone="muted" numberOfLines={1}>
                {item.value}
              </Text>
            ) : null}
          </View>
        </PressableBase>
      ))}
    </View>
  );
}
