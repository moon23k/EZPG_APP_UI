import { View, type StyleProp, type ViewStyle } from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type StepperProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  style?: StyleProp<ViewStyle>;
};

const SIZE = 36;

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: t.space[3],
  },
  controls: { flexDirection: 'row', alignItems: 'center', gap: t.space[3] },
  button: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: t.radius.md,
    borderColor: t.colors.input,
    backgroundColor: t.colors.surface,
  },
  pressed: { backgroundColor: t.colors.muted },
  off: { opacity: t.opacity.disabled },
  value: { minWidth: SIZE, textAlign: 'center' },
}));

export function Stepper({
  label,
  value,
  onValueChange,
  min = 0,
  max = 999,
  step = 1,
  suffix = '',
  style,
}: StepperProps) {
  const s = useStyles();
  const down = value - step >= min;
  const up = value + step <= max;
  return (
    <View style={[s.root, style]}>
      <Text variant="bodyLg">{label}</Text>
      <View style={s.controls}>
        <PressableBase
          accessibilityRole="button"
          accessibilityLabel={`${label} 줄이기`}
          disabled={!down}
          onPress={() => onValueChange(value - step)}
          pressedStyle={s.pressed}
          style={[s.button, !down && s.off]}
        >
          <Text variant="bodyLg">−</Text>
        </PressableBase>
        <Text variant="bodyLg" weight="bold" style={s.value}>
          {`${value}${suffix}`}
        </Text>
        <PressableBase
          accessibilityRole="button"
          accessibilityLabel={`${label} 늘리기`}
          disabled={!up}
          onPress={() => onValueChange(value + step)}
          pressedStyle={s.pressed}
          style={[s.button, !up && s.off]}
        >
          <Text variant="bodyLg">+</Text>
        </PressableBase>
      </View>
    </View>
  );
}
