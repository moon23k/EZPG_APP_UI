import { View } from 'react-native';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';
import type { DetailLayout } from './detail-types';
import { Diagram } from './layout-picker';

export type StructureOption<T extends string> = {
  value: T;
  label: string;
  layouts: readonly DetailLayout[];
};

export type StructurePickerProps<T extends string> = {
  items: readonly StructureOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', gap: t.space[3] },
  item: { flex: 1, gap: t.space[2], alignItems: 'center' },
  page: {
    alignSelf: 'stretch',
    aspectRatio: 0.7,
    padding: t.space[2],
    gap: t.space[1],
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.muted,
  },
  on: { borderWidth: 2, borderColor: t.colors.primary },
  part: { flex: 1, gap: t.space[1] },
}));

export function StructurePicker<T extends string>({
  items,
  value,
  onValueChange,
}: StructurePickerProps<T>) {
  const s = useStyles();
  return (
    <View accessibilityRole="radiogroup" style={s.row}>
      {items.map((item) => {
        const on = item.value === value;
        return (
          <PressableBase
            key={item.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            accessibilityLabel={item.label}
            onPress={() => onValueChange(item.value)}
            style={s.item}
          >
            <View style={[s.page, on && s.on]}>
              {item.layouts.map((layout, index) => (
                <View key={`${layout}-${index}`} style={s.part}>
                  <Diagram layout={layout} />
                </View>
              ))}
            </View>
            <Text
              variant="caption"
              weight={on ? 'bold' : undefined}
              tone={on ? 'default' : 'muted'}
            >
              {item.label}
            </Text>
          </PressableBase>
        );
      })}
    </View>
  );
}
