import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../components/text/text';
import { makeStyles } from '../utils/styles';

export type GroupProps = {
  title?: string;
  aside?: string;
  children: ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.layout.groupGap },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: t.space[2],
  },
  title: { flexShrink: 1 },
}));

export function Group({ title, aside, children }: GroupProps) {
  const s = useStyles();
  return (
    <View style={s.root}>
      {title || aside ? (
        <View style={s.head}>
          {title ? (
            <Text
              variant="bodyLg"
              weight="semibold"
              accessibilityRole="header"
              style={s.title}
            >
              {title}
            </Text>
          ) : null}
          {aside ? (
            <Text variant="label" tone="muted">
              {aside}
            </Text>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}
