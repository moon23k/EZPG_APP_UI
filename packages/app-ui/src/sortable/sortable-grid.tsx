import type { ReactNode } from 'react';
import { View } from 'react-native';
import Sortable from 'react-native-sortables';
import { useTheme } from '../theme/theme-provider';
import { moveItem } from './move';

export type SortableChange = { from: number; to: number };

export type SortableGridProps<T> = {
  data: readonly T[];
  keyExtractor: (item: T) => string;
  renderItem: (info: { item: T; index: number }) => ReactNode;
  onDataChange: (data: T[], change: SortableChange) => void;
  columns?: number;
  gap?: number;
  handle?: boolean;
  enabled?: boolean;
  itemLabel?: (item: T) => string;
  moveLabels?: [string, string];
};

export function SortableGrid<T>({
  data,
  keyExtractor,
  renderItem,
  onDataChange,
  columns = 3,
  gap,
  handle = false,
  enabled = true,
  itemLabel,
  moveLabels = ['앞으로 이동', '뒤로 이동'],
}: SortableGridProps<T>) {
  const t = useTheme();
  const spacing = gap ?? t.space[2];

  const move = (from: number, to: number) => {
    if (to < 0 || to >= data.length) return;
    onDataChange(moveItem(data, from, to), { from, to });
  };

  return (
    <Sortable.Grid
      data={[...data]}
      keyExtractor={keyExtractor}
      columns={columns}
      rowGap={spacing}
      columnGap={spacing}
      customHandle={handle}
      sortEnabled={enabled}
      activeItemScale={1.03}
      inactiveItemOpacity={1}
      onDragEnd={({ data: next, fromIndex, toIndex }) => {
        if (fromIndex !== toIndex)
          onDataChange(next, { from: fromIndex, to: toIndex });
      }}
      renderItem={({ item, index }) =>
        itemLabel ? (
          <View
            accessible
            accessibilityLabel={itemLabel(item)}
            accessibilityActions={[
              { name: 'decrement', label: moveLabels[0] },
              { name: 'increment', label: moveLabels[1] },
            ]}
            onAccessibilityAction={(e) =>
              move(
                index,
                e.nativeEvent.actionName === 'decrement' ? index - 1 : index + 1
              )
            }
          >
            {renderItem({ item, index })}
          </View>
        ) : (
          renderItem({ item, index })
        )
      }
    />
  );
}

export function SortableHandle({ children }: { children: ReactNode }) {
  return <Sortable.Handle>{children}</Sortable.Handle>;
}
