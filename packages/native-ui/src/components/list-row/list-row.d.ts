import { type IconSlot } from '../../internal/icon';
import { type PressableBaseProps } from '../../internal/pressable-base';
export type ListRowProps = Omit<
  PressableBaseProps,
  'children' | 'touchHeight'
> & {
  title: string;
  description?: string;
  leading?: IconSlot;
  /** 오른쪽 내용 (Switch, StatusBadge, 값 텍스트 등) */
  trailing?: IconSlot;
  /** 오른쪽 화살표. 기본은 onPress가 있을 때 true */
  chevron?: boolean;
  /** 제목 줄 수. 기본 1 */
  titleLines?: number;
};
export declare function ListRow({
  title,
  description,
  leading,
  trailing,
  chevron,
  titleLines,
  onPress,
  style,
  ...rest
}: ListRowProps): import('react').JSX.Element;
