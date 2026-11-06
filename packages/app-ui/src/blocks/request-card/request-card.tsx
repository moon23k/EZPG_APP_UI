import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { StatusBadge } from '../../components/status-badge/status-badge';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';

export type RequestCardProps = {
  name: string;
  tag?: string;
  due?: string;
  urgent?: boolean;
  summary?: string;
  meta?: string;
  actionLabel?: string;
  onAction?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  card: {
    marginTop: t.layout.itemGap,
    marginHorizontal: t.layout.screenX,
    padding: t.space[4],
    gap: t.space[2],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.surface,
  },
  pressed: { backgroundColor: t.colors.muted },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  name: { flexShrink: 1 },
  space: { flex: 1 },
  foot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: t.space[3],
  },
}));

export function RequestCard({
  name,
  tag,
  due,
  urgent = false,
  summary,
  meta,
  actionLabel,
  onAction,
  onPress,
  style,
}: RequestCardProps) {
  const s = useStyles();
  return (
    <PressableBase
      accessibilityRole="button"
      accessibilityLabel={[name, tag, due, summary].filter(Boolean).join(' ')}
      onPress={onPress}
      pressedStyle={s.pressed}
      style={[s.card, style]}
    >
      <View style={s.head}>
        <Text variant="bodyLg" weight="bold" numberOfLines={1} style={s.name}>
          {name}
        </Text>
        {tag ? <StatusBadge>{tag}</StatusBadge> : null}
        <View style={s.space} />
        {due ? (
          <Text variant="label" weight="bold" tone={urgent ? 'point' : 'muted'}>
            {due}
          </Text>
        ) : null}
      </View>
      {summary ? (
        <Text variant="label" tone="muted" numberOfLines={2}>
          {summary}
        </Text>
      ) : null}
      {meta || actionLabel ? (
        <View style={s.foot}>
          <Text variant="caption" tone="muted">
            {meta ?? ''}
          </Text>
          {actionLabel && onAction ? (
            <Button size="sm" onPress={onAction}>
              {actionLabel}
            </Button>
          ) : null}
        </View>
      ) : null}
    </PressableBase>
  );
}
