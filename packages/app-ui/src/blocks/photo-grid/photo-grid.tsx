import { View } from 'react-native';
import { Photo } from '../../components/photo/photo';
import { Text } from '../../components/text/text';
import { PlusGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type PhotoGridItem = {
  key: string;
  title: string;
  caption?: string;
  image?: string | null;
};

export type PhotoGridProps = {
  items: readonly PhotoGridItem[];
  addLabel: string;
  onAdd: () => void;
  onPress: (key: string) => void;
};

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.layout.itemGap,
    marginTop: t.layout.groupGap,
    paddingHorizontal: t.layout.screenX,
  },
  cell: {
    flexBasis: '48%',
    flexGrow: 1,
    overflow: 'hidden',
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.surface,
  },
  add: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[1],
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: t.colors.input,
  },
  photo: { width: '100%' },
  body: { padding: t.space[3], gap: t.space[1] },
  pressed: { backgroundColor: t.colors.muted },
}));

export function PhotoGrid({ items, addLabel, onAdd, onPress }: PhotoGridProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      <PressableBase
        accessibilityRole="button"
        accessibilityLabel={addLabel}
        onPress={onAdd}
        pressedStyle={s.pressed}
        style={[s.cell, s.add]}
      >
        <PlusGlyph color={t.colors.primary} size={t.iconSize.md} />
        <Text variant="label" weight="bold" tone="point">
          {addLabel}
        </Text>
      </PressableBase>
      {items.map((item) => (
        <PressableBase
          key={item.key}
          accessibilityRole="button"
          accessibilityLabel={item.title}
          onPress={() => onPress(item.key)}
          pressedStyle={s.pressed}
          style={s.cell}
        >
          <Photo
            source={{ uri: item.image ?? '' }}
            seed={item.title}
            style={s.photo}
          />
          <View style={s.body}>
            <Text variant="label" weight="semibold" numberOfLines={1}>
              {item.title}
            </Text>
            {item.caption ? (
              <Text variant="caption" tone="muted" numberOfLines={1}>
                {item.caption}
              </Text>
            ) : null}
          </View>
        </PressableBase>
      ))}
    </View>
  );
}
