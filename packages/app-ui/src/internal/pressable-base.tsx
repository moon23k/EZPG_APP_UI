import type { ComponentRef, Ref } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/theme-provider';

export type PressableBaseProps = Omit<PressableProps, 'style'> & {
  ref?: Ref<ComponentRef<typeof Pressable>>;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  touchHeight?: number;
};

export function PressableBase({
  style,
  pressedStyle,
  touchHeight,
  disabled,
  hitSlop,
  accessibilityRole = 'button',
  accessibilityState,
  ...rest
}: PressableBaseProps) {
  const t = useTheme();
  const slop =
    hitSlop ??
    (touchHeight !== undefined && touchHeight < t.minTouchSize
      ? {
          top: Math.ceil((t.minTouchSize - touchHeight) / 2),
          bottom: Math.ceil((t.minTouchSize - touchHeight) / 2),
        }
      : undefined);
  return (
    <Pressable
      {...rest}
      disabled={disabled}
      hitSlop={slop}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ ...accessibilityState, disabled: !!disabled }}
      style={({ pressed }) => [
        style,
        pressed &&
          !disabled &&
          (pressedStyle ?? { opacity: t.opacity.pressed }),
        disabled && { opacity: t.opacity.disabled },
      ]}
    />
  );
}
