import { Button, formatPrice, makeStyles, Text } from '@ezpg/native-ui';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Card } from '../internal/card';

export type CreditWalletProps = {
  balance: number;
  /** 생성 1회에 드는 크레딧 */
  perGeneration: number;
  todayUsed: number;
  dailyLimit: number;
  /** 가장 먼저 사라지는 묶음 */
  expiring?: { amount: number; date: string };
  onBuy?: () => void;
  onHistory?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'baseline', gap: t.space[2] },
  meter: {
    height: 6,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.muted,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: t.colors.primary },
  actions: { flexDirection: 'row', gap: t.space[2] },
  action: { flex: 1 },
}));

/** 크레딧 잔액과 오늘 남은 생성 횟수 */
export function CreditWallet({
  balance,
  perGeneration,
  todayUsed,
  dailyLimit,
  expiring,
  onBuy,
  onHistory,
  style,
}: CreditWalletProps) {
  const s = useStyles();
  const possible = perGeneration > 0 ? Math.floor(balance / perGeneration) : 0;
  const left = Math.max(0, dailyLimit - todayUsed);
  const ratio = dailyLimit > 0 ? Math.min(1, todayUsed / dailyLimit) : 1;
  return (
    <Card style={style}>
      <Text variant="caption" tone="muted">
        크레딧
      </Text>
      <View style={s.row}>
        <Text variant="display">{formatPrice(balance, '')}</Text>
        <Text tone="muted">약 {possible}회 만들 수 있어요</Text>
      </View>
      {expiring && expiring.amount > 0 ? (
        <Text variant="caption" tone="destructive">
          {formatPrice(expiring.amount, '')}개가 {expiring.date}에 사라져요
        </Text>
      ) : null}
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={`오늘 ${dailyLimit}회 중 ${todayUsed}회 사용`}
        accessibilityValue={{ min: 0, max: dailyLimit, now: todayUsed }}
      >
        <Text variant="caption" tone="muted">
          오늘 남은 생성 {left}/{dailyLimit}회
        </Text>
      </View>
      <View style={s.meter}>
        <View style={[s.fill, { width: `${ratio * 100}%` }]} />
      </View>
      {onBuy || onHistory ? (
        <View style={s.actions}>
          {onHistory ? (
            <Button
              variant="outline"
              size="sm"
              style={s.action}
              onPress={onHistory}
            >
              사용 내역
            </Button>
          ) : null}
          {onBuy ? (
            <Button size="sm" style={s.action} onPress={onBuy}>
              크레딧 충전
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
