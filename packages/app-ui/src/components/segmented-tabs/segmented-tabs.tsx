import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type SegmentedTabsItem<T extends string> = { value: T; label: string };

export type SegmentedTabsProps<T extends string> = {
  items: readonly SegmentedTabsItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
};

const HEIGHT = 40;

const useStyles = makeStyles((t) => ({
  track: {
    flexDirection: 'row',
    height: HEIGHT,
    padding: t.space[1],
    gap: t.space[1],
    borderRadius: t.radius.md,
    backgroundColor: t.colors.muted,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.sm,
  },
  selected: { backgroundColor: t.colors.background, boxShadow: t.shadow.sm },
  label: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    fontWeight: '500',
    color: t.colors.mutedForeground,
  },
  selectedLabel: { color: t.colors.foreground },
}));

export function SegmentedTabs<T extends string>({
  items,
  value,
  onValueChange,
  style,
}: SegmentedTabsProps<T>) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View accessibilityRole="tablist" style={[s.track, style]}>
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <PressableBase
            key={item.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={item.label}
            touchHeight={HEIGHT}
            pressedStyle={{}}
            onPress={() => {
              if (!selected) onValueChange(item.value);
            }}
            style={[s.tab, selected && s.selected]}
          >
            <Text
              numberOfLines={1}
              maxFontSizeMultiplier={t.maxFontScale}
              style={[s.label, selected && s.selectedLabel]}
            >
              {item.label}
            </Text>
          </PressableBase>
        );
      })}
    </View>
  );
}
