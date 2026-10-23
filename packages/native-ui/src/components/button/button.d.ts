import type { ReactNode } from 'react';
import { type IconSlot } from '../../internal/icon';
import { type PressableBaseProps } from '../../internal/pressable-base';
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
export declare function Button({
  variant,
  size,
  loading,
  disabled,
  leftIcon,
  rightIcon,
  children,
  style,
  accessibilityState,
  ...rest
}: ButtonProps): import('react').JSX.Element;
