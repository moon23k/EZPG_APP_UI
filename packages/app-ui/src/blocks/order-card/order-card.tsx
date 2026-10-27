import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button, type ButtonVariant } from '../../components/button/button';
import { formatPrice } from '../../components/price/price';
import { Text } from '../../components/text/text';
import { ChevronGlyph } from '../../internal/glyphs';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Card } from '../internal/card';
import { formatDeadline } from '../internal/format';

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'canceled';

export const orderStatusLabel: Record<OrderStatus, string> = {
  pending_payment: '결제 대기',
  paid: '신규',
  preparing: '배송 준비',
  shipped: '배송 중',
  delivered: '배송 완료',
  completed: '구매 확정',
  canceled: '취소',
};

export type OrderItem = { name: string; option?: string; quantity: number };

export type OrderAction = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
};

export type OrderCardProps = {
  items: readonly OrderItem[];
  total: number;
  dueInDays?: number;
  actions?: readonly OrderAction[];
  onPress?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  grow: { flex: 1 },
  title: { fontSize: 16, lineHeight: 24 },
  amount: { fontVariant: ['tabular-nums'] },
  deadline: { fontSize: 14, lineHeight: 20 },
  action: { flex: 1 },
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    minHeight: Math.max(t.minTouchSize, 56),
    paddingVertical: t.space[2],
  },
  section: { gap: t.space[3] },
}));

export function summarizeItems(items: readonly OrderItem[]): string {
  const [first, ...rest] = items;
  if (!first) return '';
  const name = first.option ? `${first.name} (${first.option})` : first.name;
  if (rest.length) return `${name} 외 ${rest.length}건`;
  return first.quantity > 1 ? `${name} × ${first.quantity}` : name;
}

export function OrderCard({
  items,
  total,
  dueInDays,
  actions = [],
  onPress,
  onLongPress,
  selected,
  style,
}: OrderCardProps) {
  const t = useTheme();
  const s = useStyles();
  const summary = summarizeItems(items);
  const deadline = dueInDays !== undefined ? formatDeadline(dueInDays) : null;
  const label = `${summary}, ${formatPrice(total)}${deadline ? `, ${deadline}` : ''}`;

  if (!actions.length && !deadline) {
    return (
      <Card
        onPress={onPress}
        onLongPress={onLongPress}
        selected={selected}
        accessibilityLabel={label}
        style={[s.compact, style]}
      >
        <Text style={s.grow} numberOfLines={1}>
          {summary}
        </Text>
        <Text weight="bold" style={s.amount}>
          {formatPrice(total)}
        </Text>
        {onPress ? (
          <ChevronGlyph color={t.colors.mutedForeground} size={t.iconSize.sm} />
        ) : null}
      </Card>
    );
  }

  return (
    <Card
      onPress={onPress}
      onLongPress={onLongPress}
      selected={selected}
      accessibilityLabel={label}
      style={style}
    >
      <View style={s.row}>
        <Text weight="semibold" style={[s.title, s.grow]} numberOfLines={1}>
          {summary}
        </Text>
        <Text variant="bodyLg" weight="bold" style={s.amount}>
          {formatPrice(total)}
        </Text>
      </View>
      {deadline ? (
        <Text weight="bold" tone="destructive" style={s.deadline}>
          {deadline}
        </Text>
      ) : null}
      {actions.length ? (
        <View style={s.row}>
          {actions.map((a) => (
            <Button
              key={a.label}
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

export type OrderSectionProps = {
  title: string;
  count?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function OrderSection({
  title,
  count,
  children,
  style,
}: OrderSectionProps) {
  const s = useStyles();
  return (
    <View style={[s.section, style]}>
      <Text weight="bold" accessibilityRole="header">
        {count === undefined ? title : `${title} ${count}`}
      </Text>
      {children}
    </View>
  );
}
