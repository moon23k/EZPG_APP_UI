import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { formatPrice } from '../../components/price/price';
import { Text } from '../../components/text/text';
import { CheckGlyph } from '../../internal/glyphs';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Card } from '../internal/card';

export type PlanState =
  'none' | 'trial' | 'active' | 'cancelScheduled' | 'pastDue' | 'suspended';

export type PlanCardProps = {
  name: string;
  price: number;
  monthlyCredits: number;
  dailyLimit: number | null;
  features?: readonly string[];
  current?: boolean;
  recommended?: boolean;
  state?: PlanState;
  cancelDate?: string;
  proratedAmount?: number;
  priceChange?: { newPrice: number; effectiveDate: string; consented: boolean };
  onSelect?: () => void;
  onConsent?: () => void;
  actionLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  recommended: {
    borderColor: t.colors.primary,
    borderWidth: 2,
    padding: t.space[4] - 1,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  name: { flex: 1 },
  list: { gap: 6 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    paddingTop: t.space[3],
    borderTopWidth: 1,
    borderTopColor: t.colors.border,
  },
  changePrice: { flex: 1 },
}));

function stateText(state: PlanState, cancelDate?: string): string | null {
  switch (state) {
    case 'none':
      return '구독 전';
    case 'trial':
      return '체험 중';
    case 'cancelScheduled':
      return cancelDate ? `${cancelDate} 해지` : '해지 신청됨';
    case 'pastDue':
      return '결제 실패';
    case 'suspended':
      return '이용 정지';
    default:
      return null;
  }
}

export function PlanCard({
  name,
  price,
  monthlyCredits,
  dailyLimit,
  features = [],
  current,
  recommended,
  state = 'active',
  cancelDate,
  proratedAmount,
  priceChange,
  onSelect,
  onConsent,
  actionLabel = '이 플랜으로 변경',
  style,
}: PlanCardProps) {
  const t = useTheme();
  const s = useStyles();
  const items = [
    `월 크레딧 ${formatPrice(monthlyCredits, '')}`,
    dailyLimit === null ? '하루 생성 무제한' : `하루 생성 ${dailyLimit}회`,
    ...features,
  ];
  const notice = state === 'none' || state === 'trial';
  const alert = current || notice ? stateText(state, cancelDate) : null;
  return (
    <Card style={[recommended && s.recommended, style]}>
      <View style={s.head}>
        <Text variant="bodyLg" weight="bold" style={s.name}>
          {name}
        </Text>
        <Text variant="bodyLg" weight="bold">
          월 {formatPrice(price)}
        </Text>
      </View>
      <View style={s.list}>
        {items.map((item) => (
          <View key={item} style={s.feature}>
            <CheckGlyph color={t.colors.foreground} size={16} />
            <Text>{item}</Text>
          </View>
        ))}
      </View>
      {alert ? (
        <Text
          tone={notice ? 'muted' : 'destructive'}
          weight={notice ? 'semibold' : undefined}
        >
          {alert}
        </Text>
      ) : null}
      {priceChange ? (
        <View style={s.change}>
          <Text tone="muted">{priceChange.effectiveDate}부터</Text>
          <Text weight="bold" style={s.changePrice}>
            월 {formatPrice(priceChange.newPrice)}
          </Text>
          {priceChange.consented ? (
            <Text tone="muted">동의함</Text>
          ) : onConsent ? (
            <Button size="sm" onPress={onConsent}>
              인상 동의
            </Button>
          ) : null}
        </View>
      ) : null}
      {!current && onSelect ? (
        <Button
          size="lg"
          variant={recommended ? 'solid' : 'outline'}
          onPress={onSelect}
        >
          {proratedAmount !== undefined && proratedAmount > 0
            ? `${formatPrice(proratedAmount)} 결제하고 ${actionLabel}`
            : actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}
