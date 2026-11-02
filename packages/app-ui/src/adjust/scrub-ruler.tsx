import { useMemo, useRef } from 'react';
import {
  PanResponder,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Text } from '../components/text/text';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import { clamp } from './hsl';

export type ScrubRulerProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  startLabel?: string;
  endLabel?: string;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

const MINOR = 3;
const TICK = 2;

const useStyles = makeStyles((t) => ({
  root: {
    height: t.controlSize.lg,
    marginHorizontal: t.layout.screenX,
    overflow: 'hidden',
  },
  ticks: {
    position: 'absolute',
    top: t.space[2],
    left: '50%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tick: { width: TICK, height: t.space[2], backgroundColor: t.colors.input },
  major: { height: t.space[4], backgroundColor: t.colors.mutedForeground },
  zero: { height: t.space[5], backgroundColor: t.colors.foreground },
  needle: {
    position: 'absolute',
    left: '50%',
    top: t.space[1],
    width: TICK,
    marginLeft: -TICK / 2,
    height: t.space[6] + t.space[1],
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.primary,
  },
  ends: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export function ScrubRuler({
  value,
  min = -2,
  max = 2,
  onChange,
  startLabel,
  endLabel,
  accessibilityLabel,
  style,
}: ScrubRulerProps) {
  const t = useTheme();
  const s = useStyles();
  const step = t.space[8];
  const gap = (step - TICK * (MINOR + 1)) / (MINOR + 1);
  const latest = useRef({ value, onChange, min, max });
  latest.current = { value, onChange, min, max };
  const start = useRef(value);
  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          start.current = latest.current.value;
        },
        onPanResponderMove: (_, g) => {
          const {
            onChange: change,
            min: lo,
            max: hi,
            value: now,
          } = latest.current;
          const next = clamp(start.current - Math.round(g.dx / step), lo, hi);
          if (next !== now) change(next);
        },
      }),
    [step]
  );
  const ticks = [];
  for (let v = min; v <= max; v += 1) {
    ticks.push(
      <View
        key={`m${v}`}
        style={[
          s.tick,
          v === 0 ? s.zero : s.major,
          v < max && { marginRight: gap },
        ]}
      />
    );
    if (v < max) {
      for (let j = 0; j < MINOR; j += 1) {
        ticks.push(
          <View key={`${v}-${j}`} style={[s.tick, { marginRight: gap }]} />
        );
      }
    }
  }
  return (
    <View
      {...pan.panHandlers}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min, max, now: value }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) =>
        onChange(
          clamp(
            value + (e.nativeEvent.actionName === 'increment' ? 1 : -1),
            min,
            max
          )
        )
      }
      style={[s.root, style]}
    >
      <View
        style={[
          s.ticks,
          { transform: [{ translateX: -(value - min) * step - TICK / 2 }] },
        ]}
      >
        {ticks}
      </View>
      <View style={s.needle} />
      <View style={s.ends}>
        <Text variant="caption" tone="muted">
          {startLabel ?? ''}
        </Text>
        <Text variant="caption" tone="muted">
          {endLabel ?? ''}
        </Text>
      </View>
    </View>
  );
}
