import type { ComponentRef, Ref } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import type { TypographyVariant } from '../../types';
export type TextTone = 'default' | 'muted' | 'destructive' | 'success';
export type TextProps = RNTextProps & {
  ref?: Ref<ComponentRef<typeof RNText>>;
  /** 기본 'body' */
  variant?: TypographyVariant;
  /** 기본 'default' */
  tone?: TextTone;
};
export declare function Text({
  variant,
  tone,
  style,
  ...rest
}: TextProps): import('react').JSX.Element;
