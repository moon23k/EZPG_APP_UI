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

export type StepSliderProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  startLabel?: string;
  endLabel?: string;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

const TRACK = 4;
const TICK = 4;
const THUMB = 20;

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
  ticks: {
    paddingHorizontal: t.space[2],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tick: {
    width: TICK,
    height: t.space[3],
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

export function StepSlider({
  value,
  min = -2,
  max = 2,
  onChange,
  startLabel,
  endLabel,
  accessibilityLabel,
  style,
}: StepSliderProps) {
  const s = useStyles();
  const [width, setWidth] = useState(0);
  const count = max - min;
  const latest = useRef({ value, onChange, min, max, width, count });
  latest.current = { value, onChange, min, max, width, count };
  const origin = useRef(0);
  const pick = (x: number) => {
    const {
      width: w,
      min: lo,
      count: n,
      value: now,
      onChange: change,
    } = latest.current;
    if (w <= 0) return;
    const span = w - THUMB;
    const at = Math.max(0, Math.min(span, x - THUMB / 2));
    const next = lo + Math.round((at / span) * n);
    if (next !== now) change(next);
  };
  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (e) => {
          origin.current = e.nativeEvent.locationX;
          pick(origin.current);
        },
        onPanResponderMove: (_, g) => pick(origin.current + g.dx),
      }),
    []
  );
  const left = width > 0 ? ((value - min) / count) * (width - THUMB) : 0;
  const ticks = [];
  for (let v = min; v <= max; v += 1)
    ticks.push(<View key={v} style={s.tick} />);
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
        accessibilityValue={{ min, max, now: value }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) => {
          const next =
            value + (e.nativeEvent.actionName === 'increment' ? 1 : -1);
          if (next >= min && next <= max) onChange(next);
        }}
        onLayout={(e: LayoutChangeEvent) =>
          setWidth(e.nativeEvent.layout.width)
        }
        style={s.area}
      >
        <View style={s.track} pointerEvents="none" />
        <View style={s.ticks} pointerEvents="none">
          {ticks}
        </View>
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
