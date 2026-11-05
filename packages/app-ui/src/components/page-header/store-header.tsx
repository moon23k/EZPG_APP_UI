import { View, type StyleProp, type ViewStyle } from 'react-native';
import { ChevronGlyph } from '../../internal/glyphs';
import { renderIcon } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { tileColor } from '../photo/photo';
import { Text } from '../text/text';
import type { PageHeaderAction } from './page-header';

export type StoreMarkProps = {
  name: string;
  size?: 'sm' | 'lg';
  style?: StyleProp<ViewStyle>;
};

export type StoreHeaderProps = {
  name: string;
  onPress?: () => void;
  action?: PageHeaderAction;
  topInset?: number;
  style?: StyleProp<ViewStyle>;
};

const DOT = 6;
const ICON = 24;

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    paddingBottom: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  store: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    minHeight: t.minTouchSize,
  },
  mark: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.full,
  },
  name: { flexShrink: 1 },
  down: { transform: [{ rotate: '90deg' }] },
  action: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    marginRight: -t.space[2],
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: t.space[2] + t.space[1],
    right: t.space[2] + t.space[1],
    width: DOT,
    height: DOT,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
  },
}));

export function StoreMark({ name, size = 'sm', style }: StoreMarkProps) {
  const t = useTheme();
  const s = useStyles();
  const px = size === 'lg' ? t.controlSize.sm : t.space[8];
  return (
    <View
      style={[
        s.mark,
        { width: px, height: px, backgroundColor: tileColor(name) },
        style,
      ]}
    >
      <Text weight="bold" variant={size === 'lg' ? 'bodyLg' : 'label'}>
        {name.trim().slice(0, 1)}
      </Text>
    </View>
  );
}

export function StoreHeader({
  name,
  onPress,
  action,
  topInset = 0,
  style,
}: StoreHeaderProps) {
  const t = useTheme();
  const s = useStyles();
  const store = (
    <>
      <StoreMark name={name} />
      <Text variant="bodyLg" weight="bold" numberOfLines={1} style={s.name}>
        {name}
      </Text>
      {onPress ? (
        <View style={s.down}>
          <ChevronGlyph color={t.colors.foreground} size={t.iconSize.sm} />
        </View>
      ) : null}
    </>
  );
  return (
    <View style={[s.root, { paddingTop: t.space[3] + topInset }, style]}>
      {onPress ? (
        <PressableBase
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={`${name} 스토어 전환`}
          style={s.store}
        >
          {store}
        </PressableBase>
      ) : (
        <View style={s.store} accessibilityRole="header">
          {store}
        </View>
      )}
      {action ? (
        <PressableBase
          onPress={action.onPress}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          style={s.action}
        >
          {renderIcon(action.icon, { color: t.colors.foreground, size: ICON })}
          {action.badge ? <View style={s.dot} /> : null}
        </PressableBase>
      ) : null}
    </View>
  );
}
