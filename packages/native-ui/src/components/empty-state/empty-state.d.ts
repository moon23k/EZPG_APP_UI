import { type StyleProp, type ViewStyle } from 'react-native';
import { type IconSlot } from '../../internal/icon';
export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: IconSlot;
  /** 예) { label: '다시 시도', onPress: refetch } */
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: StyleProp<ViewStyle>;
};
/** 비어 있거나 불러오지 못한 화면. 실패 화면은 action에 '다시 시도'를 넣는다 */
export declare function EmptyState({
  title,
  description,
  icon,
  action,
  style,
}: EmptyStateProps): import('react').JSX.Element;
