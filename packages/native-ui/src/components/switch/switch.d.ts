import type { ComponentRef, Ref } from 'react';
import {
  Switch as RNSwitch,
  type SwitchProps as RNSwitchProps,
} from 'react-native';
export type SwitchProps = Omit<RNSwitchProps, 'value' | 'onValueChange'> & {
  ref?: Ref<ComponentRef<typeof RNSwitch>>;
  value: boolean;
  onValueChange: (value: boolean) => void;
};
export declare function Switch({
  disabled,
  style,
  ...rest
}: SwitchProps): import('react').JSX.Element;
