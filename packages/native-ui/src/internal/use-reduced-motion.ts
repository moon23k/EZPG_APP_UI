import { useSyncExternalStore } from 'react';
import { AccessibilityInfo } from 'react-native';

// 앱 전체에서 구독 하나를 공유한다.
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

/** 기기의 '동작 줄이기' 설정 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => reduced);
}
