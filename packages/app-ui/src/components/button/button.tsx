import type { ReactNode } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { renderIcon, type IconSlot } from '../../internal/icon';
import {
  PressableBase,
  type PressableBaseProps,
} from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

import type { ButtonSize, ButtonVariant } from '../../theme/contract';

export type { ButtonSize, ButtonVariant };

export type ButtonProps = Omit<
  PressableBaseProps,
  'children' | 'touchHeight'
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: IconSlot;
  rightIcon?: IconSlot;
  children: ReactNode;
};

const useStyles = makeStyles((t) => ({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[2],
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sm: {
    height: t.controlSize.sm,
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.md,
  },
  md: {
    height: t.controlSize.md,
    paddingHorizontal: t.space[4],
    borderRadius: t.radius.md,
  },
  lg: {
    height: t.controlSize.lg,
    paddingHorizontal: t.space[5],
    borderRadius: t.radius.lg,
  },
  primary: { backgroundColor: t.colors.primary },
  secondary: { backgroundColor: t.colors.muted },
  outline: {
    backgroundColor: t.colors.background,
    borderColor: t.colors.input,
  },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: t.colors.danger },
  label: { fontFamily: t.fontFamily, fontWeight: '600' },
  smLabel: {
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
  },
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
  variant = 'primary',
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
    primary: t.colors.primaryForeground,
    secondary: t.colors.foreground,
    outline: t.colors.foreground,
    ghost: t.colors.foreground,
    danger: t.colors.dangerForeground,
  }[variant];
  const icon = { color, size: size === 'sm' ? t.iconSize.sm : t.iconSize.md };

  return (
    <PressableBase
      {...rest}
      disabled={disabled || loading}
      touchHeight={t.controlSize[size]}
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
