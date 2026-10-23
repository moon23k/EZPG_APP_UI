import { Button, makeStyles, Text, useTheme } from '@ezpg/native-ui';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export type ServiceState = 'paymentFailed' | 'grace' | 'suspended' | 'closed';

export type ServiceStateBannerProps = {
  state: ServiceState;
  /** 유예 남은 일수 (grace) */
  daysLeft?: number;
  /** 다음 결제 재시도일. 예) '10월 26일' */
  nextRetry?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
};

function message(state: ServiceState, daysLeft?: number, nextRetry?: string) {
  switch (state) {
    case 'paymentFailed':
      return {
        title: '구독 결제에 실패했어요',
        body: nextRetry
          ? `${nextRetry}에 다시 결제를 시도해요. 카드를 확인해 주세요.`
          : '카드를 확인해 주세요.',
      };
    case 'grace':
      return {
        title: `${daysLeft ?? 0}일 뒤 사이트가 멈춰요`,
        body: '결제가 되지 않으면 손님이 사이트에 들어올 수 없어요.',
      };
    case 'suspended':
      return { title: '사이트가 멈췄어요', body: '결제하면 바로 다시 열려요.' };
    case 'closed':
      return {
        title: '해지된 사이트예요',
        body: '손님에게는 더 이상 보이지 않아요.',
      };
  }
}

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2], padding: t.space[4], borderRadius: t.radius.md },
  start: { alignSelf: 'flex-start' },
}));

/** 결제 실패 · 유예 · 정지 · 해지 상태 안내 */
export function ServiceStateBanner({
  state,
  daysLeft,
  nextRetry,
  actionLabel,
  onAction,
  style,
}: ServiceStateBannerProps) {
  const t = useTheme();
  const s = useStyles();
  const severe = state === 'suspended' || state === 'closed';
  const [bg, fg] = severe
    ? [t.colors.destructive, t.colors.destructiveForeground]
    : [t.colors.warning, t.colors.warningForeground];
  const { title, body } = message(state, daysLeft, nextRetry);
  return (
    <View
      accessibilityRole="alert"
      style={[s.root, { backgroundColor: bg }, style]}
    >
      <Text weight="bold" style={{ color: fg }}>
        {title}
      </Text>
      <Text style={{ color: fg }}>{body}</Text>
      {onAction ? (
        <Button size="sm" variant="outline" onPress={onAction} style={s.start}>
          {actionLabel ??
            (state === 'closed' ? '다시 시작하기' : '결제 수단 확인')}
        </Button>
      ) : null}
    </View>
  );
}
