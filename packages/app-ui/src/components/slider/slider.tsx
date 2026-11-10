import { useMemo, useRef, useState } from 'react';
import {
  PanResponder,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type SliderProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  onSlidingStart?: () => void;
  startLabel?: string;
  endLabel?: string;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

const TRACK = 4;
const THUMB = 20;
const NUDGE = 10;

const useStyles = makeStyles((t) => ({
  root: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  end: { width: t.space[12] },
  endRight: { width: t.space[12], textAlign: 'right' },
  area: { flex: 1, height: t.minTouchSize, justifyContent: 'center' },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: TRACK,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.ring,
  },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.foreground,
  },
}));

export function Slider({
  value,
  min = 0,
  max = 1,
  onChange,
  onSlidingStart,
  startLabel,
  endLabel,
  accessibilityLabel,
  style,
}: SliderProps) {
  const s = useStyles();
  const [width, setWidth] = useState(0);
  const span = max - min;
  const latest = useRef({ value, onChange, onSlidingStart, min, span, width });
  latest.current = { value, onChange, onSlidingStart, min, span, width };
  const origin = useRef(0);
  const pick = (x: number) => {
    const {
      width: w,
      min: lo,
      span: n,
      value: now,
      onChange: change,
    } = latest.current;
    if (w <= 0 || n <= 0) return;
    const room = w - THUMB;
    const at = Math.max(0, Math.min(room, x - THUMB / 2));
    const next = lo + (at / room) * n;
    if (next !== now) change(next);
  };
  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (e) => {
          latest.current.onSlidingStart?.();
          origin.current = e.nativeEvent.locationX;
          pick(origin.current);
        },
        onPanResponderMove: (_, g) => pick(origin.current + g.dx),
      }),
    []
  );
  const ratio =
    span > 0 ? (Math.min(max, Math.max(min, value)) - min) / span : 0;
  const left = width > 0 ? ratio * (width - THUMB) : 0;
  return (
    <View style={[s.root, style]}>
      {startLabel ? (
        <Text variant="caption" tone="muted" numberOfLines={1} style={s.end}>
          {startLabel}
        </Text>
      ) : null}
      <View
        {...pan.panHandlers}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{ min: 0, max: 100, now: Math.round(ratio * 100) }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) => {
          onSlidingStart?.();
          const step =
            (span / NUDGE) *
            (e.nativeEvent.actionName === 'increment' ? 1 : -1);
          onChange(Math.min(max, Math.max(min, value + step)));
        }}
        onLayout={(e: LayoutChangeEvent) =>
          setWidth(e.nativeEvent.layout.width)
        }
        style={s.area}
      >
        <View style={s.track} pointerEvents="none" />
        {width > 0 ? (
          <View style={[s.thumb, { left }]} pointerEvents="none" />
        ) : null}
      </View>
      {endLabel ? (
        <Text
          variant="caption"
          tone="muted"
          numberOfLines={1}
          style={s.endRight}
        >
          {endLabel}
        </Text>
      ) : null}
    </View>
  );
}
