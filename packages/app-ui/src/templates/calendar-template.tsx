import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';

export type CalendarTemplateProps = {
  calendar: ReactNode;
  panel?: { field: ReactNode; rows?: ReactNode };
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  panel: {
    borderTopWidth: 1,
    borderTopColor: t.colors.border,
    paddingTop: t.space[3],
    backgroundColor: t.colors.background,
  },
  field: { paddingHorizontal: t.layout.screenX },
}));

export function CalendarTemplate({
  calendar,
  panel,
  bottomInset = 0,
}: CalendarTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      {calendar}
      {panel ? (
        <View
          style={[
            s.panel,
            { paddingBottom: t.layout.footerBottom + bottomInset },
          ]}
        >
          <View style={s.field}>{panel.field}</View>
          {panel.rows}
        </View>
      ) : null}
    </View>
  );
}
