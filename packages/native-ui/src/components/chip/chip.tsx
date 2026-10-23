import { Text, View } from 'react-native';
import { renderIcon, type IconSlot } from '../../internal/icon';
import {
  PressableBase,
  type PressableBaseProps,
} from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ChipProps = Omit<PressableBaseProps, 'children' | 'touchHeight'> & {
  selected?: boolean;
  leftIcon?: IconSlot;
  children: string;
};

const HEIGHT = 32;

const useStyles = makeStyles((t) => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: t.space[1],
    height: HEIGHT,
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.full,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  selected: {
    backgroundColor: t.colors.primary,
    borderColor: t.colors.primary,
  },
  label: {
    fontFamily: t.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
}));

export function Chip({
  selected = false,
  leftIcon,
  children,
  style,
  accessibilityState,
  ...rest
}: ChipProps) {
  const t = useTheme();
  const s = useStyles();
  const color = selected ? t.colors.primaryForeground : t.colors.foreground;
  return (
    <PressableBase
      {...rest}
      accessibilityState={{ ...accessibilityState, selected }}
      touchHeight={HEIGHT}
      style={[s.base, selected && s.selected, style]}
    >
      {leftIcon ? (
        <View>{renderIcon(leftIcon, { color, size: t.iconSize.sm })}</View>
      ) : null}
      <Text
        numberOfLines={1}
        maxFontSizeMultiplier={t.maxFontScale}
        style={[s.label, { color }]}
      >
        {children}
      </Text>
    </PressableBase>
  );
}
