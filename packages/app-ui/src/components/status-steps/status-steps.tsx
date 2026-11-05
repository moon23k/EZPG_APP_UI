import { View, type StyleProp, type ViewStyle } from 'react-native';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type StatusStepsProps = {
  steps: readonly string[];
  current: number;
  style?: StyleProp<ViewStyle>;
};

const DOT = 12;
const HALO = 4;
const LINE = 2;

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    paddingHorizontal: t.layout.screenX,
    paddingVertical: t.space[2],
  },
  step: { flex: 1, alignItems: 'center', gap: t.space[1] },
  line: {
    position: 'absolute',
    top: HALO + DOT / 2 - LINE / 2,
    height: LINE,
    width: '50%',
    backgroundColor: t.colors.border,
  },
  left: { left: 0 },
  right: { right: 0 },
  lineOn: { backgroundColor: t.colors.primary },
  halo: {
    width: DOT + HALO * 2,
    height: DOT + HALO * 2,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloOn: { backgroundColor: t.colors.primaryContainer },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.border,
  },
  dotOn: { backgroundColor: t.colors.primary },
}));

export function StatusSteps({ steps, current, style }: StatusStepsProps) {
  const s = useStyles();
  const index = Math.min(Math.max(current, 0), steps.length - 1);
  const last = steps.length - 1;
  return (
    <View
      style={[s.root, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`${steps.length}단계 중 ${index + 1}단계, ${steps[index] ?? ''}`}
      accessibilityValue={{ min: 1, max: steps.length, now: index + 1 }}
    >
      {steps.map((label, i) => (
        <View key={label} style={s.step}>
          {i > 0 ? (
            <View style={[s.line, s.left, i <= index && s.lineOn]} />
          ) : null}
          {i < last ? (
            <View style={[s.line, s.right, i < index && s.lineOn]} />
          ) : null}
          <View style={[s.halo, i === index && s.haloOn]}>
            <View style={[s.dot, i <= index && s.dotOn]} />
          </View>
          <Text
            variant="caption"
            weight={i === index ? 'bold' : undefined}
            tone={i === index ? 'default' : 'muted'}
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}
