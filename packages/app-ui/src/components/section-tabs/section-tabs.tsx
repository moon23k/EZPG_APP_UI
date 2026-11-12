import { View, type StyleProp, type ViewStyle } from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type SectionTabsItem<T extends string> = {
  value: T;
  label: string;
  dot?: boolean;
};

export type SectionTabsProps<T extends string> = {
  items: readonly SectionTabsItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
};

const DOT = 6;

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: 'row',
    paddingHorizontal: t.space[2],
    backgroundColor: t.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: t.colors.border,
  },
  tab: {
    flex: 1,
    height: t.minTouchSize,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[1],
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selected: { borderBottomColor: t.colors.foreground },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.danger,
  },
}));

export function SectionTabs<T extends string>({
  items,
  value,
  onValueChange,
  style,
}: SectionTabsProps<T>) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View accessibilityRole="tablist" style={[s.row, style]}>
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <PressableBase
            key={item.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={
              item.dot ? `${item.label}, 확인 필요` : item.label
            }
            pressedStyle={{}}
            onPress={() => onValueChange(item.value)}
            style={[s.tab, selected && s.selected]}
          >
            <Text
              numberOfLines={1}
              maxFontSizeMultiplier={t.maxFontScale}
              weight={selected ? 'bold' : undefined}
              tone={selected ? undefined : 'muted'}
            >
              {item.label}
            </Text>
            {item.dot ? <View style={s.dot} /> : null}
          </PressableBase>
        );
      })}
    </View>
  );
}
