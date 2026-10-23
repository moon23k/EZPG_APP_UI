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
  /** 순서가 바뀐 새 배열 */
  onDataChange: (data: T[], change: SortableChange) => void;
  /** 기본 3 */
  columns?: number;
  /** 항목 사이 간격. 기본 space[2] */
  gap?: number;
  /** true면 SortableHandle을 눌러야만 끈다 */
  handle?: boolean;
  /** false면 끌 수 없다. 기본 true */
  enabled?: boolean;
  /** 항목의 접근성 라벨. 넘기면 앞으로 · 뒤로 이동 동작을 제공한다 */
  itemLabel?: (item: T) => string;
  /** 접근성 동작 이름. 기본 ['앞으로 이동', '뒤로 이동'] */
  moveLabels?: [string, string];
};

/**
 * 길게 눌러 순서를 바꾸는 격자. 앱 최상단이 GestureHandlerRootView로 감싸져 있어야 한다.
 * columns={1}이면 세로 목록이다.
 */
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

/** handle을 켠 SortableGrid · SortableList 안에서 끄는 손잡이 */
export function SortableHandle({ children }: { children: ReactNode }) {
  return <Sortable.Handle>{children}</Sortable.Handle>;
}
