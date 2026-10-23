import {
  Button,
  formatPrice,
  ListRow,
  makeStyles,
  Switch,
  Text,
} from '@ezpg/native-ui';
import { SortableHandle, SortableList } from '@ezpg/native-ui/sortable';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { StockBadge } from '../stock-badge/stock-badge';

export type ProductOption = {
  id: string;
  name: string;
  /** 기본 가격에 더하는 금액 */
  priceDelta: number;
  /** null이면 재고 관리 안 함 */
  stock: number | null;
  active: boolean;
  /** 주문이 있으면 삭제 대신 비활성만 가능 */
  hasOrders?: boolean;
};

export type OptionEditorProps = {
  options: readonly ProductOption[];
  onOptionsChange: (options: ProductOption[]) => void;
  /** 옵션 눌러 수정 (앱에서 Sheet 등으로) */
  onEdit?: (id: string) => void;
  onAdd?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  grip: { paddingHorizontal: t.space[1] },
}));

/** 상품 옵션(1단) 목록. 손잡이로 순서를 바꾼다. 앱 최상단이 GestureHandlerRootView로 감싸져 있어야 한다 */
export function OptionEditor({
  options,
  onOptionsChange,
  onEdit,
  onAdd,
  style,
}: OptionEditorProps) {
  const s = useStyles();
  const setActive = (id: string, active: boolean) =>
    onOptionsChange(options.map((o) => (o.id === id ? { ...o, active } : o)));
  return (
    <View style={[s.root, style]}>
      <SortableList
        data={options}
        keyExtractor={(o) => o.id}
        onDataChange={onOptionsChange}
        handle
        gap={0}
        itemLabel={(o) => o.name}
        renderItem={({ item }) => (
          <ListRow
            title={item.name}
            description={[
              item.priceDelta
                ? `+${formatPrice(item.priceDelta)}`
                : '추가 금액 없음',
              item.hasOrders ? '주문 있음 · 삭제 대신 판매 중지' : null,
            ]
              .filter(Boolean)
              .join(' · ')}
            onPress={onEdit ? () => onEdit(item.id) : undefined}
            chevron={false}
            leading={
              <SortableHandle>
                <Text variant="title" tone="muted" style={s.grip}>
                  ≡
                </Text>
              </SortableHandle>
            }
            trailing={
              <View style={s.trailing}>
                <StockBadge stock={item.stock} />
                <Switch
                  value={item.active}
                  onValueChange={(v) => setActive(item.id, v)}
                  accessibilityLabel={`${item.name} 판매`}
                />
              </View>
            }
          />
        )}
      />
      {onAdd ? (
        <Button variant="outline" onPress={onAdd}>
          옵션 추가
        </Button>
      ) : null}
    </View>
  );
}
