import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import type { TypographyVariant } from '../../types';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export function formatPrice(value: number, unit = '원'): string {
  const n = Math.round(value);
  const digits = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${n < 0 ? '-' : ''}${digits}${unit}`;
}

export type PriceProps = {
  value: number;
  originalValue?: number;
  variant?: TypographyVariant;
  unit?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'baseline', gap: t.space[2] },
  value: {
    fontFamily: t.fontFamily,
    fontWeight: '700',
    color: t.colors.foreground,
  },
  original: {
    ...t.typography.caption,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
    textDecorationLine: 'line-through',
  },
  rate: {
    ...t.typography.caption,
    fontFamily: t.fontFamily,
    fontWeight: '700',
    color: t.colors.danger,
  },
}));

export function Price({
  value,
  originalValue,
  variant = 'body',
  unit,
  style,
}: PriceProps) {
  const t = useTheme();
  const s = useStyles();
  const discounted = originalValue !== undefined && originalValue > value;
  const rate = discounted ? Math.round((1 - value / originalValue) * 100) : 0;
  const label = discounted
    ? `${formatPrice(value, unit)}, 할인 전 ${formatPrice(originalValue, unit)}`
    : formatPrice(value, unit);
  return (
    <View style={[s.row, style]} accessible accessibilityLabel={label}>
      {discounted ? (
        <Text maxFontSizeMultiplier={t.maxFontScale} style={s.rate}>
          {rate}%
        </Text>
      ) : null}
      <Text
        maxFontSizeMultiplier={t.maxFontScale}
        style={[
          s.value,
          {
            fontSize: t.typography[variant].fontSize,
            lineHeight: t.typography[variant].lineHeight,
          },
        ]}
      >
        {formatPrice(value, unit)}
      </Text>
      {discounted ? (
        <Text maxFontSizeMultiplier={t.maxFontScale} style={s.original}>
          {formatPrice(originalValue, unit)}
        </Text>
      ) : null}
    </View>
  );
}
