import {
  Button,
  formatPrice,
  makeStyles,
  StatusBadge,
  Text,
  type ButtonVariant,
  type StatusBadgeTone,
} from '@ezpg/native-ui';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Card } from '../internal/card';
import { formatDday } from '../internal/format';

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'preparing'
  | 'shipping'
  | 'delivered'
  | 'confirmed'
  | 'partiallyCanceled'
  | 'cancelRequested'
  | 'returnRequested'
  | 'exchangeRequested'
  | 'canceled'
  | 'refunded';

/** 주문 상태 → 라벨 · 색 */
export const orderStatusMeta: Record<
  OrderStatus,
  { label: string; tone: StatusBadgeTone }
> = {
  pending: { label: '결제 대기', tone: 'neutral' },
  paid: { label: '결제 완료', tone: 'info' },
  preparing: { label: '배송 준비', tone: 'info' },
  shipping: { label: '배송 중', tone: 'info' },
  delivered: { label: '배송 완료', tone: 'success' },
  confirmed: { label: '구매 확정', tone: 'success' },
  partiallyCanceled: { label: '부분 취소', tone: 'neutral' },
  cancelRequested: { label: '취소 요청', tone: 'warning' },
  returnRequested: { label: '반품 요청', tone: 'warning' },
  exchangeRequested: { label: '교환 요청', tone: 'warning' },
  canceled: { label: '취소', tone: 'destructive' },
  refunded: { label: '환불 완료', tone: 'neutral' },
};

export type OrderItem = { name: string; option?: string; quantity: number };

export type OrderAction = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
};

export type OrderCardProps = {
  orderNo: string;
  status: OrderStatus;
  /** 예) '10월 23일 14:02' */
  orderedAt: string;
  buyer: string;
  items: readonly OrderItem[];
  /** 결제 금액 */
  total: number;
  /** 부분 취소된 금액 */
  canceledAmount?: number;
  /** 처리 기한까지 남은 영업일 */
  dueInDays?: number;
  actions?: readonly OrderAction[];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  no: { flex: 1 },
  foot: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: t.space[2],
  },
  actions: { flexDirection: 'row', gap: t.space[2] },
  action: { flex: 1 },
}));

function summarizeItems(items: readonly OrderItem[]) {
  const [first, ...rest] = items;
  if (!first) return '';
  const name = first.option ? `${first.name} (${first.option})` : first.name;
  return rest.length
    ? `${name} 외 ${rest.length}건`
    : `${name} × ${first.quantity}`;
}

/** 주문 목록의 한 건 */
export function OrderCard({
  orderNo,
  status,
  orderedAt,
  buyer,
  items,
  total,
  canceledAmount,
  dueInDays,
  actions = [],
  onPress,
  style,
}: OrderCardProps) {
  const s = useStyles();
  const meta = orderStatusMeta[status];
  const summary = summarizeItems(items);
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`주문 ${orderNo}, ${meta.label}, ${summary}`}
      style={style}
    >
      <View style={s.head}>
        <Text variant="caption" tone="muted" style={s.no}>
          {orderNo}
        </Text>
        {dueInDays !== undefined ? (
          <Text
            variant="caption"
            tone={dueInDays <= 1 ? 'destructive' : 'muted'}
          >
            처리 기한 {formatDday(dueInDays)}
          </Text>
        ) : null}
        <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
      </View>
      <Text variant="bodyLg" numberOfLines={1}>
        {summary}
      </Text>
      <View style={s.foot}>
        <Text variant="caption" tone="muted">
          {buyer} · {orderedAt}
        </Text>
        <View>
          <Text weight="bold">{formatPrice(total)}</Text>
          {canceledAmount ? (
            <Text variant="caption" tone="muted">
              -{formatPrice(canceledAmount)} 취소
            </Text>
          ) : null}
        </View>
      </View>
      {actions.length ? (
        <View style={s.actions}>
          {actions.map((a) => (
            <Button
              key={a.label}
              size="sm"
              variant={a.variant ?? 'outline'}
              loading={a.loading}
              style={s.action}
              onPress={a.onPress}
            >
              {a.label}
            </Button>
          ))}
        </View>
      ) : null}
    </Card>
  );
}
