import type { ReactNode } from 'react';

export type IconRenderProps = { color: string; size: number };

export type IconSlot = ReactNode | ((props: IconRenderProps) => ReactNode);

export function renderIcon(slot: IconSlot, props: IconRenderProps): ReactNode {
  return typeof slot === 'function' ? slot(props) : slot;
}
