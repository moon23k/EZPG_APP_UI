import { ScrollView, View } from 'react-native';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { DETAIL_LAYOUTS, type DetailLayout } from './detail-types';

export type LayoutPickerProps = {
  value: DetailLayout;
  onValueChange: (layout: DetailLayout) => void;
  labels?: Partial<Record<DetailLayout, string>>;
};

const LABELS: Record<DetailLayout, string> = {
  image_top: '사진 위 · 글 아래',
  text_top: '글 위 · 사진 아래',
  side: '나란히',
  image: '꽉 찬 사진',
  two_images: '사진 두 장',
  card: '카드',
  text: '글만',
};

const useStyles = makeStyles((t) => ({
  row: { gap: t.space[2], paddingHorizontal: t.space[3] },
  item: { width: t.space[16] + t.space[6], gap: t.space[1] },
  frame: {
    height: t.space[16] + t.space[12],
    overflow: 'hidden',
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.muted,
    padding: t.space[1],
    gap: t.space[1],
  },
  on: { borderWidth: 2, borderColor: t.colors.primary },
  photo: {
    flex: 1,
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.input,
  },
  lines: { gap: t.space[1], padding: t.space[1] },
  line: { height: t.space[1], borderRadius: t.radius.full },
  split: { flex: 1, flexDirection: 'row', gap: t.space[1] },
  half: { flex: 1, justifyContent: 'center' },
  long: { width: '80%' },
  short: { width: '50%' },
  card: {
    flex: 1,
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.surface,
    padding: t.space[1],
    gap: t.space[1],
  },
}));

function Diagram({ layout }: { layout: DetailLayout }) {
  const t = useTheme();
  const s = useStyles();
  const photo = <View style={s.photo} />;
  const lines = (
    <View style={s.lines}>
      <View
        style={[s.line, s.long, { backgroundColor: t.colors.foreground }]}
      />
      <View
        style={[s.line, s.short, { backgroundColor: t.colors.mutedForeground }]}
      />
    </View>
  );
  switch (layout) {
    case 'image_top':
      return (
        <>
          {photo}
          {lines}
        </>
      );
    case 'text_top':
      return (
        <>
          {lines}
          {photo}
        </>
      );
    case 'side':
      return (
        <View style={s.split}>
          {photo}
          <View style={s.half}>{lines}</View>
        </View>
      );
    case 'two_images':
      return (
        <>
          <View style={s.split}>
            {photo}
            {photo}
          </View>
          {lines}
        </>
      );
    case 'card':
      return (
        <View style={s.card}>
          {photo}
          {lines}
        </View>
      );
    case 'text':
      return <View style={s.half}>{lines}</View>;
    default:
      return photo;
  }
}

export function LayoutPicker({
  value,
  onValueChange,
  labels,
}: LayoutPickerProps) {
  const s = useStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.row}
      accessibilityRole="radiogroup"
    >
      {DETAIL_LAYOUTS.map((layout) => {
        const on = layout === value;
        const label = labels?.[layout] ?? LABELS[layout];
        return (
          <PressableBase
            key={layout}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            accessibilityLabel={label}
            onPress={() => onValueChange(layout)}
            style={s.item}
          >
            <View style={[s.frame, on && s.on]}>
              <Diagram layout={layout} />
            </View>
            <Text
              variant="caption"
              tone={on ? 'default' : 'muted'}
              numberOfLines={1}
            >
              {label}
            </Text>
          </PressableBase>
        );
      })}
    </ScrollView>
  );
}
