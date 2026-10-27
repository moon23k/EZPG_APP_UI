import {
  ActivityIndicator,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Photo } from '../../components/photo/photo';
import { Text } from '../../components/text/text';
import { CloseGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { SortableGrid, SortableHandle } from '../../sortable/sortable-grid';

export type GridImage = {
  id: string;
  uri: string;
  status?: 'uploading' | 'failed';
};

export type ImageGridProps = {
  images: readonly GridImage[];
  onImagesChange: (images: GridImage[]) => void;
  onAdd?: () => void;
  onRemove?: (id: string) => void;
  onRetry?: (id: string) => void;
  max?: number;
  columns?: number;
  style?: StyleProp<ViewStyle>;
};

const ADD: GridImage = { id: '__add', uri: '' };
const RADIUS = 10;

const useStyles = makeStyles((t) => ({
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS,
  },
  dim: { backgroundColor: `${t.colors.background}B3` },
  light: { gap: 2, backgroundColor: `${t.colors.background}D9` },
  failed: { fontSize: 12, lineHeight: 16, color: t.colors.danger },
  cover: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 2,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  coverText: { color: '#ffffff', textAlign: 'center' },
  remove: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 44,
    height: 44,
    alignItems: 'flex-end',
    padding: t.space[1],
  },
  removeDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.foreground,
  },
  add: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: t.colors.input,
    backgroundColor: t.colors.muted,
  },
  count: { fontSize: 13, fontVariant: ['tabular-nums'] },
}));

const g = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  column: { alignItems: 'center' },
  bump: { borderBottomWidth: 0 },
  open: { borderTopColor: 'transparent', transform: [{ rotate: '45deg' }] },
  head: { position: 'absolute' },
});

function CameraGlyph({ color, size }: { color: string; size: number }) {
  const stroke = Math.max(1.5, size / 14);
  const line = { borderWidth: stroke, borderColor: color };
  return (
    <View style={[g.column, { width: size, height: size }]}>
      <View
        style={[
          line,
          g.bump,
          {
            width: size * 0.34,
            height: size * 0.16,
            marginTop: size * 0.1,
            borderTopLeftRadius: stroke,
            borderTopRightRadius: stroke,
          },
        ]}
      />
      <View
        style={[
          line,
          g.center,
          {
            width: size * 0.84,
            height: size * 0.58,
            borderRadius: size * 0.12,
          },
        ]}
      >
        <View
          style={[
            line,
            {
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: size * 0.15,
            },
          ]}
        />
      </View>
    </View>
  );
}

function RetryGlyph({ color, size }: { color: string; size: number }) {
  const stroke = Math.max(2, size / 11);
  const ring = size * 0.76;
  return (
    <View style={[g.center, { width: size, height: size }]}>
      <View
        style={[
          g.open,
          {
            width: ring,
            height: ring,
            borderRadius: ring / 2,
            borderWidth: stroke,
            borderColor: color,
          },
        ]}
      />
      <View
        style={[
          g.head,
          {
            top: size * 0.08,
            right: size * 0.1,
            width: size * 0.3,
            height: size * 0.3,
            borderTopWidth: stroke,
            borderRightWidth: stroke,
            borderColor: color,
          },
        ]}
      />
    </View>
  );
}

export function ImageGrid({
  images,
  onImagesChange,
  onAdd,
  onRemove,
  onRetry,
  max = 10,
  columns = 4,
  style,
}: ImageGridProps) {
  const t = useTheme();
  const s = useStyles();
  const data = onAdd ? [ADD, ...images] : [...images];
  const canAdd = images.length < max;
  return (
    <View style={style}>
      <SortableGrid
        data={data}
        columns={columns}
        gap={10}
        handle
        keyExtractor={(img) => img.id}
        onDataChange={(next) => onImagesChange(next.filter((i) => i !== ADD))}
        itemLabel={(img) => {
          if (img === ADD) return `사진 추가, ${max}장 중 ${images.length}장`;
          const n = images.indexOf(img) + 1;
          const state =
            img.status === 'uploading'
              ? ', 업로드 중'
              : img.status === 'failed'
                ? ', 업로드 실패'
                : '';
          return `사진 ${n}${n === 1 ? ', 대표' : ''}${state}`;
        }}
        renderItem={({ item }) => {
          if (item === ADD) {
            return (
              <PressableBase
                accessibilityLabel={`사진 추가, ${max}장 중 ${images.length}장`}
                disabled={!canAdd}
                onPress={onAdd}
                style={s.add}
              >
                <CameraGlyph color={t.colors.mutedForeground} size={24} />
                <Text weight="semibold" style={s.count}>
                  {images.length}/{max}
                </Text>
              </PressableBase>
            );
          }
          const n = images.indexOf(item) + 1;
          return (
            <SortableHandle>
              <View>
                <Photo source={{ uri: item.uri }} radius={RADIUS} />
                {n === 1 && !item.status ? (
                  <View style={s.cover}>
                    <Text variant="caption" weight="bold" style={s.coverText}>
                      대표
                    </Text>
                  </View>
                ) : null}
                {item.status === 'uploading' ? (
                  <View style={[s.fill, s.dim]}>
                    <ActivityIndicator color={t.colors.foreground} />
                  </View>
                ) : item.status === 'failed' ? (
                  <PressableBase
                    accessibilityLabel={`사진 ${n} 업로드 실패, 다시 시도`}
                    disabled={!onRetry}
                    onPress={() => onRetry?.(item.id)}
                    style={[s.fill, s.light]}
                  >
                    <RetryGlyph color={t.colors.danger} size={22} />
                    <Text weight="bold" style={s.failed}>
                      실패
                    </Text>
                  </PressableBase>
                ) : null}
                {onRemove && item.status !== 'uploading' ? (
                  <PressableBase
                    accessibilityLabel={`사진 ${n} 삭제`}
                    onPress={() => onRemove(item.id)}
                    style={s.remove}
                  >
                    <View style={s.removeDot}>
                      <CloseGlyph color={t.colors.background} size={12} />
                    </View>
                  </PressableBase>
                ) : null}
              </View>
            </SortableHandle>
          );
        }}
      />
    </View>
  );
}
