import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '../components/button/button';
import { Text } from '../components/text/text';
import { CloseGlyph } from '../internal/glyphs';
import { PressableBase } from '../internal/pressable-base';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';

export type EditorTool = {
  key: string;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export type EditorSheet = {
  title: string;
  onClose: () => void;
  headerAction?: ReactNode;
  children: ReactNode;
};

export type EditorTemplateProps = {
  preview: ReactNode;
  tools: readonly EditorTool[];
  sheet?: EditorSheet | null;
  closeLabel?: string;
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.muted },
  canvas: {
    flex: 1,
    paddingTop: t.layout.groupGap,
    paddingHorizontal: t.layout.screenX,
  },
  preview: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: t.radius.lg,
    borderTopRightRadius: t.radius.lg,
    backgroundColor: t.colors.background,
  },
  tools: {
    flexDirection: 'row',
    gap: t.layout.itemGap,
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.layout.footerTop,
    borderTopWidth: 1,
    borderTopColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  tool: { flex: 1 },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: '60%',
    borderTopLeftRadius: t.radius.lg,
    borderTopRightRadius: t.radius.lg,
    borderTopWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  grab: {
    alignSelf: 'center',
    width: t.space[8],
    height: t.space[1],
    marginTop: t.space[2],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.input,
  },
  sheetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    paddingLeft: t.layout.screenX,
    paddingRight: t.space[1],
    minHeight: t.controlSize.md,
  },
  sheetTitle: { flex: 1 },
  close: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBody: {
    gap: t.space[4],
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.space[2],
  },
}));

export function EditorTemplate({
  preview,
  tools,
  sheet,
  closeLabel = '닫기',
  bottomInset = 0,
}: EditorTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      <View style={s.canvas}>
        <View style={s.preview}>{preview}</View>
      </View>
      <View
        style={[
          s.tools,
          { paddingBottom: t.layout.footerBottom + bottomInset },
        ]}
      >
        {tools.map((tool) => (
          <Button
            key={tool.key}
            variant="outline"
            onPress={tool.onPress}
            disabled={tool.disabled}
            style={s.tool}
          >
            {tool.label}
          </Button>
        ))}
      </View>
      {sheet ? (
        <View style={s.sheet}>
          <View style={s.grab} />
          <View style={s.sheetHead}>
            <Text
              variant="bodyLg"
              weight="semibold"
              accessibilityRole="header"
              style={s.sheetTitle}
            >
              {sheet.title}
            </Text>
            {sheet.headerAction}
            <PressableBase
              onPress={sheet.onClose}
              accessibilityLabel={closeLabel}
              style={s.close}
            >
              <CloseGlyph color={t.colors.foreground} size={t.iconSize.md} />
            </PressableBase>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              s.sheetBody,
              { paddingBottom: t.layout.footerBottom + bottomInset },
            ]}
          >
            {sheet.children}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
