import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { makeStyles } from '../utils/styles';

export type SelectionTemplateProps = {
  bar: ReactNode;
  children: ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
}));

export function SelectionTemplate({ bar, children }: SelectionTemplateProps) {
  const s = useStyles();
  return (
    <View style={s.root}>
      <ScrollView>{children}</ScrollView>
      {bar}
    </View>
  );
}
