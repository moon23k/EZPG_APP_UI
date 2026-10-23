import {
  formatPrice,
  ListRow,
  makeStyles,
  StatusBadge,
  Text,
  type StatusBadgeTone,
} from '@ezpg/native-ui';
import { View } from 'react-native';

export type InvoiceKind = 'subscription' | 'credits' | 'proration';
export type InvoiceStatus =
  | 'paid'
  | 'failed'
  | 'retrying'
  | 'refunded'
  | 'partiallyRefunded'
  | 'incomplete';
/** hard: 카드 문제(교체 필요) · soft: 일시 오류(재시도) · ours: 우리 쪽 오류 */
export type PaymentFailure = 'hard' | 'soft' | 'ours';

export type InvoiceRowProps = {
  kind: InvoiceKind;
  /** 예) '베이직 · 11월' */
  title: string;
  amount: number;
  /** 예) '10월 23일' */
  date: string;
  status: InvoiceStatus;
  failure?: PaymentFailure;
  /** 예) '10월 26일' */
  nextRetry?: string;
  graceDaysLeft?: number;
  cardLast4?: string;
  refundedAmount?: number;
  onPress?: () => void;
};

const KIND: Record<InvoiceKind, string> = {
  subscription: '구독',
  credits: '크레딧 구매',
  proration: '요금제 변경',
};
const STATUS: Record<InvoiceStatus, { label: string; tone: StatusBadgeTone }> =
  {
    paid: { label: '결제 완료', tone: 'success' },
    failed: { label: '결제 실패', tone: 'destructive' },
    retrying: { label: '재시도 예정', tone: 'warning' },
    refunded: { label: '환불', tone: 'neutral' },
    partiallyRefunded: { label: '부분 환불', tone: 'neutral' },
    incomplete: { label: '결제 미완료', tone: 'warning' },
  };
const FAILURE: Record<PaymentFailure, string> = {
  hard: '카드를 바꿔야 해요',
  soft: '일시적인 오류예요',
  ours: '저희 쪽 오류예요. 자동으로 다시 시도해요',
};

const useStyles = makeStyles((t) => ({
  trailing: { alignItems: 'flex-end', gap: t.space[1] },
}));

/** 결제 내역 한 건 */
export function InvoiceRow({
  kind,
  title,
  amount,
  date,
  status,
  failure,
  nextRetry,
  graceDaysLeft,
  cardLast4,
  refundedAmount,
  onPress,
}: InvoiceRowProps) {
  const s = useStyles();
  const st = STATUS[status];
  const lines = [
    `${KIND[kind]} · ${date}${cardLast4 ? ` · 카드 ${cardLast4}` : ''}`,
  ];
  if (failure && (status === 'failed' || status === 'retrying'))
    lines.push(FAILURE[failure]);
  if (nextRetry && status === 'retrying') lines.push(`${nextRetry} 다시 결제`);
  if (graceDaysLeft !== undefined && status !== 'paid')
    lines.push(`유예 ${graceDaysLeft}일 남음`);
  if (refundedAmount) lines.push(`${formatPrice(refundedAmount)} 환불`);
  return (
    <ListRow
      title={title}
      description={lines.join(' · ')}
      onPress={onPress}
      trailing={
        <View style={s.trailing}>
          <Text weight="semibold">{formatPrice(amount)}</Text>
          <StatusBadge tone={st.tone}>{st.label}</StatusBadge>
        </View>
      }
    />
  );
}
