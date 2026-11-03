import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { ChevronGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type InviteCardProps = {
  title: string;
  tags?: readonly string[];
  rows?: readonly { label: string; value: string }[];
  compact?: boolean;
  description?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  card: {
    alignItems: 'center',
    gap: t.space[3],
    padding: t.space[5],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  mark: {
    width: t.space[12] + t.space[2],
    height: t.space[12] + t.space[2],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: t.space[1],
  },
  tag: {
    paddingHorizontal: t.space[2],
    paddingVertical: t.space[1] / 2,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.muted,
  },
  rows: { alignSelf: 'stretch', gap: t.space[1] },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    padding: t.space[3],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.primaryContainer,
    backgroundColor: t.colors.primaryTint,
  },
  small: {
    width: t.space[10],
    height: t.space[10],
    borderRadius: t.radius.md,
    backgroundColor: t.colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: t.space[1] / 2 },
}));

const initial = (title: string) => Array.from(title.trim())[0] ?? '';

export function InviteCard({
  title,
  tags = [],
  rows = [],
  compact,
  description,
  onPress,
  style,
}: InviteCardProps) {
  const t = useTheme();
  const s = useStyles();
  if (compact) {
    const content = (
      <>
        <View style={s.small}>
          <Text variant="bodyLg" weight="bold" tone="primary">
            {initial(title)}
          </Text>
        </View>
        <View style={s.body}>
          <Text variant="body" weight="semibold">
            {title}
          </Text>
          {description ? (
            <Text variant="caption" tone="muted">
              {description}
            </Text>
          ) : null}
        </View>
        {onPress ? (
          <ChevronGlyph color={t.colors.primary} size={t.iconSize.sm} />
        ) : null}
      </>
    );
    return onPress ? (
      <PressableBase
        onPress={onPress}
        accessibilityRole="button"
        style={[s.compact, style]}
      >
        {content}
      </PressableBase>
    ) : (
      <View style={[s.compact, style]}>{content}</View>
    );
  }
  return (
    <View style={[s.card, style]}>
      <View style={s.mark}>
        <Text variant="title" tone="primary">
          {initial(title)}
        </Text>
      </View>
      <Text variant="title" accessibilityRole="header">
        {title}
      </Text>
      {tags.length ? (
        <View style={s.tags}>
          {tags.map((tag) => (
            <View key={tag} style={s.tag}>
              <Text variant="caption">{tag}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {rows.length ? (
        <View style={s.rows}>
          {rows.map((row) => (
            <View key={row.label} style={s.row}>
              <Text variant="label" tone="muted">
                {row.label}
              </Text>
              <Text variant="label">{row.value}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
