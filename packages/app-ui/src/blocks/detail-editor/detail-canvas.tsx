import type { ReactNode } from 'react';
import { Image, Text as RNText, View, type TextStyle } from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import {
  DETAIL_FONT_FAMILY,
  detailFontSize,
  type DetailBlock,
  type DetailDocValue,
  type DetailLayer,
  type DetailSelection,
} from './detail-types';

export type DetailCanvasProps = {
  doc: DetailDocValue;
  selection?: DetailSelection;
  onSelect?: (selection: DetailSelection) => void;
  scale?: number;
  ink?: string;
  paper?: string;
};

const HANDLE = 10;

const useStyles = makeStyles((t) => ({
  page: { overflow: 'hidden' },
  texts: { gap: t.space[2] },
  row: { flexDirection: 'row', alignItems: 'center' },
  half: { flex: 1 },
  full: { width: '100%' },
  fill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  pair: { flexDirection: 'row', gap: t.space[2] },
  card: { overflow: 'hidden', borderRadius: t.radius.lg },
  selected: { borderWidth: 2, borderColor: t.colors.primary },
  handle: {
    position: 'absolute',
    width: HANDLE,
    height: HANDLE,
    borderRadius: HANDLE / 2,
    borderWidth: 2,
    borderColor: t.colors.primary,
    backgroundColor: t.colors.surface,
  },
}));

function Handles() {
  const s = useStyles();
  const edge = -HANDLE / 2;
  return (
    <>
      <View style={[s.handle, { left: edge, top: edge }]} />
      <View style={[s.handle, { right: edge, top: edge }]} />
      <View style={[s.handle, { left: edge, bottom: edge }]} />
      <View style={[s.handle, { right: edge, bottom: edge }]} />
    </>
  );
}

export function textStyleOf(
  layer: DetailLayer,
  scale: number,
  ink: string,
  paper?: string
): TextStyle {
  const st = layer.style ?? {};
  const size = detailFontSize(st.size) * scale;
  const color = st.color ?? ink;
  const base: TextStyle = {
    fontFamily: DETAIL_FONT_FAMILY[st.font ?? 'gothic'][st.weight ?? 'regular'],
    fontSize: size,
    lineHeight: size * 1.45,
    color,
    textAlign: st.align ?? 'left',
  };
  if (st.effect === 'shadow') {
    return {
      ...base,
      textShadowColor: 'rgba(0, 0, 0, 0.35)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    };
  }
  if (st.effect === 'outline') {
    return {
      ...base,
      borderWidth: 1.5,
      borderColor: color,
      paddingHorizontal: 8 * scale,
      alignSelf: alignSelfOf(st.align),
    };
  }
  if (st.effect === 'band') {
    return {
      ...base,
      color: paper ?? color,
      backgroundColor: color,
      paddingHorizontal: 8 * scale,
      alignSelf: alignSelfOf(st.align),
    };
  }
  return base;
}

function alignSelfOf(align?: 'left' | 'center' | 'right') {
  return align === 'center'
    ? 'center'
    : align === 'right'
      ? 'flex-end'
      : 'flex-start';
}

export function DetailCanvas({
  doc,
  selection,
  onSelect,
  scale = 1,
  ink,
  paper,
}: DetailCanvasProps) {
  const t = useTheme();
  const s = useStyles();
  const pad = t.space[5] * scale;
  const fg = ink ?? t.colors.foreground;
  const bandText = paper ?? t.colors.surface;

  const picked = (block: DetailBlock, layer?: DetailLayer) =>
    selection?.block === block.id &&
    (layer ? selection.layer === layer.id : !selection.layer);

  const press = (next: DetailSelection) =>
    onSelect ? () => onSelect(next) : undefined;

  const image = (
    block: DetailBlock,
    layer: DetailLayer,
    flex = false,
    ratio = 1
  ) => (
    <PressableBase
      key={layer.id}
      disabled={!onSelect}
      onPress={press({ block: block.id, layer: layer.id })}
      accessibilityLabel="사진"
      pressedStyle={{}}
      style={[flex && s.half, picked(block, layer) && s.selected]}
    >
      {layer.url ? (
        <Image
          source={{ uri: layer.url }}
          resizeMode="cover"
          style={[s.full, { aspectRatio: ratio }]}
        />
      ) : (
        <View
          style={[
            s.full,
            { aspectRatio: ratio, backgroundColor: t.colors.muted },
          ]}
        />
      )}
      {picked(block, layer) ? <Handles /> : null}
    </PressableBase>
  );

  const texts = (block: DetailBlock, shown: DetailLayer[]) => {
    const list = shown.filter((l) => l.type === 'text' && l.text);
    if (!list.length) return null;
    return (
      <View style={[s.texts, { padding: pad }]}>
        {list.map((l) => {
          const style = textStyleOf(l, scale, fg, bandText);
          return (
            <PressableBase
              key={l.id}
              disabled={!onSelect}
              onPress={press({ block: block.id, layer: l.id })}
              accessibilityLabel={l.text ?? ''}
              pressedStyle={{}}
              style={picked(block, l) ? s.selected : undefined}
            >
              <RNText style={style}>{l.text}</RNText>
              {picked(block, l) ? <Handles /> : null}
            </PressableBase>
          );
        })}
      </View>
    );
  };

  const body = (block: DetailBlock): ReactNode => {
    const shown = block.layers.filter((l) => !l.hidden);
    const images = shown.filter((l) => l.type === 'image');
    switch (block.layout) {
      case 'text':
        return texts(block, shown);
      case 'image':
        return images.map((l) => image(block, l, false, 4 / 5));
      case 'text_top':
        return (
          <>
            {texts(block, shown)}
            {images.map((l) => image(block, l, false, 4 / 5))}
          </>
        );
      case 'side':
        return (
          <View style={s.row}>
            {images.slice(0, 1).map((l) => image(block, l, true))}
            <View style={s.half}>{texts(block, shown)}</View>
          </View>
        );
      case 'two_images':
        return (
          <>
            <View style={[s.pair, { paddingHorizontal: pad, paddingTop: pad }]}>
              {images.slice(0, 2).map((l) => image(block, l, true))}
            </View>
            {texts(block, shown)}
          </>
        );
      case 'card':
        return (
          <View style={{ padding: pad }}>
            <View style={[s.card, { backgroundColor: t.colors.surface }]}>
              {images.slice(0, 1).map((l) => image(block, l))}
              {texts(block, shown)}
            </View>
          </View>
        );
      default:
        return (
          <>
            {images.map((l) => image(block, l, false, 4 / 5))}
            {texts(block, shown)}
          </>
        );
    }
  };

  return (
    <View style={[s.page, { backgroundColor: paper ?? t.colors.surface }]}>
      {doc.blocks.map((block) => (
        <PressableBase
          key={block.id}
          disabled={!onSelect}
          onPress={press({ block: block.id })}
          accessibilityLabel="블록"
          pressedStyle={{}}
          style={[
            {
              backgroundColor: block.background?.color ?? undefined,
            },
            picked(block) && s.selected,
          ]}
        >
          {block.background?.url ? (
            <Image
              source={{ uri: block.background.url }}
              resizeMode="cover"
              style={s.fill}
            />
          ) : null}
          {body(block)}
          {picked(block) ? <Handles /> : null}
        </PressableBase>
      ))}
    </View>
  );
}
