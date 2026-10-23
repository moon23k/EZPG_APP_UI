import type { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  /** 하단 안전 영역 높이. 앱의 safe-area 값을 넘긴다 */
  bottomInset?: number;
  /** false면 배경을 눌러도 닫히지 않는다. 기본 true */
  dismissible?: boolean;
  /** 배경 닫기 버튼의 접근성 라벨. 기본 '닫기' */
  closeLabel?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};
export declare function Sheet({
  open,
  onOpenChange,
  title,
  bottomInset,
  dismissible,
  closeLabel,
  children,
  style,
}: SheetProps): import('react').JSX.Element;
