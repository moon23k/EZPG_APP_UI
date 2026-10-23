import type { ComponentRef, Ref } from 'react';
import {
  Switch as RNSwitch,
  type SwitchProps as RNSwitchProps,
} from 'react-native';
import { useTheme } from '../../theme/theme-provider';

export type SwitchProps = Omit<RNSwitchProps, 'value' | 'onValueChange'> & {
  ref?: Ref<ComponentRef<typeof RNSwitch>>;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function Switch({ disabled, style, ...rest }: SwitchProps) {
  const t = useTheme();
  return (
    <RNSwitch
      trackColor={{ false: t.colors.border, true: t.colors.primary }}
      thumbColor={t.colors.background}
      ios_backgroundColor={t.colors.border}
      {...rest}
      disabled={disabled}
      style={[disabled && { opacity: t.opacity.disabled }, style]}
    />
  );
}
