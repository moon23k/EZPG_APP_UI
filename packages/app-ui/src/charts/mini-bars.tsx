import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { formatPrice } from '../components/price/price';
import { Text } from '../components/text/text';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import { summarize } from './summary';

export type MiniBarsProps = {
  data: readonly number[];
  labels?: readonly string[];
  height?: number;
  barWidth?: number;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[1] },
  labels: { flexDirection: 'row' },
  label: { textAlign: 'center' },
}));

export function MiniBars({
  data,
  labels,
  height = 40,
  barWidth = 14,
  accessibilityLabel,
  style,
}: MiniBarsProps) {
  const t = useTheme();
  const s = useStyles();
  const gap = t.space[1] + t.space[1] / 2;
  const width = data.length * barWidth + Math.max(0, data.length - 1) * gap;
  const max = Math.max(1, ...data);
  const last = data.length - 1;
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={
        accessibilityLabel ?? summarize([...data], (v) => formatPrice(v, ''))
      }
      style={[s.root, { width }, style]}
    >
      <Svg width={width} height={height}>
        {data.map((value, i) => {
          const h = Math.max(t.space[1] - 1, (value / max) * height);
          return (
            <Rect
              key={i}
              x={i * (barWidth + gap)}
              y={height - h}
              width={barWidth}
              height={h}
              rx={barWidth / 2 - 1}
              fill={i === last ? t.colors.primary : t.colors.primaryContainer}
            />
          );
        })}
      </Svg>
      {labels ? (
        <View style={[s.labels, { gap }]}>
          {labels.map((label, i) => (
            <Text
              key={i}
              variant="caption"
              tone={i === last ? 'default' : 'muted'}
              weight={i === last ? 'bold' : undefined}
              numberOfLines={1}
              style={[s.label, { width: barWidth }]}
              allowFontScaling={false}
            >
              {label}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}
