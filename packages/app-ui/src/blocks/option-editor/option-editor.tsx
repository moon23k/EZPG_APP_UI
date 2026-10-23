import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { formatPrice } from '../../components/price/price';
import { Switch } from '../../components/switch/switch';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';
import { SortableHandle } from '../../sortable/sortable-grid';
import { SortableList } from '../../sortable/sortable-list';

export type ProductOption = {
  id: string;
  name: string;
  /** 기본 가격에 더하는 금액 */
  priceDelta: number;
  /** false면 판매 중지(품절) */
  active: boolean;
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
  list: {
    borderWidth: 1,
    borderColor: t.colors.border,
    borderRadius: t.radius.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    minHeight: Math.max(t.minTouchSize, 56),
    paddingHorizontal: t.space[4],
    backgroundColor: t.colors.background,
  },
  separator: { borderTopWidth: 1, borderTopColor: t.colors.border },
  pressed: { backgroundColor: t.colors.muted },
  name: { flex: 1 },
  price: { fontVariant: ['tabular-nums'] },
  grip: {
    width: 20,
    height: t.minTouchSize,
    justifyContent: 'center',
    gap: 4,
  },
  bar: {
    height: 2,
    marginHorizontal: 3,
    borderRadius: 1,
    backgroundColor: t.colors.mutedForeground,
  },
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
      <View style={s.list}>
        <SortableList
          data={options}
          keyExtractor={(o) => o.id}
          onDataChange={onOptionsChange}
          handle
          gap={0}
          itemLabel={(o) => o.name}
          renderItem={({ item, index }) => {
            const tone = item.active ? 'default' : 'muted';
            const rowStyle = [s.row, index > 0 && s.separator];
            const content = (
              <>
                <SortableHandle>
                  <View
                    style={s.grip}
                    accessibilityRole="image"
                    accessibilityLabel="순서 변경"
                  >
                    <View style={s.bar} />
                    <View style={s.bar} />
                  </View>
                </SortableHandle>
                <Text tone={tone} style={s.name} numberOfLines={1}>
                  {item.name}
                </Text>
                {item.priceDelta ? (
                  <Text tone={tone} style={s.price}>
                    +{formatPrice(item.priceDelta)}
                  </Text>
                ) : null}
                <Switch
                  value={item.active}
                  onValueChange={(v) => setActive(item.id, v)}
                  accessibilityLabel={`${item.name} 판매`}
                />
              </>
            );
            return onEdit ? (
              <PressableBase
                onPress={() => onEdit(item.id)}
                pressedStyle={s.pressed}
                style={rowStyle}
              >
                {content}
              </PressableBase>
            ) : (
              <View style={rowStyle}>{content}</View>
            );
          }}
        />
      </View>
      {onAdd ? (
        <Button variant="outline" onPress={onAdd}>
          옵션 추가
        </Button>
      ) : null}
    </View>
  );
}
