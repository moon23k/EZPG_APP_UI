import { useSyncExternalStore } from 'react';
import { AccessibilityInfo } from 'react-native';

let reduced = false;
let started = false;
const listeners = new Set<() => void>();

function set(value: boolean) {
  if (value === reduced) return;
  reduced = value;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  if (!started) {
    started = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then(set)
      .catch(() => {});
    AccessibilityInfo.addEventListener('reduceMotionChanged', set);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => reduced);
}
