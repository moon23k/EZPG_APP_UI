import { useState } from 'react';
import {
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Photo } from '../../components/photo/photo';
import { Text } from '../../components/text/text';
import { PlusGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type CoverPhoto = {
  id: string;
  uri: string;
  status?: 'uploading' | 'failed';
};

export type CoverPhotosProps = {
  photos: readonly CoverPhoto[];
  max?: number;
  onAdd?: () => void;
  onPress?: (id: string) => void;
  onRetry?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

const COLUMNS = 4;
const ADD = '__add';

const useStyles = makeStyles((t) => ({
  top: { flexDirection: 'row', gap: t.space[2] },
  side: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[2] },
  rest: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.space[2],
    marginTop: t.space[2],
  },
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.md,
  },
  dim: { backgroundColor: `${t.colors.background}B3` },
  failed: { backgroundColor: `${t.colors.background}D9` },
  tag: {
    position: 'absolute',
    top: t.space[2],
    left: t.space[2],
    paddingHorizontal: t.space[2],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.foreground,
  },
  tagText: { color: t.colors.surface },
  add: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[1],
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: t.colors.input,
  },
}));

export function CoverPhotos({
  photos,
  max = 10,
  onAdd,
  onPress,
  onRetry,
  style,
}: CoverPhotosProps) {
  const t = useTheme();
  const s = useStyles();
  const [width, setWidth] = useState(0);
  const gap = t.space[2];
  const small = width > 0 ? (width - gap * (COLUMNS - 1)) / COLUMNS : 0;
  const big = small * 2 + gap;
  const cells = [
    ...photos.slice(1).map((p) => p.id),
    ...(onAdd && photos.length < max ? [ADD] : []),
  ];

  const tile = (id: string, size: number) => {
    if (id === ADD) {
      return (
        <PressableBase
          key={ADD}
          accessibilityLabel={`사진 추가, ${max}장 중 ${photos.length}장`}
          onPress={onAdd}
          style={[s.add, { width: size, height: size }]}
        >
          <PlusGlyph color={t.colors.foreground} size={22} />
          <Text variant="caption" tone="muted">
            {photos.length}/{max}
          </Text>
        </PressableBase>
      );
    }
    const index = photos.findIndex((p) => p.id === id);
    const photo = photos[index];
    if (!photo) return null;
    const label = `사진 ${index + 1}${index === 0 ? ', 대표' : ''}`;
    return (
      <PressableBase
        key={photo.id}
        accessibilityLabel={
          photo.status === 'failed' ? `${label}, 업로드 실패, 다시 시도` : label
        }
        disabled={photo.status === 'uploading'}
        onPress={() =>
          photo.status === 'failed' ? onRetry?.(photo.id) : onPress?.(photo.id)
        }
        style={{ width: size, height: size }}
      >
        <Photo
          source={{ uri: photo.uri }}
          radius={t.radius.md}
          style={{ width: size, height: size }}
        />
        {index === 0 && !photo.status ? (
          <View style={s.tag}>
            <Text variant="caption" weight="bold" style={s.tagText}>
              대표
            </Text>
          </View>
        ) : null}
        {photo.status === 'uploading' ? (
          <View style={[s.fill, s.dim]}>
            <ActivityIndicator color={t.colors.foreground} />
          </View>
        ) : photo.status === 'failed' ? (
          <View style={[s.fill, s.failed]}>
            <Text variant="caption" weight="bold" tone="danger">
              다시
            </Text>
          </View>
        ) : null}
      </PressableBase>
    );
  };

  return (
    <View
      style={style}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
    >
      {width > 0 ? (
        <>
          <View style={s.top}>
            {photos[0] ? tile(photos[0].id, big) : tile(ADD, big)}
            <View style={[s.side, { width: big }]}>
              {(photos[0] ? cells : [])
                .slice(0, 4)
                .map((id) => tile(id, small))}
            </View>
          </View>
          {photos[0] && cells.length > 4 ? (
            <View style={s.rest}>
              {cells.slice(4).map((id) => tile(id, small))}
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}
