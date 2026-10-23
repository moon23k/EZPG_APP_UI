import { makeStyles, Text } from '@ezpg/native-ui';
import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Card } from '../internal/card';

export type StatCardProps = {
  label: string;
  /** 이미 포맷된 값. 예) '128만원', '42건' */
  value: string;
  /** 전기 대비 증감률(%) */
  change?: number | null;
  /** 기본 '지난 기간 대비' */
  changeLabel?: string;
  /** 오른쪽 작은 차트. 예) <Sparkline /> (@ezpg/native-ui/charts) */
  chart?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: t.space[3] },
  body: { flex: 1, gap: t.space[1] },
}));

/** 핵심 숫자 하나와 증감 */
export function StatCard({
  label,
  value,
  change,
  changeLabel = '지난 기간 대비',
  chart,
  onPress,
  style,
}: StatCardProps) {
  const s = useStyles();
  const hasChange =
    change !== undefined && change !== null && Number.isFinite(change);
  const up = hasChange && change > 0;
  const flat = hasChange && Math.abs(change) < 0.05;
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${label} ${value}`}
      style={style}
    >
      <View style={s.row}>
        <View style={s.body}>
          <Text variant="caption" tone="muted">
            {label}
          </Text>
          <Text variant="title">{value}</Text>
          {hasChange ? (
            <Text
              variant="caption"
              tone={flat ? 'muted' : up ? 'success' : 'destructive'}
            >
              {flat
                ? '변동 없음'
                : `${up ? '▲' : '▼'} ${Math.abs(change).toFixed(1)}%`}
              <Text variant="caption" tone="muted">
                {'  '}
                {changeLabel}
              </Text>
            </Text>
          ) : null}
        </View>
        {chart}
      </View>
    </Card>
  );
}
