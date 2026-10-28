import { deadlineTone } from '../internal/format';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { formatPrice } from '../../components/price/price';
import { Text } from '../../components/text/text';
import { makeStyles } from '../../utils/styles';
import { Card } from '../internal/card';

export type ClaimType = 'cancel' | 'return' | 'exchange';
export type ClaimStatus =
  | 'requested'
  | 'collecting'
  | 'collected'
  | 'held'
  | 'completed'
  | 'rejected'
  | 'withdrawn';

export type ClaimRowProps = {
  type: ClaimType;
  status?: ClaimStatus;
  amount: number;
  reason?: string;
  dueAt?: Date | string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const TYPE: Record<ClaimType, string> = {
  cancel: '취소',
  return: '반품',
  exchange: '교환',
};

export const claimStatusLabel: Record<ClaimStatus, string> = {
  requested: '요청',
  collecting: '회수 중',
  collected: '회수 완료',
  held: '보류',
  completed: '완료',
  rejected: '거절',
  withdrawn: '철회',
};

const OPEN: readonly ClaimStatus[] = [
  'requested',
  'collecting',
  'collected',
  'held',
];

const DAY = 86400000;

function toDate(value: Date | string): Date {
  if (typeof value !== 'string') return value;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m
    ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
    : new Date(value);
}

function daysUntil(value: Date | string, now = new Date()): number | null {
  const due = toDate(value);
  if (Number.isNaN(due.getTime())) return null;
  const a = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const b = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  return Math.round((b.getTime() - a.getTime()) / DAY);
}

function formatDday(days: number): string {
  if (days < 0) return '기한 지남';
  return days === 0 ? 'D-day' : `D-${days}`;
}

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  grow: { flex: 1 },
  head: {
    fontSize: t.typography.bodyLg.fontSize,
    lineHeight: t.typography.bodyLg.lineHeight,
    fontVariant: ['tabular-nums'],
  },
  deadline: {
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    fontVariant: ['tabular-nums'],
  },
}));

export function ClaimRow({
  type,
  status = 'requested',
  amount,
  reason,
  dueAt,
  onPress,
  style,
}: ClaimRowProps) {
  const s = useStyles();
  const title = `${TYPE[type]} ${claimStatusLabel[status]}`;
  const days =
    OPEN.includes(status) && dueAt !== undefined ? daysUntil(dueAt) : null;
  const deadline = days === null ? null : formatDday(days);
  const label = [title, formatPrice(amount), reason, deadline]
    .filter(Boolean)
    .join(', ');
  return (
    <Card onPress={onPress} accessibilityLabel={label} style={style}>
      <View style={s.row}>
        <Text weight="bold" style={[s.head, s.grow]} numberOfLines={1}>
          {title}
        </Text>
        <Text weight="bold" style={s.head}>
          {formatPrice(amount)}
        </Text>
      </View>
      {reason || deadline ? (
        <View style={s.row}>
          <Text style={s.grow} numberOfLines={1}>
            {reason ?? ''}
          </Text>
          {deadline ? (
            <Text
              weight="bold"
              tone={days === null ? 'muted' : deadlineTone(days)}
              style={s.deadline}
            >
              {deadline}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
