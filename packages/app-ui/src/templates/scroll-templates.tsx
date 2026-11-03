import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { Photo } from '../components/photo/photo';
import { Text } from '../components/text/text';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import {
  BottomBar,
  Notice,
  type TemplateAction,
  type TemplateNotice,
} from './parts';

type ScrollTemplateProps = {
  top?: ReactNode;
  heading?: { title: string; caption?: string; image?: string | null };
  notice?: TemplateNotice;
  primaryAction?: TemplateAction;
  secondaryAction?: TemplateAction;
  refreshing?: boolean;
  onRefresh?: () => void;
  bottomInset?: number;
  children: ReactNode;
};

const MEDIA = 64;

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  content: { flexGrow: 1, paddingBottom: t.layout.sectionGap },
  top: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.layout.itemGap,
    paddingTop: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  notice: { paddingTop: t.layout.groupGap },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    paddingTop: t.space[4],
    paddingBottom: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  headingText: { flex: 1, gap: t.space[1] },
  media: { width: MEDIA },
}));

function ScrollTemplate({
  top,
  heading,
  notice,
  primaryAction,
  secondaryAction,
  refreshing = false,
  onRefresh,
  bottomInset = 0,
  children,
}: ScrollTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <KeyboardAvoidingView behavior="padding" style={s.root}>
      <ScrollView
        contentContainerStyle={[
          s.content,
          primaryAction
            ? null
            : { paddingBottom: t.layout.sectionGap + bottomInset },
        ]}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        {heading ? (
          <View style={s.heading}>
            {heading.image !== undefined ? (
              <Photo
                source={{ uri: heading.image ?? '' }}
                radius={t.radius.md}
                style={s.media}
              />
            ) : null}
            <View style={s.headingText}>
              <Text variant="screenTitle" accessibilityRole="header">
                {heading.title}
              </Text>
              {heading.caption ? (
                <Text variant="label" tone="muted">
                  {heading.caption}
                </Text>
              ) : null}
            </View>
          </View>
        ) : null}
        {top ? <View style={s.top}>{top}</View> : null}
        {notice ? (
          <View style={s.notice}>
            <Notice notice={notice} />
          </View>
        ) : null}
        {children}
      </ScrollView>
      {primaryAction ? (
        <BottomBar
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          bottomInset={bottomInset}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
}

export type DetailTemplateProps = {
  status?: ReactNode;
  title?: string;
  caption?: string;
  image?: string | null;
  notice?: TemplateNotice;
  primaryAction?: TemplateAction;
  secondaryAction?: TemplateAction;
  bottomInset?: number;
  children: ReactNode;
};

export function DetailTemplate({
  status,
  title,
  caption,
  image,
  ...rest
}: DetailTemplateProps) {
  return (
    <ScrollTemplate
      top={status}
      heading={title ? { title, caption, image } : undefined}
      {...rest}
    />
  );
}

export type FormTemplateProps = {
  notice?: TemplateNotice;
  saveAction: TemplateAction;
  bottomInset?: number;
  children: ReactNode;
};

export function FormTemplate({ saveAction, ...rest }: FormTemplateProps) {
  return <ScrollTemplate primaryAction={saveAction} {...rest} />;
}

export type MenuTemplateProps = {
  bottomInset?: number;
  children: ReactNode;
};

export function MenuTemplate(props: MenuTemplateProps) {
  return <ScrollTemplate {...props} />;
}

export type DashboardTemplateProps = {
  banner?: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  bottomInset?: number;
  children: ReactNode;
};

export function DashboardTemplate({
  banner,
  children,
  ...rest
}: DashboardTemplateProps) {
  return (
    <ScrollTemplate {...rest}>
      {banner}
      {children}
    </ScrollTemplate>
  );
}
