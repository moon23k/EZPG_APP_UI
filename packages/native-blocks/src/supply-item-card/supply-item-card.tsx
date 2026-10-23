import {
  ChipGroup,
  formatPrice,
  makeStyles,
  Photo,
  Price,
  Text,
} from '@ezpg/native-ui';
import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Card } from '../internal/card';

export type SupplyOption = { id: string; label: string; unitPrice: number };

export type SupplyItemCardProps = {
  name: string;
  /** 예) '로고 1도 인쇄 · 최소 100장' */
  description?: string;
  image: ImageSourcePropType;
  options: readonly SupplyOption[];
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  /** 지금 장바구니 합계. 넘기면 무료배송까지 남은 금액을 보여준다 */
  cartSubtotal?: number;
  /** 기본 50000 */
  freeShippingThreshold?: number;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  head: { flexDirection: 'row', gap: t.space[3] },
  image: { width: 88 },
  body: { flex: 1, gap: t.space[1] },
}));

/** 로고를 넣어 주문하는 공급 품목 */
export function SupplyItemCard({
  name,
  description,
  image,
  options,
  selectedOptionId,
  onSelectOption,
  cartSubtotal,
  freeShippingThreshold = 50000,
  style,
}: SupplyItemCardProps) {
  const s = useStyles();
  const selected = options.find((o) => o.id === selectedOptionId) ?? options[0];
  const remaining =
    cartSubtotal !== undefined
      ? freeShippingThreshold - cartSubtotal
      : undefined;
  return (
    <Card style={style}>
      <View style={s.head}>
        <View style={s.image}>
          <Photo source={image} />
        </View>
        <View style={s.body}>
          <Text variant="bodyLg" weight="semibold">
            {name}
          </Text>
          {description ? (
            <Text variant="caption" tone="muted">
              {description}
            </Text>
          ) : null}
          {selected ? (
            <Price value={selected.unitPrice} unit="원 / 개" />
          ) : null}
        </View>
      </View>
      {options.length > 1 ? (
        <ChipGroup
          items={options.map((o) => ({ value: o.id, label: o.label }))}
          value={selectedOptionId}
          onValueChange={(id) => id && onSelectOption(id)}
        />
      ) : null}
      {remaining !== undefined ? (
        <Text variant="caption" tone={remaining > 0 ? 'muted' : 'success'}>
          {remaining > 0
            ? `${formatPrice(remaining)} 더 담으면 무료배송`
            : '무료배송 조건을 채웠어요'}
        </Text>
      ) : null}
    </Card>
  );
}
