import { Button, formatPrice, makeStyles, Text } from '@ezpg/native-ui';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Card } from '../internal/card';
import { formatDeadline } from '../internal/format';

export type ClaimType = 'cancel' | 'return' | 'exchange';
export type ClaimStatus = 'requested' | 'collecting' | 'completed' | 'rejected';

export type ClaimRowProps = {
  type: ClaimType;
  /** 기본 'requested' */
  status?: ClaimStatus;
  /** 요청 금액 */
  amount: number;
  /** 예) '상품 파손' */
  reason: string;
  /** 처리 기한까지 남은 영업일. 임박했을 때만 표시한다 */
  dueInDays?: number;
  /** 요청 상태일 때 [거부] [승인] 버튼 */
  onReject?: () => void;
  onApprove?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const TYPE: Record<ClaimType, string> = {
  cancel: '취소',
  return: '반품',
  exchange: '교환',
};
const STATUS: Record<ClaimStatus, string> = {
  requested: '요청',
  collecting: '회수 중',
  completed: '완료',
  rejected: '거부',
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  grow: { flex: 1 },
  head: { fontSize: 16, lineHeight: 24, fontVariant: ['tabular-nums'] },
  deadline: { fontSize: 14, lineHeight: 20 },
  action: { flex: 1 },
}));

/** 취소 · 반품 · 교환 요청 한 건 */
export function ClaimRow({
  type,
  status = 'requested',
  amount,
  reason,
  dueInDays,
  onReject,
  onApprove,
  onPress,
  style,
}: ClaimRowProps) {
  const s = useStyles();
  const title = `${TYPE[type]} ${STATUS[status]}`;
  const open = status === 'requested' || status === 'collecting';
  const deadline =
    open && dueInDays !== undefined ? formatDeadline(dueInDays) : null;
  const actionable = status === 'requested' && (onReject || onApprove);
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${title}, ${formatPrice(amount)}, ${reason}${deadline ? `, ${deadline}` : ''}`}
      style={style}
    >
      <View style={s.row}>
        <Text weight="bold" style={[s.head, s.grow]} numberOfLines={1}>
          {title}
        </Text>
        <Text weight="bold" style={s.head}>
          {formatPrice(amount)}
        </Text>
      </View>
      <View style={s.row}>
        <Text style={s.grow} numberOfLines={1}>
          {reason}
        </Text>
        {deadline ? (
          <Text weight="bold" tone="destructive" style={s.deadline}>
            {deadline}
          </Text>
        ) : null}
      </View>
      {actionable ? (
        <View style={s.row}>
          {onReject ? (
            <Button
              size="sm"
              variant="outline"
              style={s.action}
              onPress={onReject}
            >
              거부
            </Button>
          ) : null}
          {onApprove ? (
            <Button size="sm" style={s.action} onPress={onApprove}>
              승인
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
