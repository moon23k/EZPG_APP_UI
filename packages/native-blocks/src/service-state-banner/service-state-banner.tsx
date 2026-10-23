import { Button, makeStyles, Text, useTheme } from '@ezpg/native-ui';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export type ServiceState = 'paymentFailed' | 'grace' | 'suspended' | 'closed';

export type ServiceStateBannerProps = {
  state: ServiceState;
  /** 유예 남은 일수 (grace) */
  daysLeft?: number;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
};

function title(state: ServiceState, daysLeft?: number) {
  switch (state) {
    case 'paymentFailed':
      return '구독 결제에 실패했어요';
    case 'grace':
      return `${daysLeft ?? 0}일 뒤 사이트가 멈춰요`;
    case 'suspended':
      return '사이트가 멈췄어요';
    case 'closed':
      return '해지된 사이트예요';
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
  return (
    <View
      accessibilityRole="alert"
      style={[s.root, { backgroundColor: bg }, style]}
    >
      <Text weight="bold" style={{ color: fg }}>
        {title(state, daysLeft)}
      </Text>
      {onAction ? (
        <Button size="sm" variant="outline" onPress={onAction} style={s.start}>
          {actionLabel ??
            (state === 'closed' ? '다시 시작하기' : '결제 수단 확인')}
        </Button>
      ) : null}
    </View>
  );
}
