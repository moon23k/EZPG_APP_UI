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
  const offThumb =
    t.scheme === 'dark' ? t.colors.mutedForeground : t.colors.background;
  return (
    <RNSwitch
      trackColor={{ false: t.colors.input, true: t.colors.primary }}
      thumbColor={rest.value ? t.colors.primaryForeground : offThumb}
      ios_backgroundColor={t.colors.input}
      {...rest}
      disabled={disabled}
      style={[disabled && { opacity: t.opacity.disabled }, style]}
    />
  );
}
