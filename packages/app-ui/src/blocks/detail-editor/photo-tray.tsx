import { Image, View } from 'react-native';
import { Text } from '../../components/text/text';
import {
  CameraGlyph,
  CloseGlyph,
  ImageGlyph,
  ScanGlyph,
} from '../../internal/glyphs';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type TrayPhoto = { key: string; uri: string; reference?: boolean };
export type TraySource = 'camera' | 'library' | 'capture';

export type PhotoTrayProps = {
  photos: readonly TrayPhoto[];
  onRemove: (key: string) => void;
  onAdd: (source: TraySource) => void;
  mainLabel?: string;
  referenceLabel?: string;
};

const ADD: { key: TraySource; label: string; icon: IconSlot }[] = [
  { key: 'camera', label: '촬영', icon: CameraGlyph },
  { key: 'library', label: '사진', icon: ImageGlyph },
  { key: 'capture', label: '참고 캡처', icon: ScanGlyph },
];

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[3], paddingHorizontal: t.layout.screenX },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[2] },
  tile: { width: '31.5%' },
  photo: {
    width: '100%',
    height: undefined,
    aspectRatio: 3 / 4,
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.muted,
  },
  reference: { borderWidth: 3, borderColor: t.colors.primary },
  remove: {
    position: 'absolute',
    right: t.space[1],
    top: t.space[1],
    width: t.space[6],
    height: t.space[6],
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.foreground,
  },
  badge: {
    position: 'absolute',
    left: t.space[1],
    bottom: t.space[1],
    paddingHorizontal: t.space[2],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.foreground,
  },
  adds: { flexDirection: 'row', gap: t.space[2] },
  add: {
    flex: 1,
    height: t.space[16],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: t.colors.input,
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[1],
  },
}));

export function PhotoTray({
  photos,
  onRemove,
  onAdd,
  mainLabel = '대표',
  referenceLabel = '참고',
}: PhotoTrayProps) {
  const t = useTheme();
  const s = useStyles();
  const main = photos.find((p) => !p.reference)?.key;
  return (
    <View style={s.root}>
      {photos.length ? (
        <View style={s.grid}>
          {photos.map((p) => (
            <View key={p.key} style={s.tile}>
              <Image
                source={{ uri: p.uri }}
                resizeMode="cover"
                style={[s.photo, p.reference && s.reference]}
              />
              <PressableBase
                onPress={() => onRemove(p.key)}
                accessibilityLabel="빼기"
                touchHeight={t.space[6]}
                style={s.remove}
              >
                <CloseGlyph color={t.colors.surface} size={t.iconSize.sm} />
              </PressableBase>
              {p.key === main || p.reference ? (
                <View style={s.badge}>
                  <Text
                    variant="caption"
                    weight="bold"
                    style={{ color: t.colors.surface }}
                  >
                    {p.reference ? referenceLabel : mainLabel}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
      <View style={s.adds}>
        {ADD.map((a) => (
          <PressableBase
            key={a.key}
            onPress={() => onAdd(a.key)}
            accessibilityLabel={a.label}
            style={s.add}
          >
            {renderIcon(a.icon, {
              color: t.colors.mutedForeground,
              size: t.iconSize.md,
            })}
            <Text variant="caption" tone="muted">
              {a.label}
            </Text>
          </PressableBase>
        ))}
      </View>
    </View>
  );
}
