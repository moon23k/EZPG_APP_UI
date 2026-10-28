import type { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Button } from '../../components/button/button';
import { Text } from '../../components/text/text';
import { ChevronGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Notice, type TemplateNotice } from '../../templates/parts';

export type StepAction = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export type StepScreenProps = {
  title: string;
  total?: number;
  current?: number;
  onBack?: () => void;
  backLabel?: string;
  primaryAction: StepAction;
  secondaryAction?: StepAction;
  notice?: TemplateNotice;
  bottomInset?: number;
  children?: ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  header: {
    height: t.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: t.space[1],
  },
  back: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { transform: [{ scaleX: -1 }] },
  track: { height: 3, backgroundColor: t.colors.muted },
  fill: { height: 3, backgroundColor: t.colors.primary },
  body: {
    gap: t.layout.titleGap,
    paddingTop: t.layout.screenTop,
    paddingHorizontal: t.layout.screenX,
    paddingBottom: t.layout.footerBottom,
  },
  title: {
    fontSize: t.typography.screenTitle.fontSize,
    lineHeight: t.typography.screenTitle.lineHeight,
  },
  footer: {
    gap: t.layout.itemGap,
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.layout.footerTop,
    backgroundColor: t.colors.background,
  },
}));

export function StepScreen({
  title,
  total,
  current = 0,
  onBack,
  backLabel = '이전',
  primaryAction,
  secondaryAction,
  notice,
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
      {notice ? <Notice notice={notice} /> : null}
      <View
        style={[
          s.footer,
          { paddingBottom: t.layout.footerBottom + bottomInset },
        ]}
      >
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
