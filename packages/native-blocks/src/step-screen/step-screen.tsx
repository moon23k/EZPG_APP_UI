import {
  Button,
  makeStyles,
  PressableBase,
  Text,
  WizardSteps,
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
  description?: string;
  /** 넘기면 상단에 진행 표시 */
  steps?: readonly string[];
  current?: number;
  /** 넘기면 상단에 이전 버튼 */
  onBack?: () => void;
  /** 기본 '이전' */
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
    gap: t.space[3],
    paddingHorizontal: t.space[4],
    paddingTop: t.space[3],
  },
  back: { alignSelf: 'flex-start' },
  body: { padding: t.space[4], gap: t.space[4] },
  heading: { gap: t.space[2] },
  footer: {
    gap: t.space[2],
    paddingHorizontal: t.space[4],
    paddingTop: t.space[3],
    borderTopWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
}));

/** 온보딩 한 단계의 화면 틀: 진행 표시 · 제목 · 내용 · 하단 버튼 */
export function StepScreen({
  title,
  description,
  steps,
  current = 0,
  onBack,
  backLabel = '이전',
  primaryAction,
  secondaryAction,
  bottomInset = 0,
  children,
}: StepScreenProps) {
  const s = useStyles();
  return (
    <KeyboardAvoidingView behavior="padding" style={s.root}>
      {onBack || steps ? (
        <View style={s.header}>
          {onBack ? (
            <PressableBase
              onPress={onBack}
              accessibilityLabel={backLabel}
              touchHeight={24}
              style={s.back}
            >
              <Text tone="muted">‹ {backLabel}</Text>
            </PressableBase>
          ) : null}
          {steps ? <WizardSteps steps={steps} current={current} /> : null}
        </View>
      ) : null}
      <ScrollView
        contentContainerStyle={s.body}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.heading}>
          <Text variant="title" accessibilityRole="header">
            {title}
          </Text>
          {description ? <Text tone="muted">{description}</Text> : null}
        </View>
        {children}
      </ScrollView>
      <View style={[s.footer, { paddingBottom: 12 + bottomInset }]}>
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
