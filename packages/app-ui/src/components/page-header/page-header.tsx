import { View, type StyleProp, type ViewStyle } from 'react-native';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type PageHeaderAction = {
  icon?: IconSlot;
  label: string;
  badge?: boolean;
  onPress: () => void;
};

export type PageHeaderProps = {
  title: string;
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
    justifyContent: 'space-between',
    paddingTop: t.space[5],
    paddingBottom: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  title: {
    fontSize: t.typography.display.fontSize,
    lineHeight: t.typography.display.lineHeight,
  },
  action: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    marginRight: -t.space[2],
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { paddingHorizontal: t.space[2], width: 'auto' },
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

export function PageHeader({
  title,
  action,
  topInset = 0,
  style,
}: PageHeaderProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, { paddingTop: t.space[5] + topInset }, style]}>
      <Text weight="bold" accessibilityRole="header" style={s.title}>
        {title}
      </Text>
      {action ? (
        <PressableBase
          onPress={action.onPress}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          style={[s.action, !action.icon && s.text]}
        >
          {action.icon ? (
            renderIcon(action.icon, {
              color: t.colors.foreground,
              size: ICON,
            })
          ) : (
            <Text variant="bodyLg" weight="medium">
              {action.label}
            </Text>
          )}
          {action.badge ? <View style={s.dot} /> : null}
        </PressableBase>
      ) : null}
    </View>
  );
}
