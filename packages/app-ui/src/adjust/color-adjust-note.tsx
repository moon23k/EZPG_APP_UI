import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../components/text/text';
import { makeStyles } from '../utils/styles';

export type ColorAdjustNoteProps = {
  original: string;
  applied: string;
  title: string;
  detail?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    marginHorizontal: t.layout.screenX,
    paddingHorizontal: t.space[3],
    paddingVertical: t.space[2],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  sw: { width: t.space[5], height: t.space[5], borderRadius: t.radius.sm },
  text: { flex: 1 },
}));

export function ColorAdjustNote({
  original,
  applied,
  title,
  detail,
  style,
}: ColorAdjustNoteProps) {
  const s = useStyles();
  const changed = original.toUpperCase() !== applied.toUpperCase();
  return (
    <View
      style={[s.root, style]}
      accessible
      accessibilityLabel={[title, detail].filter(Boolean).join(', ')}
    >
      {changed ? (
        <>
          <View style={[s.sw, { backgroundColor: original }]} />
          <Text variant="caption" tone="muted">
            →
          </Text>
        </>
      ) : null}
      <View style={[s.sw, { backgroundColor: applied }]} />
      <Text variant="caption" style={s.text} numberOfLines={2}>
        <Text variant="caption" weight="semibold">
          {title}
        </Text>
        {detail ? ` · ${detail}` : ''}
      </Text>
    </View>
  );
}
