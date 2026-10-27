import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Button } from '../../components/button/button';
import { Photo } from '../../components/photo/photo';
import { formatPrice } from '../../components/price/price';
import { Text } from '../../components/text/text';
import { CloseGlyph, PlusGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type SampleProduct = {
  name: string;
  price: number;
  image?: ImageSourcePropType;
};

export type ProductListEmptyProps = {
  onAdd: () => void;
  addLabel?: string;
  sample?: SampleProduct;
  onEditSample?: () => void;
  onDismissSample?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.space[3],
    padding: t.space[4],
  },
  tile: {
    width: '47%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[3],
    borderRadius: t.radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: t.colors.mutedForeground,
    backgroundColor: t.colors.background,
  },
  pressed: { backgroundColor: t.colors.muted },
  card: {
    margin: t.space[4],
    overflow: 'hidden',
    borderRadius: t.radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: t.colors.mutedForeground,
  },
  media: { height: 180, backgroundColor: t.colors.muted },
  badge: {
    position: 'absolute',
    top: t.space[3],
    left: t.space[3],
    paddingHorizontal: 10,
    paddingVertical: t.space[1],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.foreground,
  },
  badgeLabel: { color: t.colors.background, fontSize: 14 },
  body: { gap: t.space[1], padding: t.space[4] },
  actions: { flexDirection: 'row', gap: t.space[2], marginTop: t.space[3] },
  edit: { flex: 1, height: 48 },
  dismiss: { width: 48, height: 48, paddingHorizontal: 0 },
}));

export function ProductListEmpty({
  onAdd,
  addLabel = '첫 상품 등록',
  sample,
  onEditSample,
  onDismissSample,
  style,
}: ProductListEmptyProps) {
  const t = useTheme();
  const s = useStyles();

  if (sample) {
    return (
      <View
        style={[s.card, style]}
        accessibilityLabel={`예시 상품, ${sample.name}, 손님에게 안 보여요`}
      >
        <View style={s.media}>
          {sample.image ? (
            <Photo source={sample.image} radius={0} style={s.media} />
          ) : null}
          <View style={s.badge}>
            <Text variant="caption" weight="semibold" style={s.badgeLabel}>
              예시 · 손님에게 안 보여요
            </Text>
          </View>
        </View>
        <View style={s.body}>
          <Text weight="semibold">{sample.name}</Text>
          <Text weight="bold">{formatPrice(sample.price)}</Text>
          <View style={s.actions}>
            <Button style={s.edit} onPress={onEditSample ?? onAdd}>
              내 상품으로 수정
            </Button>
            {onDismissSample ? (
              <Button
                variant="outline"
                accessibilityLabel="예시 지우고 새로 등록"
                style={s.dismiss}
                onPress={onDismissSample}
              >
                <CloseGlyph color={t.colors.foreground} size={t.iconSize.sm} />
              </Button>
            ) : null}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[s.grid, style]}>
      <PressableBase
        accessibilityLabel={`등록된 상품이 없어요. ${addLabel}`}
        pressedStyle={s.pressed}
        onPress={onAdd}
        style={s.tile}
      >
        <PlusGlyph color={t.colors.foreground} size={40} />
        <Text weight="semibold">{addLabel}</Text>
      </PressableBase>
    </View>
  );
}
