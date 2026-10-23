import {
  makeStyles,
  Photo,
  PressableBase,
  StatusBadge,
  Text,
  useTheme,
} from '@ezpg/native-ui';
import { SortableGrid } from '@ezpg/native-ui/sortable';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export type GridImage = {
  id: string;
  uri: string;
  /** 0~1. 있으면 올리는 중 */
  progress?: number;
  /** 예) 'JPG · PNG · WebP만 올릴 수 있어요' */
  error?: string;
};

export type ImageGridProps = {
  images: readonly GridImage[];
  /** 순서가 바뀌면. 첫 장이 대표 사진 */
  onImagesChange: (images: GridImage[]) => void;
  onAdd?: () => void;
  onRemove?: (id: string) => void;
  /** 기본 10 */
  max?: number;
  /** 기본 3 */
  columns?: number;
  /** 기본 'JPG · PNG · WebP, 10MB 이하 · 길게 눌러 순서 변경' */
  hint?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  cover: { position: 'absolute', top: t.space[1], left: t.space[1] },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: t.space[2],
    borderRadius: t.radius.md,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  progress: {
    position: 'absolute',
    left: t.space[2],
    right: t.space[2],
    bottom: t.space[2],
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  fill: { height: '100%', borderRadius: 2, backgroundColor: '#ffffff' },
  overlayText: { color: '#ffffff', textAlign: 'center' },
  remove: {
    position: 'absolute',
    top: t.space[1],
    right: t.space[1],
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  add: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[1],
    aspectRatio: 1,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: t.colors.border,
  },
}));

/** 상품 사진 올리기 · 순서 바꾸기. 앱 최상단이 GestureHandlerRootView로 감싸져 있어야 한다 */
export function ImageGrid({
  images,
  onImagesChange,
  onAdd,
  onRemove,
  max = 10,
  columns = 3,
  hint = 'JPG · PNG · WebP, 10MB 이하 · 길게 눌러 순서 변경',
  style,
}: ImageGridProps) {
  const t = useTheme();
  const s = useStyles();
  const canAdd = onAdd && images.length < max;
  return (
    <View style={[s.root, style]}>
      <SortableGrid
        data={images}
        columns={columns}
        keyExtractor={(img) => img.id}
        onDataChange={onImagesChange}
        itemLabel={(img) =>
          `사진 ${images.indexOf(img) + 1}${images[0] === img ? ', 대표' : ''}`
        }
        renderItem={({ item, index }) => (
          <View>
            <Photo source={{ uri: item.uri }} />
            {index === 0 ? (
              <StatusBadge style={s.cover}>대표</StatusBadge>
            ) : null}
            {item.error ? (
              <View style={s.overlay}>
                <Text variant="caption" style={s.overlayText}>
                  {item.error}
                </Text>
              </View>
            ) : item.progress !== undefined && item.progress < 1 ? (
              <View style={s.overlay}>
                <View style={s.progress}>
                  <View
                    style={[
                      s.fill,
                      { width: `${Math.round(item.progress * 100)}%` },
                    ]}
                  />
                </View>
              </View>
            ) : null}
            {onRemove ? (
              <PressableBase
                accessibilityLabel="사진 삭제"
                touchHeight={24}
                style={s.remove}
                onPress={() => onRemove(item.id)}
              >
                <Text variant="caption" style={s.overlayText}>
                  ✕
                </Text>
              </PressableBase>
            ) : null}
          </View>
        )}
      />
      {canAdd ? (
        <PressableBase
          accessibilityLabel="사진 추가"
          onPress={onAdd}
          style={[s.add, { width: `${100 / columns - 2}%` }]}
        >
          <Text variant="title" tone="muted">
            +
          </Text>
          <Text variant="caption" tone="muted">
            {images.length}/{max}
          </Text>
        </PressableBase>
      ) : null}
      <Text
        variant="caption"
        tone="muted"
        style={{ color: t.colors.mutedForeground }}
      >
        {hint}
      </Text>
    </View>
  );
}
