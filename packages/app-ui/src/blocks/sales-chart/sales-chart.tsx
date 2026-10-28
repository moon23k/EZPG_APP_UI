import { View, type StyleProp, type ViewStyle } from 'react-native';
import { EmptyState } from '../../components/empty-state/empty-state';
import { formatPrice } from '../../components/price/price';
import { SegmentedTabs } from '../../components/segmented-tabs/segmented-tabs';
import { Skeleton } from '../../components/skeleton/skeleton';
import { Text } from '../../components/text/text';
import { makeStyles } from '../../utils/styles';
import { LineChart, type ChartDatum } from '../../charts/line-chart';
import { Card } from '../internal/card';
import { changeRate, formatManwon } from '../internal/format';

export type SalesPeriod = 'today' | 'week' | 'month';

export type SalesChartProps = {
  period: SalesPeriod;
  onPeriodChange: (period: SalesPeriod) => void;
  total: number;
  previousTotal?: number;
  refundTotal?: number;
  data?: readonly ChartDatum[];
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PERIODS = [
  { value: 'today', label: '오늘' },
  { value: 'week', label: '7일' },
  { value: 'month', label: '30일' },
] as const;

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: t.controlSize.sm,
  },
  divided: { borderBottomWidth: 1, borderBottomColor: t.colors.border },
  net: { minHeight: t.listRow.oneLine },
  netValue: { flexDirection: 'row', alignItems: 'baseline', gap: t.space[2] },
  down: { color: t.colors.info },
}));

export function SalesChart({
  period,
  onPeriodChange,
  total,
  previousTotal,
  refundTotal = 0,
  data = [],
  loading,
  style,
}: SalesChartProps) {
  const s = useStyles();
  const rate =
    previousTotal !== undefined ? changeRate(total, previousTotal) : null;
  const up = rate !== null && rate >= 0;
  const empty = !loading && total === 0 && refundTotal === 0;

  return (
    <Card style={style}>
      <SegmentedTabs<SalesPeriod>
        items={PERIODS}
        value={period}
        onValueChange={onPeriodChange}
      />
      {loading ? (
        <>
          <Skeleton height={44} />
          <Skeleton height={44} />
          <Skeleton height={56} />
        </>
      ) : empty ? (
        <EmptyState variant="section" title="이 기간 매출이 없어요" />
      ) : (
        <>
          <View>
            <View style={s.row}>
              <Text tone="muted">총매출</Text>
              <Text>{formatPrice(total + refundTotal)}</Text>
            </View>
            <View style={[s.row, s.divided]}>
              <Text tone="muted">환불</Text>
              <Text>
                {refundTotal > 0 ? '−' : ''}
                {formatPrice(refundTotal)}
              </Text>
            </View>
            <View style={[s.row, s.net]}>
              <Text weight="bold">순매출</Text>
              <View style={s.netValue}>
                {rate !== null ? (
                  <Text
                    weight="bold"
                    tone={up ? 'danger' : 'default'}
                    style={!up && s.down}
                    accessibilityLabel={`직전 기간보다 ${Math.abs(rate).toFixed(1)}% ${up ? '증가' : '감소'}`}
                  >
                    {up ? '▲' : '▼'} {Math.abs(rate).toFixed(1)}%
                  </Text>
                ) : null}
                <Text variant="title" weight="bold">
                  {formatPrice(total)}
                </Text>
              </View>
            </View>
          </View>
          {data.length > 1 ? (
            <LineChart data={data} formatY={formatManwon} height={180} />
          ) : null}
        </>
      )}
    </Card>
  );
}
