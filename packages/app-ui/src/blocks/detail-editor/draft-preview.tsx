import type { ReactNode } from 'react';
import { View } from 'react-native';
import { makeStyles } from '../../utils/styles';

export type DraftPreviewProps = {
  height: number;
  children: ReactNode;
};

const useStyles = makeStyles((t) => ({
  box: {
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: t.space[4],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.muted,
  },
  page: {
    overflow: 'hidden',
    borderTopLeftRadius: t.radius.sm,
    borderTopRightRadius: t.radius.sm,
    backgroundColor: t.colors.surface,
  },
}));

export function DraftPreview({ height, children }: DraftPreviewProps) {
  const s = useStyles();
  return (
    <View style={[s.box, { height }]}>
      <View style={s.page}>{children}</View>
    </View>
  );
}
