import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme-provider';
import { useReducedMotion } from './use-reduced-motion';

export const useNativeDriver = Platform.OS !== 'web';

/**
 * Modal 위 패널의 열림 · 닫힘 전환. 닫힘 애니메이션이 끝난 뒤 mounted가 false가 된다.
 * progress는 0(닫힘) → 1(열림).
 */
export function useOverlayTransition(open: boolean) {
  const t = useTheme();
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
    const animation = Animated.timing(progress, {
      toValue: open ? 1 : 0,
      duration: reduced ? 0 : t.motion.duration,
      useNativeDriver,
    });
    animation.start(({ finished }) => {
      if (finished && !open) setMounted(false);
    });
    return () => animation.stop();
  }, [open, progress, reduced, t.motion.duration]);

  return { mounted, progress };
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
});

export function Backdrop({
  progress,
  onPress,
  label,
}: {
  progress: Animated.Value;
  onPress: () => void;
  label: string;
}) {
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: progress }]}
    >
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
      />
    </Animated.View>
  );
}
