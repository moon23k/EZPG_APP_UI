import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type DetailEditorTemplateProps = {
  bar: ReactNode;
  children: ReactNode;
  bottom?: ReactNode;
  bottomInset?: number;
  wide?: boolean;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.muted },
  scroll: { paddingVertical: t.space[3] },
  page: {
    alignSelf: 'center',
    width: '86%',
    boxShadow: t.shadow.md,
  },
  wide: { alignSelf: 'stretch', width: '100%', boxShadow: undefined },
  bottom: { gap: t.space[3], paddingTop: t.space[2] },
}));

export function DetailEditorTemplate({
  bar,
  children,
  bottom,
  bottomInset = 0,
  wide,
}: DetailEditorTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      {bar}
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={[s.page, wide && s.wide]}>{children}</View>
      </ScrollView>
      {bottom ? (
        <View style={[s.bottom, { paddingBottom: bottomInset + t.space[3] }]}>
          {bottom}
        </View>
      ) : null}
    </View>
  );
}
