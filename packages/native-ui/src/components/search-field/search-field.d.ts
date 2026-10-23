import { type FieldProps } from '../field/field';
export type SearchFieldProps = Omit<
  FieldProps,
  | 'leading'
  | 'trailing'
  | 'showCount'
  | 'value'
  | 'onChangeText'
  | 'defaultValue'
> & {
  value: string;
  onChangeText: (text: string) => void;
  /** 지우기 버튼의 접근성 라벨. 기본 '검색어 지우기' */
  clearLabel?: string;
};
export declare function SearchField({
  value,
  onChangeText,
  clearLabel,
  ...rest
}: SearchFieldProps): import('react').JSX.Element;
