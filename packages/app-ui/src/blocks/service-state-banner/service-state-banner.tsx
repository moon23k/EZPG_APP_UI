import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { Text } from '../../components/text/text';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ServiceState =
  'paymentFailed' | 'grace' | 'suspended' | 'closed' | 'stopped';

export type ServiceStateBannerProps = {
  state: ServiceState;
  daysLeft?: number;
  reason?: string;
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
    case 'stopped':
      return '운영 정책에 따라 판매가 중지됐어요';
  }
}

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2], padding: t.space[4], borderRadius: t.radius.md },
  start: { alignSelf: 'flex-start' },
}));

export function ServiceStateBanner({
  state,
  daysLeft,
  reason,
  actionLabel,
  onAction,
  style,
}: ServiceStateBannerProps) {
  const t = useTheme();
  const s = useStyles();
  const severe =
    state === 'suspended' || state === 'closed' || state === 'stopped';
  const [bg, fg] = severe
    ? [t.colors.danger, t.colors.dangerForeground]
    : [t.colors.warning, t.colors.warningForeground];
  return (
    <View
      accessibilityRole="alert"
      style={[s.root, { backgroundColor: bg }, style]}
    >
      <Text weight="bold" style={{ color: fg }}>
        {title(state, daysLeft)}
      </Text>
      {state === 'stopped' && reason ? (
        <Text style={{ color: fg }}>사유: {reason}</Text>
      ) : null}
      {onAction ? (
        <Button size="sm" variant="outline" onPress={onAction} style={s.start}>
          {actionLabel ??
            (state === 'closed'
              ? '다시 시작하기'
              : state === 'stopped'
                ? '문의하기'
                : '결제 수단 확인')}
        </Button>
      ) : null}
    </View>
  );
}
