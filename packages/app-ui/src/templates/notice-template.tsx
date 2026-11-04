import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '../components/button/button';
import { Checkbox } from '../components/checkbox/checkbox';
import { Text } from '../components/text/text';
import { CloseGlyph } from '../internal/glyphs';
import { PressableBase } from '../internal/pressable-base';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import type { TemplateAction } from './parts';

export type NoticeConsent = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export type NoticeTemplateProps = {
  title: string;
  description?: string;
  onClose?: () => void;
  closeLabel?: string;
  center?: boolean;
  bleed?: boolean;
  consent?: NoticeConsent;
  primaryAction?: TemplateAction;
  secondaryAction?: TemplateAction;
  topInset?: number;
  bottomInset?: number;
  children?: ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  header: {
    height: t.headerHeight,
    justifyContent: 'center',
    paddingHorizontal: t.space[1],
  },
  close: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flexGrow: 1,
    paddingTop: t.space[2],
    paddingBottom: t.space[6],
    gap: t.space[6],
  },
  center: { justifyContent: 'center', alignItems: 'center' },
  centerText: { textAlign: 'center' },
  head: { gap: t.space[2] },
  pad: { paddingHorizontal: t.layout.screenX },
  footer: {
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.space[3],
    gap: t.space[3],
  },
  buttons: { flexDirection: 'row', gap: t.space[2] },
  button: { flex: 1 },
}));

export function NoticeTemplate({
  title,
  description,
  onClose,
  closeLabel = '닫기',
  center = false,
  bleed = false,
  consent,
  primaryAction,
  secondaryAction,
  topInset = 0,
  bottomInset = 0,
  children,
}: NoticeTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, { paddingTop: topInset }]}>
      <View style={s.header}>
        {onClose ? (
          <PressableBase
            style={s.close}
            accessibilityRole="button"
            accessibilityLabel={closeLabel}
            onPress={onClose}
          >
            <CloseGlyph size={t.iconSize.md} color={t.colors.foreground} />
          </PressableBase>
        ) : null}
      </View>
      <ScrollView contentContainerStyle={[s.body, center && s.center]}>
        <View style={[s.head, s.pad]}>
          <Text
            variant="screenTitle"
            accessibilityRole="header"
            style={center ? s.centerText : undefined}
          >
            {title}
          </Text>
          {description ? <Text variant="bodyLg">{description}</Text> : null}
        </View>
        {children ? (
          <View style={bleed ? undefined : s.pad}>{children}</View>
        ) : null}
      </ScrollView>
      {primaryAction ? (
        <View
          style={[
            s.footer,
            { paddingBottom: t.layout.footerBottom + bottomInset },
          ]}
        >
          {consent ? (
            <Checkbox
              label={consent.label}
              value={consent.value}
              onValueChange={consent.onValueChange}
            />
          ) : null}
          <View style={s.buttons}>
            {secondaryAction ? (
              <Button
                size="lg"
                variant="secondary"
                style={s.button}
                onPress={secondaryAction.onPress}
                disabled={secondaryAction.disabled}
              >
                {secondaryAction.label}
              </Button>
            ) : null}
            <Button
              size="lg"
              style={s.button}
              onPress={primaryAction.onPress}
              disabled={primaryAction.disabled}
              loading={primaryAction.loading}
            >
              {primaryAction.label}
            </Button>
          </View>
        </View>
      ) : null}
    </View>
  );
}
