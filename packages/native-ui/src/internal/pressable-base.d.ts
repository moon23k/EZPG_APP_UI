import type { ComponentRef, Ref } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
export type PressableBaseProps = Omit<PressableProps, 'style'> & {
  ref?: Ref<ComponentRef<typeof Pressable>>;
  style?: StyleProp<ViewStyle>;
  /** 눌렸을 때 추가 스타일. 기본은 opacity.pressed */
  pressedStyle?: StyleProp<ViewStyle>;
  /** 눈에 보이는 높이. 최소 터치 크기보다 작으면 hitSlop으로 보완한다 */
  touchHeight?: number;
};
/** 눌림 · 비활성 · 접근성 상태 · 최소 터치 영역을 한곳에서 처리하는 Pressable */
export declare function PressableBase({
  style,
  pressedStyle,
  touchHeight,
  disabled,
  hitSlop,
  accessibilityRole,
  accessibilityState,
  ...rest
}: PressableBaseProps): import('react').JSX.Element;
