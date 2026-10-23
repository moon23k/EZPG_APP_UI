export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** 확인을 눌렀을 때. 닫는 것은 부모가 onOpenChange로 정한다 */
  onConfirm: () => void;
  /** 기본 '확인' */
  confirmLabel?: string;
  /** 기본 '취소' */
  cancelLabel?: string;
  /** 되돌릴 수 없는 작업이면 확인 버튼을 destructive로 */
  destructive?: boolean;
  /** 확인 버튼을 로딩 상태로 */
  loading?: boolean;
  /** false면 배경 · 뒤로가기로 닫히지 않는다. 기본 true */
  dismissible?: boolean;
};
/** 확인 · 취소를 묻는 대화상자 */
export declare function Dialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel,
  cancelLabel,
  destructive,
  loading,
  dismissible,
}: DialogProps): import('react').JSX.Element;
