import type { ReactNode } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { renderIcon, type IconSlot } from '../../internal/icon';
import {
  PressableBase,
  type PressableBaseProps,
} from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<
  PressableBaseProps,
  'children' | 'touchHeight'
> & {
  /** 기본 'solid' */
  variant?: ButtonVariant;
  /** 기본 'md' */
  size?: ButtonSize;
  /** 스피너를 보여주고 누를 수 없게 한다 */
  loading?: boolean;
  leftIcon?: IconSlot;
  rightIcon?: IconSlot;
  children: ReactNode;
};

const heights: Record<ButtonSize, number> = { sm: 36, md: 44, lg: 52 };

const useStyles = makeStyles((t) => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[2],
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sm: { height: heights.sm, paddingHorizontal: t.space[3] },
  md: { height: heights.md, paddingHorizontal: t.space[4] },
  lg: { height: heights.lg, paddingHorizontal: t.space[5] },
  solid: { backgroundColor: t.colors.primary },
  outline: {
    backgroundColor: t.colors.background,
    borderColor: t.colors.border,
  },
  ghost: { backgroundColor: 'transparent' },
  destructive: { backgroundColor: t.colors.destructive },
  label: { fontFamily: t.fontFamily, fontWeight: '600' },
  smLabel: { fontSize: 14, lineHeight: 20 },
  mdLabel: {
    fontSize: t.typography.body.fontSize,
    lineHeight: t.typography.body.lineHeight,
  },
  lgLabel: {
    fontSize: t.typography.bodyLg.fontSize,
    lineHeight: t.typography.bodyLg.lineHeight,
  },
}));

export function Button({
  variant = 'solid',
  size = 'md',
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  children,
  style,
  accessibilityState,
  ...rest
}: ButtonProps) {
  const t = useTheme();
  const s = useStyles();
  const color = {
    solid: t.colors.primaryForeground,
    outline: t.colors.foreground,
    ghost: t.colors.foreground,
    destructive: t.colors.destructiveForeground,
  }[variant];
  const icon = { color, size: size === 'sm' ? t.iconSize.sm : t.iconSize.md };

  return (
    <PressableBase
      {...rest}
      disabled={disabled || loading}
      touchHeight={heights[size]}
      accessibilityState={{ ...accessibilityState, busy: loading }}
      style={[s.base, s[size], s[variant], style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={color} />
      ) : leftIcon ? (
        <View>{renderIcon(leftIcon, icon)}</View>
      ) : null}
      {typeof children === 'string' ? (
        <Text
          numberOfLines={1}
          maxFontSizeMultiplier={t.maxFontScale}
          style={[s.label, s[`${size}Label`], { color }]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      {rightIcon ? <View>{renderIcon(rightIcon, icon)}</View> : null}
    </PressableBase>
  );
}
