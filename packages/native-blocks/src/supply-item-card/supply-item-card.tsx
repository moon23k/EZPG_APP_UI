import {
  Button,
  ChipGroup,
  formatPrice,
  makeStyles,
  Photo,
  PressableBase,
  Text,
} from '@ezpg/native-ui';
import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Card } from '../internal/card';

/** 예) { id: 'm', label: '중 20×25cm' } */
export type SupplyOption = { id: string; label: string };

/** 묶음 수량과 그 가격 */
export type SupplyQuantity = { quantity: number; price: number };

export type SupplyItemCardProps = {
  name: string;
  image: ImageSourcePropType;
  /** 2개 이상이면 칩으로 고른다 */
  options?: readonly SupplyOption[];
  selectedOptionId?: string | null;
  onSelectOption?: (id: string) => void;
  /** 선택한 옵션의 수량별 가격 */
  quantities: readonly SupplyQuantity[];
  selectedQuantity: number | null;
  onSelectQuantity: (quantity: number) => void;
  /** 기본 '장' */
  unit?: string;
  onAdd?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  card: { gap: t.space[4] },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[3] },
  image: { width: 64 },
  name: { flex: 1 },
  group: {
    borderWidth: 1,
    borderColor: t.colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    minHeight: 52,
    paddingHorizontal: 14,
  },
  divided: { borderTopWidth: 1, borderTopColor: t.colors.border },
  pressed: { backgroundColor: t.colors.muted },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: t.colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: t.colors.primary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: t.colors.primary,
  },
  quantity: { flex: 1 },
}));

/** 로고를 넣어 주문하는 공급 품목. 사이즈 · 수량을 고르고 담는다 */
export function SupplyItemCard({
  name,
  image,
  options = [],
  selectedOptionId = null,
  onSelectOption,
  quantities,
  selectedQuantity,
  onSelectQuantity,
  unit = '장',
  onAdd,
  style,
}: SupplyItemCardProps) {
  const s = useStyles();
  const selected = quantities.find((q) => q.quantity === selectedQuantity);
  return (
    <Card style={[s.card, style]}>
      <View style={s.head}>
        <View style={s.image}>
          <Photo source={image} />
        </View>
        <Text variant="bodyLg" weight="bold" style={s.name}>
          {name}
        </Text>
      </View>
      {options.length > 1 ? (
        <ChipGroup
          items={options.map((o) => ({ value: o.id, label: o.label }))}
          value={selectedOptionId}
          onValueChange={(id) => id && onSelectOption?.(id)}
        />
      ) : null}
      <View accessibilityRole="radiogroup" style={s.group}>
        {quantities.map((q, i) => {
          const on = q.quantity === selectedQuantity;
          const qty = `${formatPrice(q.quantity, '')}${unit}`;
          return (
            <PressableBase
              key={q.quantity}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              accessibilityLabel={`${qty} ${formatPrice(q.price)}`}
              pressedStyle={s.pressed}
              onPress={() => onSelectQuantity(q.quantity)}
              style={[s.row, i > 0 && s.divided]}
            >
              <View style={[s.radio, on && s.radioOn]}>
                {on ? <View style={s.radioDot} /> : null}
              </View>
              <Text weight={on ? 'semibold' : undefined} style={s.quantity}>
                {qty}
              </Text>
              <Text weight={on ? 'semibold' : undefined}>
                {formatPrice(q.price)}
              </Text>
            </PressableBase>
          );
        })}
      </View>
      {onAdd ? (
        <Button size="lg" disabled={!selected} onPress={onAdd}>
          {selected ? `${formatPrice(selected.price)} 담기` : '담기'}
        </Button>
      ) : null}
    </Card>
  );
}
