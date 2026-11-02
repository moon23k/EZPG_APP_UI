import { useMemo, useRef, useState } from 'react';
import {
  PanResponder,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Text } from '../components/text/text';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import { clamp, hslToHex } from './hsl';

export type ColorTrackProps = {
  kind: 'hue' | 'saturation';
  hue: number;
  saturation: number;
  lightness?: number;
  onChange: (value: number) => void;
  label: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2], paddingHorizontal: t.layout.screenX },
  track: { height: t.space[8], justifyContent: 'center' },
  knob: {
    position: 'absolute',
    width: t.space[8],
    height: t.space[8],
    borderRadius: t.radius.full,
    borderWidth: 3,
    borderColor: t.colors.background,
    boxShadow: t.shadow.md,
  },
}));

export function ColorTrack({
  kind,
  hue,
  saturation,
  lightness = 45,
  onChange,
  label,
  style,
}: ColorTrackProps) {
  const t = useTheme();
  const s = useStyles();
  const [width, setWidth] = useState(0);
  const max = kind === 'hue' ? 360 : 100;
  const value = kind === 'hue' ? hue : saturation;
  const latest = useRef({ width, onChange, max });
  latest.current = { width, onChange, max };
  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (e) => pick(e.nativeEvent.locationX),
        onPanResponderMove: (e) => pick(e.nativeEvent.locationX),
      }),
    []
  );
  function pick(x: number) {
    const { width: w, onChange: change, max: m } = latest.current;
    if (w > 0) change(Math.round(clamp(x / w, 0, 1) * m));
  }
  const stops =
    kind === 'hue'
      ? Array.from({ length: 13 }, (_, i) =>
          hslToHex(i * 30, saturation, lightness)
        )
      : [hslToHex(hue, 0, lightness), hslToHex(hue, 100, lightness)];
  const knob = t.space[8];
  const step = kind === 'hue' ? 10 : 5;
  return (
    <View style={[s.root, style]}>
      <Text variant="caption" tone="muted">
        {label}
      </Text>
      <View
        {...pan.panHandlers}
        onLayout={(e: LayoutChangeEvent) =>
          setWidth(e.nativeEvent.layout.width)
        }
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min: 0, max, now: value }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) =>
          onChange(
            clamp(
              value + (e.nativeEvent.actionName === 'increment' ? step : -step),
              0,
              max
            )
          )
        }
        style={s.track}
      >
        {width > 0 ? (
          <Svg width={width} height={knob} pointerEvents="none">
            <Defs>
              <LinearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="0">
                {stops.map((c, i) => (
                  <Stop key={i} offset={i / (stops.length - 1)} stopColor={c} />
                ))}
              </LinearGradient>
            </Defs>
            <Rect
              x={0}
              y={0}
              width={width}
              height={knob}
              rx={knob / 2}
              fill={`url(#g-${kind})`}
            />
          </Svg>
        ) : null}
        <View
          pointerEvents="none"
          style={[
            s.knob,
            {
              left: clamp(
                (value / max) * width - knob / 2,
                0,
                Math.max(0, width - knob)
              ),
              backgroundColor: hslToHex(hue, saturation, lightness),
            },
          ]}
        />
      </View>
    </View>
  );
}
