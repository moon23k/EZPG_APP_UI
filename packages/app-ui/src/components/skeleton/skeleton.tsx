import { useEffect, useRef } from 'react';
import {
  Animated,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useNativeDriver } from '../../internal/overlay';
import { useReducedMotion } from '../../internal/use-reduced-motion';
import { useTheme } from '../../theme/theme-provider';

export type SkeletonProps = {
  /** 기본 '100%' */
  width?: DimensionValue;
  /** 기본 16 */
  height?: DimensionValue;
  /** 기본 radius.sm */
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

/** 불러오는 중인 자리. '동작 줄이기'가 켜져 있으면 깜빡이지 않는다 */
export function Skeleton({
  width = '100%',
  height = 16,
  radius,
  style,
}: SkeletonProps) {
  const t = useTheme();
  const reduced = useReducedMotion();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduced) {
      opacity.setValue(0.7);
      return;
    }
    const half = t.motion.duration * 4;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: half,
          useNativeDriver,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: half,
          useNativeDriver,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, reduced, t.motion.duration]);

  return (
    <Animated.View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width,
          height,
          borderRadius: radius ?? t.radius.sm,
          backgroundColor: t.colors.muted,
          opacity,
        },
        style,
      ]}
    />
  );
}
