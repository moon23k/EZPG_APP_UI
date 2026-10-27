import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { formatPrice } from '../components/price/price';
import { useTheme } from '../theme/theme-provider';
import { linearScale, linePath } from './scale';
import { summarize } from './summary';

export type SparklineProps = {
  data: readonly number[];
  width?: number;
  height?: number;
  color?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function Sparkline({
  data,
  width = 80,
  height = 24,
  color,
  accessibilityLabel,
  style,
}: SparklineProps) {
  const t = useTheme();
  const values = [...data];
  const stroke = 1.5;
  const y = linearScale(
    [Math.min(...values), Math.max(...values)],
    [height - stroke, stroke]
  );
  const x = linearScale(
    [0, Math.max(1, values.length - 1)],
    [stroke, width - stroke]
  );
  const points = values.map((v, i) => ({ x: x(i), y: y(v) }));
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={
        accessibilityLabel ?? summarize(values, (v) => formatPrice(v, ''))
      }
      style={[{ width, height }, style]}
    >
      {points.length > 1 ? (
        <Svg width={width} height={height}>
          <Path
            d={linePath(points)}
            fill="none"
            stroke={color ?? t.colors.primary}
            strokeWidth={stroke}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </Svg>
      ) : null}
    </View>
  );
}
