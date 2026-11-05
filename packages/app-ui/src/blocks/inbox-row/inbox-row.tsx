import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Photo } from '../../components/photo/photo';
import { Text } from '../../components/text/text';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type InboxRowProps = {
  title: string;
  body: string;
  meta?: string;
  urgent?: boolean;
  unread?: boolean;
  image?: string | null;
  icon?: IconSlot;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const DOT = 8;

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: t.space[3],
    minHeight: t.listRow.twoLine,
    paddingHorizontal: t.layout.screenX,
    paddingVertical: t.space[3],
  },
  pressed: { backgroundColor: t.colors.muted },
  mark: {
    width: t.controlSize.sm,
    height: t.controlSize.sm,
    borderRadius: t.radius.full,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.muted,
  },
  photo: { width: t.controlSize.sm },
  body: { flex: 1, gap: t.space[1] / 2 },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  title: { flex: 1 },
  urgent: { color: t.colors.primary },
  dot: {
    width: DOT,
    height: DOT,
    marginTop: t.space[2],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
  },
  idle: { backgroundColor: 'transparent' },
}));

export function InboxRow({
  title,
  body,
  meta,
  urgent,
  unread,
  image,
  icon,
  onPress,
  style,
}: InboxRowProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <PressableBase
      onPress={onPress}
      disabled={!onPress}
      accessibilityLabel={[title, body, meta].filter(Boolean).join(' ')}
      style={[s.root, style]}
      pressedStyle={s.pressed}
    >
      <View style={s.mark}>
        {icon ? (
          renderIcon(icon, {
            color: t.colors.mutedForeground,
            size: t.iconSize.md,
          })
        ) : (
          <Photo
            source={{ uri: image ?? '' }}
            seed={title}
            radius={t.radius.full}
            style={s.photo}
          />
        )}
      </View>
      <View style={s.body}>
        <View style={s.head}>
          <Text variant="label" weight="bold" numberOfLines={1} style={s.title}>
            {title}
          </Text>
          {meta ? (
            <Text
              variant="caption"
              weight={urgent ? 'bold' : undefined}
              tone={urgent ? undefined : 'muted'}
              style={urgent && s.urgent}
            >
              {meta}
            </Text>
          ) : null}
        </View>
        <Text numberOfLines={1}>{body}</Text>
      </View>
      <View style={[s.dot, !unread && s.idle]} />
    </PressableBase>
  );
}
