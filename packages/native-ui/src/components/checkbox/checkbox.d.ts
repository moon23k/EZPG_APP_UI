import { type PressableBaseProps } from '../../internal/pressable-base';
export type CheckboxProps = Omit<
  PressableBaseProps,
  'children' | 'onPress' | 'touchHeight'
> & {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
};
export declare function Checkbox({
  value,
  onValueChange,
  label,
  style,
  accessibilityState,
  ...rest
}: CheckboxProps): import('react').JSX.Element;
