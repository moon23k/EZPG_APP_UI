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
  variant?: 'circle' | 'card' | 'grid';
  style?: StyleProp<ViewStyle>;
};

const DOT = 40;
const GRID = 44;
const MARK = 18;
const RING = 2;
const RING_GAP = 3;

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
  ringOn: { borderColor: t.colors.primary },
  cell: { width: GRID, height: GRID, borderRadius: t.radius.full },
  cellRing: {
    position: 'absolute',
    top: -(RING + RING_GAP),
    left: -(RING + RING_GAP),
    right: -(RING + RING_GAP),
    bottom: -(RING + RING_GAP),
    borderRadius: t.radius.full,
    borderWidth: RING,
    borderColor: t.colors.foreground,
  },
  card: {
    width: 148,
    gap: t.space[2],
    padding: t.space[3],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
  },
  cardOn: {
    borderColor: t.colors.primaryTint,
    backgroundColor: t.colors.primaryTint,
  },
  mark: {
    position: 'absolute',
    top: t.space[1],
    right: t.space[1],
    width: MARK,
    height: MARK,
    borderRadius: MARK / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.primary,
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
            touchHeight={variant === 'grid' ? GRID : DOT}
            pressedStyle={{}}
            onPress={() => onValueChange(c.value)}
            style={
              variant === 'card'
                ? [s.card, selected && s.cardOn]
                : variant === 'grid'
                  ? [s.cell, { backgroundColor: c.value }]
                  : [s.ring, selected && s.ringOn]
            }
          >
            {variant === 'grid' ? (
              selected ? (
                <View style={s.cellRing} pointerEvents="none" />
              ) : null
            ) : variant === 'card' ? (
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
                {selected ? (
                  <View style={s.mark}>
                    <CheckGlyph color={t.colors.primaryForeground} size={12} />
                  </View>
                ) : null}
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
