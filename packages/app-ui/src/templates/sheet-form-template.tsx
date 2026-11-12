import type { ComponentRef, ReactNode, Ref } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { Text } from '../components/text/text';
import { ChevronGlyph } from '../internal/glyphs';
import { PressableBase } from '../internal/pressable-base';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import { FlushRowContext } from '../internal/flush-row';
import { BottomBar, type TemplateAction } from './parts';

export type SheetFormTemplateProps = {
  title: string;
  onBack?: () => void;
  backLabel?: string;
  action?: { label: string; onPress: () => void; disabled?: boolean };
  tabs?: ReactNode;
  primaryAction: TemplateAction;
  secondaryAction?: TemplateAction;
  topInset?: number;
  bottomInset?: number;
  scrollRef?: Ref<ComponentRef<typeof ScrollView>>;
  onScrollY?: (y: number) => void;
  children: ReactNode;
};

export type SheetBlockProps = {
  title: string;
  aside?: ReactNode;
  lead?: ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
  children: ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  header: {
    height: t.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: t.space[1],
    backgroundColor: t.colors.surface,
  },
  side: {
    minWidth: t.minTouchSize * 2,
    height: t.minTouchSize,
    justifyContent: 'center',
  },
  end: { alignItems: 'flex-end', paddingHorizontal: t.space[3] },
  back: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scaleX: -1 }],
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: t.typography.title.fontSize,
    lineHeight: t.typography.title.lineHeight,
  },
  body: { padding: t.space[3], gap: t.space[3] },
  block: {
    padding: t.space[4],
    gap: t.space[3],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.surface,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: t.space[2],
  },
  lead: { flexDirection: 'row', alignItems: 'center', gap: t.space[1] },
  blockTitle: {
    fontSize: t.typography.title.fontSize,
    lineHeight: t.typography.title.lineHeight,
  },
}));

export function SheetBlock({
  title,
  aside,
  lead,
  onLayout,
  children,
}: SheetBlockProps) {
  const s = useStyles();
  return (
    <View onLayout={onLayout} style={s.block}>
      <View style={s.head}>
        <View style={s.lead}>
          {lead}
          <Text weight="bold" accessibilityRole="header" style={s.blockTitle}>
            {title}
          </Text>
        </View>
        {aside}
      </View>
      <FlushRowContext.Provider value>{children}</FlushRowContext.Provider>
    </View>
  );
}

export function SheetFormTemplate({
  title,
  onBack,
  backLabel = '뒤로',
  action,
  tabs,
  primaryAction,
  secondaryAction,
  topInset = 0,
  bottomInset = 0,
  scrollRef,
  onScrollY,
  children,
}: SheetFormTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <KeyboardAvoidingView behavior="padding" style={s.root}>
      <View style={{ paddingTop: topInset, backgroundColor: t.colors.surface }}>
        <View style={s.header}>
          <View style={s.side}>
            {onBack ? (
              <PressableBase
                accessibilityLabel={backLabel}
                onPress={onBack}
                style={s.back}
              >
                <ChevronGlyph color={t.colors.foreground} size={24} />
              </PressableBase>
            ) : null}
          </View>
          <Text
            weight="bold"
            numberOfLines={1}
            accessibilityRole="header"
            style={s.title}
          >
            {title}
          </Text>
          <View style={[s.side, s.end]}>
            {action ? (
              <PressableBase
                accessibilityRole="button"
                disabled={action.disabled}
                onPress={action.onPress}
              >
                <Text
                  weight="medium"
                  tone={action.disabled ? 'muted' : undefined}
                >
                  {action.label}
                </Text>
              </PressableBase>
            ) : null}
          </View>
        </View>
      </View>
      {tabs}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={s.body}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={32}
        onScroll={
          onScrollY
            ? (event) => onScrollY(event.nativeEvent.contentOffset.y)
            : undefined
        }
      >
        {children}
      </ScrollView>
      <BottomBar
        split
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        bottomInset={bottomInset}
      />
    </KeyboardAvoidingView>
  );
}
