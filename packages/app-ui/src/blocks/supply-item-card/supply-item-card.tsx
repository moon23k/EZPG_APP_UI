import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Button } from '../../components/button/button';
import { ChipGroup } from '../../components/chip-group/chip-group';
import { Photo } from '../../components/photo/photo';
import { formatPrice } from '../../components/price/price';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';
import { Card } from '../internal/card';

export type SupplyOption = { id: string; label: string };

export type SupplyQuantity = { quantity: number; price: number };

export type SupplyItemCardProps = {
  name: string;
  image: ImageSourcePropType;
  options?: readonly SupplyOption[];
  selectedOptionId?: string | null;
  onSelectOption?: (id: string) => void;
  quantities: readonly SupplyQuantity[];
  selectedQuantity: number | null;
  onSelectQuantity: (quantity: number) => void;
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
    borderRadius: t.radius.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    minHeight: t.controlSize.lg,
    paddingHorizontal: t.space[4],
  },
  divided: { borderTopWidth: 1, borderTopColor: t.colors.border },
  pressed: { backgroundColor: t.colors.muted },
  radio: {
    width: 20,
    height: 20,
    borderRadius: t.radius.full,
    borderWidth: 2,
    borderColor: t.colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: t.colors.primary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
  },
  quantity: { flex: 1 },
}));

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
