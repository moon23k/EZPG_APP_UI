import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { formatPrice } from '../../components/price/price';
import { Text } from '../../components/text/text';
import { makeStyles } from '../../utils/styles';
import { Card } from '../internal/card';

export type CreditWalletProps = {
  balance: number;
  expiring?: number;
  todayUsed: number;
  dailyLimit: number | null;
  onBuy?: () => void;
  onHistory?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[3] },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  expiring: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: t.controlSize.sm,
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.md,
    backgroundColor: `${t.colors.warning}24`,
  },
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

export function CreditWallet({
  balance,
  expiring,
  todayUsed,
  dailyLimit,
  onBuy,
  onHistory,
  style,
}: CreditWalletProps) {
  const s = useStyles();
  const ratio =
    dailyLimit === null
      ? 0
      : dailyLimit > 0
        ? Math.min(1, todayUsed / dailyLimit)
        : 1;
  return (
    <View style={[s.root, style]}>
      <Card>
        <View style={s.row}>
          <Text weight="semibold">보유 크레딧</Text>
          <Text variant="display">{formatPrice(balance, '')}</Text>
        </View>
        {expiring !== undefined && expiring > 0 ? (
          <View style={s.expiring}>
            <Text>이번 달 소멸</Text>
            <Text weight="bold">{formatPrice(expiring, '')}개</Text>
          </View>
        ) : null}
        {onBuy || onHistory ? (
          <View style={s.actions}>
            {onHistory ? (
              <Button variant="secondary" style={s.action} onPress={onHistory}>
                내역
              </Button>
            ) : null}
            {onBuy ? (
              <Button style={s.action} onPress={onBuy}>
                충전
              </Button>
            ) : null}
          </View>
        ) : null}
      </Card>
      <Card>
        <View style={s.row}>
          <Text weight="semibold">오늘 생성</Text>
          <Text>
            <Text weight="bold">{todayUsed}</Text> /{' '}
            {dailyLimit === null ? '무제한' : dailyLimit}
          </Text>
        </View>
        {dailyLimit === null ? null : (
          <View
            accessible
            accessibilityRole="progressbar"
            accessibilityLabel="오늘 생성"
            accessibilityValue={{ min: 0, max: dailyLimit, now: todayUsed }}
            style={s.meter}
          >
            <View style={[s.fill, { width: `${ratio * 100}%` }]} />
          </View>
        )}
      </Card>
    </View>
  );
}
