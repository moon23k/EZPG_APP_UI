import { Image, View, type StyleProp, type ViewStyle } from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { TAB_ICONS } from '../../internal/tab-icon-pairs';
import { useTheme } from '../../theme/theme-provider';
import type { Theme } from '../../types';
import { makeStyles } from '../../utils/styles';

export type FloatingTabIcon = keyof typeof TAB_ICONS;

export type FloatingTabBarItem<K extends string> = {
  key: K;
  label: string;
  icon: FloatingTabIcon;
  badge?: string;
};

export type FloatingTabBarProps<K extends string> = {
  items: readonly FloatingTabBarItem<K>[];
  value: K;
  onValueChange: (key: K) => void;
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
};

const ICON = 24;
const DOT = 6;
const DOT_INSET = 6;

export function floatingTabBarSpace(t: Theme, bottomInset = 0) {
  return bottomInset + t.space['16'] + t.space['4'] + t.space['2'];
}

const useStyles = makeStyles((t) => ({
  bar: {
    position: 'absolute',
    left: t.space['4'],
    right: t.space['4'],
    height: t.space['16'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space['1'],
    paddingHorizontal: t.space['2'],
    borderRadius: t.radius.full,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
    boxShadow: t.shadow.sm,
  },
  tab: {
    flex: 1,
    height: t.controlSize.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.full,
  },
  selected: { backgroundColor: t.colors.primaryTint },
  icon: { width: ICON, height: ICON },
  dot: {
    position: 'absolute',
    top: 0,
    left: ICON - DOT_INSET,
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: t.colors.primaryEdge,
  },
}));

export function FloatingTabBar<K extends string>({
  items,
  value,
  onValueChange,
  bottomInset = 0,
  style,
}: FloatingTabBarProps<K>) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View
      accessibilityRole="tablist"
      style={[s.bar, { bottom: bottomInset + t.space['4'] }, style]}
    >
      {items.map((item) => {
        const selected = item.key === value;
        return (
          <PressableBase
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={
              item.badge ? `${item.label}, ${item.badge}` : item.label
            }
            touchHeight={t.controlSize.md}
            pressedStyle={{ opacity: t.opacity.pressed }}
            onPress={() => {
              if (!selected) onValueChange(item.key);
            }}
            style={[s.tab, selected && s.selected]}
          >
            <View style={s.icon}>
              <Image
                source={{
                  uri: TAB_ICONS[item.icon][selected ? 'fill' : 'line'],
                }}
                style={[
                  s.icon,
                  {
                    tintColor: selected
                      ? t.colors.primary
                      : t.colors.mutedForeground,
                  },
                ]}
              />
              {item.badge ? <View testID="tab-badge" style={s.dot} /> : null}
            </View>
          </PressableBase>
        );
      })}
    </View>
  );
}
