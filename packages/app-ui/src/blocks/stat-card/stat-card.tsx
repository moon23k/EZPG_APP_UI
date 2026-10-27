import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { makeStyles } from '../../utils/styles';
import { Card } from '../internal/card';

export type StatCardProps = {
  label: string;
  value: string;
  change?: number | null;
  chart?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: t.space[3] },
  body: { flex: 1, gap: t.space[1] },
  value: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    columnGap: t.space[2],
  },
  down: { color: t.colors.info },
}));

export function StatCard({
  label,
  value,
  change,
  chart,
  onPress,
  style,
}: StatCardProps) {
  const s = useStyles();
  const hasChange =
    change !== undefined && change !== null && Number.isFinite(change);
  const flat = hasChange && Math.abs(change) < 0.05;
  const up = hasChange && change > 0;
  const rate = hasChange ? `${Math.abs(change).toFixed(1)}%` : '';
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${label} ${value}${
        hasChange && !flat ? ` ${rate} ${up ? '증가' : '감소'}` : ''
      }`}
      style={style}
    >
      <View style={s.row}>
        <View style={s.body}>
          <Text tone="muted">{label}</Text>
          <View style={s.value}>
            <Text variant="title" weight="bold">
              {value}
            </Text>
            {hasChange ? (
              <Text
                weight="bold"
                tone={flat ? 'muted' : up ? 'danger' : 'default'}
                style={!flat && !up && s.down}
              >
                {flat ? '변동 없음' : `${up ? '▲' : '▼'} ${rate}`}
              </Text>
            ) : null}
          </View>
        </View>
        {chart}
      </View>
    </Card>
  );
}
