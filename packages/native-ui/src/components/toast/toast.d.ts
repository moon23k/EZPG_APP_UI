import { type ReactNode } from 'react';
export type ToastTone = 'neutral' | 'success' | 'destructive';
export type ToastOptions = {
  message: string;
  /** 기본 'neutral' */
  tone?: ToastTone;
  /** ms. 기본 2500 */
  duration?: number;
};
export type ToastProviderProps = {
  /** 하단 안전 영역 높이. 앱의 safe-area 값을 넘긴다 */
  bottomInset?: number;
  children: ReactNode;
};
export declare function ToastProvider({
  bottomInset,
  children,
}: ToastProviderProps): import('react').JSX.Element;
export declare function useToast(): {
  show: (options: ToastOptions) => void;
};
/**
 * Toast를 그리는 자리. Provider가 하나 두고, Modal을 쓰는 컴포넌트(Sheet · Dialog)가
 * Modal 안에 하나씩 더 둔다. 가장 위의 host만 그린다.
 */
export declare function ToastHost(): import('react').JSX.Element | null;
