import {
  EmptyState,
  formatPrice,
  makeStyles,
  SegmentedTabs,
  Skeleton,
  Text,
} from '@ezpg/native-ui';
import { LineChart, type ChartDatum } from '@ezpg/native-ui/charts';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Card } from '../internal/card';
import { changeRate, formatManwon } from '../internal/format';

export type SalesPeriod = 'week' | 'month' | 'quarter';

export type SalesChartProps = {
  period: SalesPeriod;
  onPeriodChange: (period: SalesPeriod) => void;
  data: readonly ChartDatum[];
  /** 기간 순매출 (환불 차감 후) */
  total: number;
  /** 직전 같은 기간 순매출 */
  previousTotal?: number;
  /** 기간 중 환불 합계 */
  refundTotal?: number;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PERIODS = [
  { value: 'week', label: '7일' },
  { value: 'month', label: '30일' },
  { value: 'quarter', label: '90일' },
] as const;

const useStyles = makeStyles((t) => ({
  head: { gap: t.space[1] },
  sub: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[3] },
}));

/** 기간별 매출 추이 */
export function SalesChart({
  period,
  onPeriodChange,
  data,
  total,
  previousTotal,
  refundTotal,
  loading,
  style,
}: SalesChartProps) {
  const s = useStyles();
  const rate =
    previousTotal !== undefined ? changeRate(total, previousTotal) : null;
  const empty = !loading && data.every((d) => d.value === 0);

  return (
    <Card style={style}>
      <SegmentedTabs<SalesPeriod>
        items={PERIODS}
        value={period}
        onValueChange={onPeriodChange}
      />
      {loading ? (
        <>
          <Skeleton width="50%" height={28} />
          <Skeleton height={180} />
        </>
      ) : empty ? (
        <EmptyState variant="section" title="이 기간 매출이 없어요" />
      ) : (
        <>
          <View style={s.head}>
            <Text variant="caption" tone="muted">
              순매출
            </Text>
            <Text variant="display">{formatPrice(total)}</Text>
            <View style={s.sub}>
              {rate !== null ? (
                <Text
                  variant="caption"
                  tone={rate >= 0 ? 'success' : 'destructive'}
                >
                  {rate >= 0 ? '▲' : '▼'} {Math.abs(rate).toFixed(1)}% 직전 기간
                  대비
                </Text>
              ) : null}
              {refundTotal ? (
                <Text variant="caption" tone="muted">
                  환불 -{formatPrice(refundTotal)} 반영
                </Text>
              ) : null}
            </View>
          </View>
          <LineChart data={data} formatY={formatManwon} height={180} />
        </>
      )}
    </Card>
  );
}
