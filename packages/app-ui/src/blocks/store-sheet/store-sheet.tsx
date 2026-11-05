import { View } from 'react-native';
import { StoreMark } from '../../components/page-header/store-header';
import { Sheet } from '../../components/sheet/sheet';
import { Text } from '../../components/text/text';
import { CheckGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type StoreSheetItem = {
  value: string;
  name: string;
  description?: string;
};

export type StoreSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  stores: readonly StoreSheetItem[];
  value: string | null;
  onValueChange: (value: string) => void;
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  list: { marginHorizontal: -t.space[4] },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    minHeight: t.listRow.twoLine,
    paddingHorizontal: t.space[4],
    paddingVertical: t.space[2],
  },
  pressed: { backgroundColor: t.colors.muted },
  body: { flex: 1, gap: t.space[1] },
}));

export function StoreSheet({
  open,
  onOpenChange,
  title = '스토어 전환',
  stores,
  value,
  onValueChange,
  bottomInset,
}: StoreSheetProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      bottomInset={bottomInset}
    >
      <View style={s.list} accessibilityRole="radiogroup">
        {stores.map((store) => {
          const on = store.value === value;
          return (
            <PressableBase
              key={store.value}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              accessibilityLabel={store.name}
              onPress={() => {
                onOpenChange(false);
                if (!on) onValueChange(store.value);
              }}
              style={s.row}
              pressedStyle={s.pressed}
            >
              <StoreMark name={store.name} size="lg" />
              <View style={s.body}>
                <Text variant="bodyLg" weight="bold" numberOfLines={1}>
                  {store.name}
                </Text>
                {store.description ? (
                  <Text variant="label" tone="muted" numberOfLines={1}>
                    {store.description}
                  </Text>
                ) : null}
              </View>
              {on ? (
                <CheckGlyph color={t.colors.primary} size={t.iconSize.md} />
              ) : null}
            </PressableBase>
          );
        })}
      </View>
    </Sheet>
  );
}
