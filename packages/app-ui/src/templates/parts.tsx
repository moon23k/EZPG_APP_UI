import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Button } from '../components/button/button';
import { Text } from '../components/text/text';
import { AlertGlyph } from '../internal/glyphs';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';

export type TemplateAction = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export type NoticeReason = 'error' | 'money' | 'irreversible' | 'legal';

export type TemplateNotice = { reason: NoticeReason; text: string };

const useStyles = makeStyles((t) => ({
  bar: {
    gap: t.layout.itemGap,
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.layout.footerTop,
    backgroundColor: t.colors.background,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: t.space[2],
    marginHorizontal: t.layout.screenX,
    paddingVertical: t.space[3],
    paddingHorizontal: t.space[4],
    borderRadius: t.radius.md,
    backgroundColor: t.colors.muted,
  },
  noticeText: { flex: 1 },
  section: { paddingBottom: t.space[2] },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: t.space[4],
    paddingBottom: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  inset: { paddingHorizontal: t.layout.screenX },
}));

export function BottomBar({
  primaryAction,
  secondaryAction,
  bottomInset = 0,
}: {
  primaryAction: TemplateAction;
  secondaryAction?: TemplateAction;
  bottomInset?: number;
}) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View
      style={[s.bar, { paddingBottom: t.layout.footerBottom + bottomInset }]}
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
  );
}

export function Notice({ notice }: { notice: TemplateNotice }) {
  const t = useTheme();
  const s = useStyles();
  const danger = notice.reason === 'error';
  return (
    <View accessibilityRole={danger ? 'alert' : undefined} style={s.notice}>
      <AlertGlyph
        color={danger ? t.colors.danger : t.colors.mutedForeground}
        size={t.iconSize.md}
      />
      <Text
        variant="label"
        tone={danger ? 'danger' : 'default'}
        style={s.noticeText}
      >
        {notice.text}
      </Text>
    </View>
  );
}

export function ListSection({
  title,
  action,
  inset,
  children,
}: {
  title?: string;
  action?: ReactNode;
  inset?: boolean;
  children: ReactNode;
}) {
  const s = useStyles();
  return (
    <View style={s.section}>
      {title ? (
        <View style={s.sectionHead}>
          <Text
            variant="label"
            tone="muted"
            weight="semibold"
            accessibilityRole="header"
          >
            {title}
          </Text>
          {action}
        </View>
      ) : null}
      {inset ? <View style={s.inset}>{children}</View> : children}
    </View>
  );
}
