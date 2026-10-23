import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type WizardStepsProps = {
  /** 단계 이름 */
  steps: readonly string[];
  /** 지금 단계 (0부터) */
  current: number;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  bar: { flexDirection: 'row', gap: t.space[1] },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.muted,
  },
  done: { backgroundColor: t.colors.primary },
  label: {
    ...t.typography.caption,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
  },
  name: { color: t.colors.foreground, fontWeight: '600' },
}));

/** 여러 단계로 나뉜 입력 흐름의 진행 표시 */
export function WizardSteps({ steps, current, style }: WizardStepsProps) {
  const t = useTheme();
  const s = useStyles();
  const index = Math.min(Math.max(current, 0), steps.length - 1);
  return (
    <View
      style={[s.root, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`${steps.length}단계 중 ${index + 1}단계, ${steps[index] ?? ''}`}
      accessibilityValue={{ min: 1, max: steps.length, now: index + 1 }}
    >
      <View style={s.bar}>
        {steps.map((step, i) => (
          <View key={step} style={[s.segment, i <= index && s.done]} />
        ))}
      </View>
      <Text maxFontSizeMultiplier={t.maxFontScale} style={s.label}>
        {index + 1}/{steps.length} · <Text style={s.name}>{steps[index]}</Text>
      </Text>
    </View>
  );
}
