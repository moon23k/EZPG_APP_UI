import { View } from 'react-native';
import { CheckGlyph } from '../../internal/glyphs';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type CheckListProps = { items: readonly string[] };

const MARK = 20;

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[5] },
  item: { flexDirection: 'row', gap: t.space[3] },
  mark: {
    width: MARK,
    height: MARK,
    marginTop: t.space[1] / 2,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.primary,
  },
  text: { flex: 1 },
}));

export function CheckList({ items }: CheckListProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      {items.map((item) => (
        <View key={item} style={s.item}>
          <View style={s.mark}>
            <CheckGlyph
              size={t.iconSize.sm}
              color={t.colors.primaryForeground}
            />
          </View>
          <Text variant="bodyLg" style={s.text}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}
