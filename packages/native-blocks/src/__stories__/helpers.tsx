import { makeStyles, Text } from '@ezpg/native-ui';
import type { ReactNode } from 'react';
import { View } from 'react-native';

const useStyles = makeStyles((t) => ({
  section: { gap: t.space[2], marginBottom: t.space[6], maxWidth: 420 },
  title: { letterSpacing: 0.4 },
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
      <Text variant="caption" tone="muted" style={s.title}>
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

export const sample = (id: number, w = 600, h = w) => ({
  uri: `https://picsum.photos/id/${id}/${w}/${h}`,
});
