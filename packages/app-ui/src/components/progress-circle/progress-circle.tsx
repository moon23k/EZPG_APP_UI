import { useEffect, useRef } from 'react';
import { Animated, Easing, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/theme-provider';

export type ProgressCircleProps = {
  size?: 24 | 40;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const THICKNESS = { 24: 3, 40: 5 } as const;

export function ProgressCircle({
  size = 40,
  accessibilityLabel,
  style,
}: ProgressCircleProps) {
  const t = useTheme();
  const turn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(turn, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [turn]);
  const rotate = turn.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <Animated.View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: THICKNESS[size],
          borderColor: t.colors.border,
          borderTopColor: t.colors.mutedForeground,
          transform: [{ rotate }],
        },
        style,
      ]}
    />
  );
}
