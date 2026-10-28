import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { CheckGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { pickForeground } from '../../utils/color';
import { makeStyles } from '../../utils/styles';

export type ColorSwatch = { value: string; label: string };

export type ColorSwatchPickerProps = {
  colors: readonly ColorSwatch[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'circle' | 'card';
  style?: StyleProp<ViewStyle>;
};

const DOT = 40;

const useStyles = makeStyles((t) => ({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[3] },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    padding: 3,
    borderRadius: DOT,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  ringOn: { borderColor: t.colors.foreground },
  card: {
    width: 148,
    gap: t.space[2],
    padding: t.space[3],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  cardOn: {
    borderColor: t.colors.foreground,
    borderWidth: 2,
    padding: t.space[3] - 1,
  },
  sample: {
    height: 32,
    borderRadius: t.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 6,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.muted,
  },
  long: { width: '70%' },
  short: { width: '45%' },
}));

export function ColorSwatchPicker({
  colors,
  value,
  onValueChange,
  variant = 'circle',
  style,
}: ColorSwatchPickerProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View accessibilityRole="radiogroup" style={[s.wrap, style]}>
      {colors.map((c) => {
        const selected = c.value.toLowerCase() === value.toLowerCase();
        const fg = pickForeground(c.value, '#0a0a0a', '#ffffff');
        return (
          <PressableBase
            key={c.value}
            accessibilityRole="radio"
            accessibilityLabel={c.label}
            accessibilityState={{ selected }}
            touchHeight={DOT}
            pressedStyle={{}}
            onPress={() => onValueChange(c.value)}
            style={
              variant === 'card'
                ? [s.card, selected && s.cardOn]
                : [s.ring, selected && s.ringOn]
            }
          >
            {variant === 'card' ? (
              <>
                <View style={[s.line, s.long]} />
                <View style={[s.line, s.short]} />
                <View style={[s.sample, { backgroundColor: c.value }]}>
                  <Text
                    variant="caption"
                    weight="semibold"
                    style={{ color: fg }}
                  >
                    {c.label}
                  </Text>
                </View>
              </>
            ) : (
              <View style={[s.dot, { backgroundColor: c.value }]}>
                {selected ? (
                  <CheckGlyph color={fg} size={t.iconSize.md} />
                ) : null}
              </View>
            )}
          </PressableBase>
        );
      })}
    </View>
  );
}
