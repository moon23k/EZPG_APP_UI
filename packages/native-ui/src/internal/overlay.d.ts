import { Animated } from 'react-native';
export declare const useNativeDriver: boolean;
/**
 * Modal 위 패널의 열림 · 닫힘 전환. 닫힘 애니메이션이 끝난 뒤 mounted가 false가 된다.
 * progress는 0(닫힘) → 1(열림).
 */
export declare function useOverlayTransition(open: boolean): {
  mounted: boolean;
  progress: Animated.Value;
};
export declare function Backdrop({
  progress,
  onPress,
  label,
}: {
  progress: Animated.Value;
  onPress: () => void;
  label: string;
}): import('react').JSX.Element;
