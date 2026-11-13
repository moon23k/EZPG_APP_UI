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
  top?: ReactNode;
  title: string;
  total?: number;
  current?: number;
  onBack?: () => void;
  backLabel?: string;
  primaryAction?: StepAction;
  floatingAction?: boolean;
  secondaryAction?: StepAction;
  actions?: ReactNode;
  notice?: TemplateNotice;
  bottomInset?: number;
  children?: ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  main: { flex: 1 },
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
    ...t.typography.screenTitle,
    color: t.colors.title,
  },
  footer: {
    gap: t.layout.itemGap,
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.layout.footerTop,
    backgroundColor: t.colors.background,
  },
  floating: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  pill: {
    borderRadius: t.controlSize.lg / 2,
    paddingHorizontal: t.space[10],
    boxShadow: t.shadow.md,
  },
}));

export function StepScreen({
  top,
  title,
  total,
  current = 0,
  onBack,
  backLabel = '이전',
  primaryAction,
  floatingAction = false,
  secondaryAction,
  actions,
  notice,
  bottomInset = 0,
  children,
}: StepScreenProps) {
  const t = useTheme();
  const s = useStyles();
  const step = total ? Math.min(total, Math.max(1, current + 1)) : 0;
  const footerBottom = t.layout.footerBottom + bottomInset;
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
      <View style={s.main}>
        <ScrollView
          contentContainerStyle={[
            s.body,
            floatingAction && {
              paddingBottom:
                footerBottom + t.layout.footerTop + t.controlSize.lg,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {top}
          <Text accessibilityRole="header" style={s.title}>
            {title}
          </Text>
          {children}
        </ScrollView>
        {notice ? <Notice notice={notice} /> : null}
        <View
          pointerEvents={floatingAction ? 'box-none' : 'auto'}
          style={[
            s.footer,
            floatingAction && s.floating,
            { paddingBottom: footerBottom },
          ]}
        >
          {actions}
          {primaryAction ? (
            <Button
              size="lg"
              onPress={primaryAction.onPress}
              disabled={primaryAction.disabled}
              loading={primaryAction.loading}
              style={floatingAction ? s.pill : undefined}
            >
              {primaryAction.label}
            </Button>
          ) : null}
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
      </View>
    </KeyboardAvoidingView>
  );
}
