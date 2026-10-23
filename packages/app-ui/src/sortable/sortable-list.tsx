import { SortableGrid, type SortableGridProps } from './sortable-grid';

export type SortableListProps<T> = Omit<SortableGridProps<T>, 'columns'>;

/** 길게 눌러 순서를 바꾸는 세로 목록. 앱 최상단이 GestureHandlerRootView로 감싸져 있어야 한다 */
export function SortableList<T>({
  moveLabels = ['위로 이동', '아래로 이동'],
  ...props
}: SortableListProps<T>) {
  return <SortableGrid {...props} columns={1} moveLabels={moveLabels} />;
}
