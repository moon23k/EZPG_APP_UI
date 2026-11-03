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

export type HeaderButtonProps = {
  label: string;
  disabled?: boolean;
  onPress: () => void;
};

export function HeaderButton({ label, disabled, onPress }: HeaderButtonProps) {
  const s = useStyles();
  return (
    <PressableBase
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={[s.action, s.text]}
    >
      <Text
        variant="bodyLg"
        weight="medium"
        tone={disabled ? 'muted' : undefined}
      >
        {label}
      </Text>
    </PressableBase>
  );
}

export function headerButton(props: HeaderButtonProps) {
  return function HeaderSlot() {
    return <HeaderButton {...props} />;
  };
}

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
      {action && !action.icon ? (
        <HeaderButton label={action.label} onPress={action.onPress} />
      ) : action ? (
        <PressableBase
          onPress={action.onPress}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          style={s.action}
        >
          {renderIcon(action.icon, {
            color: t.colors.foreground,
            size: ICON,
          })}
          {action.badge ? <View style={s.dot} /> : null}
        </PressableBase>
      ) : null}
    </View>
  );
}
