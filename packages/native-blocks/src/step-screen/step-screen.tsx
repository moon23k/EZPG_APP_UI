import {
  Button,
  ChevronGlyph,
  makeStyles,
  PressableBase,
  Text,
  useTheme,
} from '@ezpg/native-ui';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';

export type StepAction = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export type StepScreenProps = {
  title: string;
  /** 넘기면 상단에 진행 막대 */
  total?: number;
  /** 0부터 */
  current?: number;
  /** 넘기면 상단에 이전 버튼 */
  onBack?: () => void;
  /** 이전 버튼의 접근성 라벨. 기본 '이전' */
  backLabel?: string;
  primaryAction: StepAction;
  secondaryAction?: StepAction;
  /** 하단 안전 영역 높이 */
  bottomInset?: number;
  children?: ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: t.space[1],
  },
  back: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { transform: [{ scaleX: -1 }] },
  track: { height: 3, backgroundColor: t.colors.muted },
  fill: { height: 3, backgroundColor: t.colors.primary },
  body: {
    gap: t.space[5],
    paddingTop: t.space[6],
    paddingHorizontal: t.space[5],
    paddingBottom: t.space[4],
  },
  title: { fontSize: 24, lineHeight: 32 },
  footer: {
    gap: t.space[2],
    paddingHorizontal: t.space[5],
    paddingTop: t.space[3],
    backgroundColor: t.colors.background,
  },
}));

/** 온보딩 한 단계의 화면 틀: 이전 · 진행 막대 · 제목 · 내용 · 하단 버튼 */
export function StepScreen({
  title,
  total,
  current = 0,
  onBack,
  backLabel = '이전',
  primaryAction,
  secondaryAction,
  bottomInset = 0,
  children,
}: StepScreenProps) {
  const t = useTheme();
  const s = useStyles();
  const step = total ? Math.min(total, Math.max(1, current + 1)) : 0;
  return (
    <KeyboardAvoidingView behavior="padding" style={s.root}>
      {onBack ? (
        <View style={s.header}>
          <PressableBase
            onPress={onBack}
            accessibilityLabel={backLabel}
            style={s.back}
          >
            <View style={s.backIcon}>
              <ChevronGlyph color={t.colors.foreground} size={24} />
            </View>
          </PressableBase>
        </View>
      ) : null}
      {total ? (
        <View
          accessibilityRole="progressbar"
          accessibilityLabel={`${total}단계 중 ${step}단계`}
          accessibilityValue={{ min: 1, max: total, now: step }}
          style={s.track}
        >
          <View style={[s.fill, { width: `${(step / total) * 100}%` }]} />
        </View>
      ) : null}
      <ScrollView
        contentContainerStyle={s.body}
        keyboardShouldPersistTaps="handled"
      >
        <Text weight="bold" accessibilityRole="header" style={s.title}>
          {title}
        </Text>
        {children}
      </ScrollView>
      <View style={[s.footer, { paddingBottom: t.space[4] + bottomInset }]}>
        <Button
          size="lg"
          onPress={primaryAction.onPress}
          disabled={primaryAction.disabled}
          loading={primaryAction.loading}
        >
          {primaryAction.label}
        </Button>
        {secondaryAction ? (
          <Button
            variant="ghost"
            onPress={secondaryAction.onPress}
            disabled={secondaryAction.disabled}
            loading={secondaryAction.loading}
          >
            {secondaryAction.label}
          </Button>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}
