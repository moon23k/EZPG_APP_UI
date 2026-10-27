import { SortableGrid, type SortableGridProps } from './sortable-grid';

export type SortableListProps<T> = Omit<SortableGridProps<T>, 'columns'>;

export function SortableList<T>({
  moveLabels = ['위로 이동', '아래로 이동'],
  ...props
}: SortableListProps<T>) {
  return <SortableGrid {...props} columns={1} moveLabels={moveLabels} />;
}
