import { useState } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, {
  Circle,
  Line,
  Path,
  Rect,
  Text as SvgText,
} from 'react-native-svg';
import { formatPrice } from '../components/price/price';
import { useTheme } from '../theme/theme-provider';
import { areaPath, labelStep, linearScale, linePath, niceTicks } from './scale';
import { summarize } from './summary';

export type ChartDatum = { label: string; value: number };

export type LineChartProps = {
  data: readonly ChartDatum[];
  /** 기본 200 */
  height?: number;
  /** y축 라벨. 기본은 천 단위 쉼표 */
  formatY?: (value: number) => string;
  /** x축 라벨. 기본은 label 그대로 */
  formatX?: (label: string, index: number) => string;
  /** 점을 눌렀을 때. 넘기면 각 구간이 눌린다 */
  onPointPress?: (datum: ChartDatum, index: number) => void;
  /** 기본은 최고 · 최저 · 마지막 값 요약 */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const defaultFormat = (v: number) => formatPrice(v, '');
const PAD = { top: 8, right: 12, bottom: 24, gap: 8 };
const FONT_SIZE = 11;

export function LineChart({
  data,
  height = 200,
  formatY = defaultFormat,
  formatX = (label) => label,
  onPointPress,
  accessibilityLabel,
  style,
}: LineChartProps) {
  const t = useTheme();
  const [width, setWidth] = useState(0);
  const values = data.map((d) => d.value);
  const ticks = niceTicks(Math.min(0, ...values), Math.max(0, ...values));
  const yLabels = ticks.map(formatY);
  const left =
    Math.max(...yLabels.map((l) => l.length)) * FONT_SIZE * 0.62 + PAD.gap;
  const plot = {
    x0: left,
    x1: width - PAD.right,
    y0: PAD.top,
    y1: height - PAD.bottom,
  };
  const y = linearScale(
    [ticks[0]!, ticks[ticks.length - 1]!],
    [plot.y1, plot.y0]
  );
  const x = linearScale([0, Math.max(1, data.length - 1)], [plot.x0, plot.x1]);
  const points = data.map((d, i) => ({
    x: data.length === 1 ? (plot.x0 + plot.x1) / 2 : x(i),
    y: y(d.value),
  }));
  const step = labelStep(
    data.length,
    Math.max(1, Math.floor((plot.x1 - plot.x0) / 56))
  );
  const last = points[points.length - 1];
  const slot =
    data.length > 1
      ? (plot.x1 - plot.x0) / (data.length - 1)
      : plot.x1 - plot.x0;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? summarize(values, formatY)}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={[{ height }, style]}
    >
      {width > 0 ? (
        <Svg width={width} height={height}>
          {ticks.map((tick, i) => (
            <Line
              key={`g${tick}`}
              x1={plot.x0}
              x2={plot.x1}
              y1={y(tick)}
              y2={y(tick)}
              stroke={t.colors.border}
              strokeWidth={1}
              strokeDasharray={i === 0 ? undefined : '3 4'}
            />
          ))}
          {ticks.map((tick, i) => (
            <SvgText
              key={`y${tick}`}
              x={plot.x0 - PAD.gap}
              y={y(tick) + FONT_SIZE / 3}
              fontSize={FONT_SIZE}
              fontFamily={t.fontFamily}
              fill={t.colors.mutedForeground}
              textAnchor="end"
            >
              {yLabels[i]}
            </SvgText>
          ))}
          {data.map((d, i) =>
            i % step === 0 || i === data.length - 1 ? (
              <SvgText
                key={`x${i}`}
                x={points[i]!.x}
                y={height - 6}
                fontSize={FONT_SIZE}
                fontFamily={t.fontFamily}
                fill={t.colors.mutedForeground}
                textAnchor={
                  i === 0 && data.length > 1
                    ? 'start'
                    : i === data.length - 1 && data.length > 1
                      ? 'end'
                      : 'middle'
                }
              >
                {formatX(d.label, i)}
              </SvgText>
            ) : null
          )}
          {points.length > 1 ? (
            <>
              <Path
                d={areaPath(points, plot.y1)}
                fill={t.colors.primary}
                fillOpacity={0.12}
              />
              <Path
                d={linePath(points)}
                fill="none"
                stroke={t.colors.primary}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </>
          ) : null}
          {last ? (
            <Circle
              cx={last.x}
              cy={last.y}
              r={4}
              fill={t.colors.primary}
              stroke={t.colors.background}
              strokeWidth={2}
            />
          ) : null}
          {onPointPress
            ? data.map((d, i) => (
                <Rect
                  key={`hit${i}`}
                  x={points[i]!.x - slot / 2}
                  y={plot.y0}
                  width={slot}
                  height={plot.y1 - plot.y0}
                  fill="transparent"
                  onPress={() => onPointPress(d, i)}
                />
              ))
            : null}
        </Svg>
      ) : null}
    </View>
  );
}
