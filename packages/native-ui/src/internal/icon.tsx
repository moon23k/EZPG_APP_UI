import type { ReactNode } from 'react';

export type IconRenderProps = { color: string; size: number };

/** 아이콘 자리. 함수로 넘기면 컴포넌트의 글자색과 크기를 받는다. */
export type IconSlot = ReactNode | ((props: IconRenderProps) => ReactNode);

export function renderIcon(slot: IconSlot, props: IconRenderProps): ReactNode {
  return typeof slot === 'function' ? slot(props) : slot;
}
