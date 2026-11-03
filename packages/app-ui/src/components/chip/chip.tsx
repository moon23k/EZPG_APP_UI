import { Text, View } from 'react-native';
import { CheckGlyph } from '../../internal/glyphs';
import { renderIcon, type IconSlot } from '../../internal/icon';
import {
  PressableBase,
  type PressableBaseProps,
} from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ChipSize = 'sm' | 'md' | 'lg';

export type ChipVariant = 'solid' | 'outline';

export type ChipProps = Omit<PressableBaseProps, 'children' | 'touchHeight'> & {
  selected?: boolean;
  size?: ChipSize;
  variant?: ChipVariant;
  leftIcon?: IconSlot;
  count?: number;
  children: string;
};

const HEIGHT: Record<ChipSize, number> = { sm: 32, md: 36, lg: 40 };
const MIN_WIDTH: Record<ChipSize, number> = { sm: 44, md: 48, lg: 52 };

const useStyles = makeStyles((t) => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    gap: t.space[1],
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.muted,
  },
  lg: { paddingHorizontal: t.space[4] },
  selected: {
    backgroundColor: t.colors.primaryContainer,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: t.colors.input,
  },
  outlineSelected: {
    backgroundColor: t.colors.muted,
    borderColor: t.colors.foreground,
  },
  label: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    fontWeight: '500',
  },
  count: { fontVariant: ['tabular-nums'], fontWeight: '700' },
}));

export function Chip({
  selected = false,
  size = 'sm',
  variant = 'solid',
  leftIcon,
  count,
  children,
  style,
  accessibilityState,
  accessibilityLabel,
  ...rest
}: ChipProps) {
  const t = useTheme();
  const s = useStyles();
  const outline = variant === 'outline';
  const color = selected && !outline ? t.colors.primary : t.colors.foreground;
  return (
    <PressableBase
      {...rest}
      accessibilityLabel={
        accessibilityLabel ??
        (count === undefined ? undefined : `${children}, ${count}건`)
      }
      accessibilityState={{ ...accessibilityState, selected }}
      touchHeight={HEIGHT[size]}
      style={[
        s.base,
        { height: HEIGHT[size], minWidth: MIN_WIDTH[size] },
        size === 'lg' && s.lg,
        outline
          ? [s.outline, selected && s.outlineSelected]
          : selected && s.selected,
        style,
      ]}
    >
      {selected && !outline ? (
        <CheckGlyph color={color} size={t.iconSize.sm} />
      ) : null}
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
      {count === undefined ? null : (
        <Text
          numberOfLines={1}
          maxFontSizeMultiplier={t.maxFontScale}
          style={[s.label, s.count, { color }]}
        >
          {count}
        </Text>
      )}
    </PressableBase>
  );
}
