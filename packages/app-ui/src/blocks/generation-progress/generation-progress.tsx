import {
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Button } from '../../components/button/button';
import { Text } from '../../components/text/text';
import { AlertGlyph, CheckGlyph } from '../../internal/glyphs';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Card } from '../internal/card';

export type GenerationStatus = 'queued' | 'running' | 'done' | 'failed';

export type GenerationStep = { key: string; label: string };

export type GenerationProgressProps = {
  steps: readonly GenerationStep[];
  current: string | null;
  status: GenerationStatus;
  errorText?: string;
  onRetry?: () => void;
  creditNote?: string;
  style?: StyleProp<ViewStyle>;
};

type StepState = 'done' | 'active' | 'waiting' | 'pending' | 'failed';

const HEADLINE: Record<GenerationStatus, string> = {
  queued: '접수했어요. 곧 시작해요',
  running: '만들고 있어요',
  done: '다 만들었어요',
  failed: '만들지 못했어요',
};

const STATE_LABEL: Record<StepState, string> = {
  done: '완료',
  active: '진행 중',
  waiting: '대기 중',
  pending: '대기',
  failed: '실패',
};

const DOT = 24;

const useStyles = makeStyles((t) => ({
  list: { gap: t.space[3] },
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[3] },
  label: { flex: 1 },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneDot: { backgroundColor: t.colors.primary },
  pendingDot: { borderWidth: 2, borderColor: t.colors.input },
  waitingDot: { borderWidth: 2, borderColor: t.colors.primary },
  start: { alignSelf: 'flex-start' },
}));

function stepState(
  index: number,
  currentIndex: number,
  status: GenerationStatus
): StepState {
  if (status === 'done') return 'done';
  if (currentIndex < 0) return 'pending';
  if (index < currentIndex) return 'done';
  if (index > currentIndex) return 'pending';
  if (status === 'failed') return 'failed';
  return status === 'running' ? 'active' : 'waiting';
}

export function GenerationProgress({
  steps,
  current,
  status,
  errorText,
  onRetry,
  creditNote,
  style,
}: GenerationProgressProps) {
  const t = useTheme();
  const s = useStyles();
  const currentIndex =
    current === null ? -1 : steps.findIndex((step) => step.key === current);
  const indicator = (state: StepState) => {
    switch (state) {
      case 'done':
        return (
          <View style={[s.dot, s.doneDot]}>
            <CheckGlyph color={t.colors.primaryForeground} size={14} />
          </View>
        );
      case 'active':
        return (
          <View style={s.dot}>
            <ActivityIndicator size="small" color={t.colors.primary} />
          </View>
        );
      case 'failed':
        return (
          <View style={s.dot}>
            <AlertGlyph
              filled
              color={t.colors.danger}
              onColor={t.colors.dangerForeground}
              size={DOT}
            />
          </View>
        );
      case 'waiting':
        return <View style={[s.dot, s.waitingDot]} />;
      default:
        return <View style={[s.dot, s.pendingDot]} />;
    }
  };
  return (
    <Card style={style}>
      <Text
        variant="bodyLg"
        weight="bold"
        accessibilityRole="header"
        accessibilityLiveRegion="polite"
      >
        {HEADLINE[status]}
      </Text>
      <View style={s.list}>
        {steps.map((step, i) => {
          const state = stepState(i, currentIndex, status);
          return (
            <View
              key={step.key}
              accessible
              accessibilityLabel={`${step.label}, ${STATE_LABEL[state]}`}
              style={s.row}
            >
              {indicator(state)}
              <Text
                style={s.label}
                tone={
                  state === 'failed'
                    ? 'danger'
                    : state === 'pending'
                      ? 'muted'
                      : 'default'
                }
                weight={
                  state === 'active' || state === 'failed'
                    ? 'semibold'
                    : undefined
                }
              >
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
      {status === 'failed' && errorText ? (
        <Text tone="danger" accessibilityLiveRegion="polite">
          {errorText}
        </Text>
      ) : null}
      {status === 'failed' && onRetry ? (
        <Button variant="outline" onPress={onRetry} style={s.start}>
          다시 시도
        </Button>
      ) : null}
      {creditNote ? (
        <Text variant="caption" tone="muted">
          {creditNote}
        </Text>
      ) : null}
    </Card>
  );
}
