import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { makeStyles } from '../utils/styles';

const useStyles = makeStyles((t) => ({
  section: { gap: t.space[2], marginBottom: t.space[6], maxWidth: 420 },
  title: {
    ...t.typography.caption,
    color: t.colors.mutedForeground,
    letterSpacing: 0.4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: t.space[3],
  },
  column: { gap: t.space[3], maxWidth: 360 },
}));

/** 스토리 안에서 묶음마다 제목을 붙인다 */
export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const s = useStyles();
  return (
    <View style={s.section}>
      <Text style={s.title}>{title.toUpperCase()}</Text>
      {children}
    </View>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <View style={useStyles().row}>{children}</View>;
}

export function Column({ children }: { children: ReactNode }) {
  return <View style={useStyles().column}>{children}</View>;
}

export const sample = (id: number, w = 600, h = w) => ({
  uri: `https://picsum.photos/id/${id}/${w}/${h}`,
});
