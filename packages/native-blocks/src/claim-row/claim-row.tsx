import {
  ListRow,
  makeStyles,
  StatusBadge,
  Text,
  type StatusBadgeTone,
} from '@ezpg/native-ui';
import { View } from 'react-native';
import { formatDday } from '../internal/format';

export type ClaimType = 'cancel' | 'return' | 'exchange';
export type ClaimStatus = 'requested' | 'collecting' | 'completed' | 'rejected';

export type ClaimRowProps = {
  type: ClaimType;
  status: ClaimStatus;
  orderNo: string;
  reason: string;
  /** 처리 기한까지 남은 영업일 */
  dueInDays?: number;
  /** 회수 송장 */
  returnTracking?: { carrier: string; number: string };
  onPress?: () => void;
};

const TYPE: Record<ClaimType, string> = {
  cancel: '취소',
  return: '반품',
  exchange: '교환',
};
const STATUS: Record<ClaimStatus, { label: string; tone: StatusBadgeTone }> = {
  requested: { label: '요청', tone: 'warning' },
  collecting: { label: '회수 중', tone: 'info' },
  completed: { label: '완료', tone: 'success' },
  rejected: { label: '거절', tone: 'neutral' },
};

const useStyles = makeStyles((t) => ({
  trailing: { alignItems: 'flex-end', gap: t.space[1] },
}));

/** 취소 · 반품 · 교환 요청 한 건 */
export function ClaimRow({
  type,
  status,
  orderNo,
  reason,
  dueInDays,
  returnTracking,
  onPress,
}: ClaimRowProps) {
  const s = useStyles();
  const st = STATUS[status];
  const parts = [orderNo, reason];
  if (returnTracking)
    parts.push(`${returnTracking.carrier} ${returnTracking.number}`);
  return (
    <ListRow
      title={`${TYPE[type]} ${st.label}`}
      description={parts.join(' · ')}
      onPress={onPress}
      trailing={
        <View style={s.trailing}>
          <StatusBadge tone={st.tone}>{TYPE[type]}</StatusBadge>
          {dueInDays !== undefined &&
          status !== 'completed' &&
          status !== 'rejected' ? (
            <Text
              variant="caption"
              tone={dueInDays <= 1 ? 'destructive' : 'muted'}
            >
              {formatDday(dueInDays)}
            </Text>
          ) : null}
        </View>
      }
    />
  );
}
