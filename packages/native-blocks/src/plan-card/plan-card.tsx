import {
  Button,
  formatPrice,
  makeStyles,
  StatusBadge,
  Text,
  type StatusBadgeTone,
} from '@ezpg/native-ui';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Card } from '../internal/card';

export type PlanState = 'active' | 'cancelScheduled' | 'pastDue' | 'suspended';

export type PlanCardProps = {
  name: string;
  /** 월 요금 */
  price: number;
  /** 매월 주는 크레딧 */
  monthlyCredits: number;
  /** 하루 생성 한도 */
  dailyLimit: number;
  features?: readonly string[];
  current?: boolean;
  recommended?: boolean;
  /** 지금 구독 상태 (current일 때) */
  state?: PlanState;
  /** 예) '11월 30일' — 해지 예약일 */
  cancelDate?: string;
  /** 바꾸면 오늘 결제할 일할 금액 (음수면 다음 결제에서 차감) */
  proratedAmount?: number;
  /** 가격 인상 예정 */
  priceChange?: { newPrice: number; effectiveDate: string; consented: boolean };
  onSelect?: () => void;
  onConsent?: () => void;
  /** 기본 '이 요금제로 변경' */
  actionLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const STATE: Record<PlanState, { label: string; tone: StatusBadgeTone }> = {
  active: { label: '이용 중', tone: 'success' },
  cancelScheduled: { label: '해지 예약', tone: 'warning' },
  pastDue: { label: '결제 실패', tone: 'destructive' },
  suspended: { label: '이용 정지', tone: 'destructive' },
};

const useStyles = makeStyles((t) => ({
  recommended: { borderColor: t.colors.primary, borderWidth: 2 },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  price: { flexDirection: 'row', alignItems: 'baseline', gap: t.space[1] },
  list: { gap: t.space[1] },
  start: { alignSelf: 'flex-start' },
  notice: {
    gap: t.space[2],
    padding: t.space[3],
    borderRadius: t.radius.md,
    backgroundColor: t.colors.muted,
  },
}));

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
  actionLabel = '이 요금제로 변경',
  style,
}: PlanCardProps) {
  const s = useStyles();
  return (
    <Card style={[recommended && s.recommended, style]}>
      <View style={s.head}>
        <Text variant="title">{name}</Text>
        {current ? (
          <StatusBadge tone={STATE[state].tone}>
            {STATE[state].label}
          </StatusBadge>
        ) : null}
        {recommended && !current ? (
          <StatusBadge tone="info">추천</StatusBadge>
        ) : null}
      </View>
      <View style={s.price}>
        <Text variant="display">{formatPrice(price)}</Text>
        <Text tone="muted">/ 월</Text>
      </View>
      <View style={s.list}>
        <Text tone="muted">
          매월 크레딧 {formatPrice(monthlyCredits, '')}개
        </Text>
        <Text tone="muted">하루 생성 {dailyLimit}회까지</Text>
        {features.map((f) => (
          <Text key={f} tone="muted">
            {f}
          </Text>
        ))}
      </View>
      {current && state === 'cancelScheduled' && cancelDate ? (
        <Text tone="destructive">
          {cancelDate}에 해지돼요. 그 전까지는 계속 쓸 수 있어요.
        </Text>
      ) : null}
      {priceChange ? (
        <View style={s.notice}>
          <Text>
            {priceChange.effectiveDate}부터 {formatPrice(priceChange.newPrice)}
            으로 바뀌어요.
          </Text>
          {priceChange.consented ? (
            <Text variant="caption" tone="success">
              동의했어요
            </Text>
          ) : onConsent ? (
            <Button
              size="sm"
              variant="outline"
              onPress={onConsent}
              style={s.start}
            >
              변경 내용 확인하고 동의
            </Button>
          ) : null}
        </View>
      ) : null}
      {!current && onSelect ? (
        <>
          {proratedAmount !== undefined ? (
            <Text variant="caption" tone="muted">
              {proratedAmount >= 0
                ? `오늘 ${formatPrice(proratedAmount)} 결제 (남은 기간 일할)`
                : `다음 결제에서 ${formatPrice(-proratedAmount)} 차감`}
            </Text>
          ) : null}
          <Button
            variant={recommended ? 'solid' : 'outline'}
            onPress={onSelect}
          >
            {actionLabel}
          </Button>
        </>
      ) : null}
    </Card>
  );
}
