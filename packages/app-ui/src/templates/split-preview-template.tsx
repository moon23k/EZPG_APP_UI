import type { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { makeStyles } from '../utils/styles';
import { BottomBar, type TemplateAction } from './parts';

export type SplitPreviewTemplateProps = {
  preview: ReactNode;
  saveAction?: TemplateAction;
  bottomInset?: number;
  children: ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  stage: {
    height: '30%',
    marginTop: t.layout.itemGap,
    marginHorizontal: t.layout.groupGap,
    overflow: 'hidden',
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.surface,
  },
  panel: { flex: 1 },
  content: {
    paddingTop: t.layout.groupGap,
    paddingBottom: t.layout.groupGap,
  },
}));

export function SplitPreviewTemplate({
  preview,
  saveAction,
  bottomInset = 0,
  children,
}: SplitPreviewTemplateProps) {
  const s = useStyles();
  return (
    <KeyboardAvoidingView behavior="padding" style={s.root}>
      <View style={s.stage}>{preview}</View>
      <ScrollView
        style={s.panel}
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
      {saveAction ? (
        <BottomBar primaryAction={saveAction} bottomInset={bottomInset} />
      ) : null}
    </KeyboardAvoidingView>
  );
}
