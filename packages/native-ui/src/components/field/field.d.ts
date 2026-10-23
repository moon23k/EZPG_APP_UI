import { type ComponentRef, type Ref } from 'react';
import {
  TextInput,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { type IconSlot } from '../../internal/icon';
export type FieldProps = Omit<TextInputProps, 'style'> & {
  ref?: Ref<ComponentRef<typeof TextInput>>;
  label?: string;
  description?: string;
  /** 있으면 오류 상태로 표시하고 description 대신 보여준다 */
  error?: string;
  leading?: IconSlot;
  trailing?: IconSlot;
  /** maxLength와 함께 쓰면 글자 수를 표시한다 */
  showCount?: boolean;
  /** 바깥 컨테이너 스타일 */
  style?: StyleProp<ViewStyle>;
};
export declare function Field({
  label,
  description,
  error,
  leading,
  trailing,
  showCount,
  style,
  editable,
  onFocus,
  onBlur,
  onChangeText,
  ...input
}: FieldProps): import('react').JSX.Element;
