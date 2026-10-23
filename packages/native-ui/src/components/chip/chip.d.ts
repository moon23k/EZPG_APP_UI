import { type IconSlot } from '../../internal/icon';
import { type PressableBaseProps } from '../../internal/pressable-base';
export type ChipProps = Omit<PressableBaseProps, 'children' | 'touchHeight'> & {
  selected?: boolean;
  leftIcon?: IconSlot;
  children: string;
};
export declare function Chip({
  selected,
  leftIcon,
  children,
  style,
  accessibilityState,
  ...rest
}: ChipProps): import('react').JSX.Element;
