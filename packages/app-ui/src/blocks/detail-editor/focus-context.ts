import { createContext } from 'react';

export type DetailFocusRect = { y: number; height: number };

export const DetailFocusContext = createContext<
  ((rect: DetailFocusRect | null) => void) | null
>(null);
