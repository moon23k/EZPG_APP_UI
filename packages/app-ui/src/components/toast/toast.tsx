import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  AccessibilityInfo,
  Animated,
  Platform,
  Text,
  View,
} from 'react-native';
import { useNativeDriver } from '../../internal/overlay';
import { PressableBase } from '../../internal/pressable-base';
import { useReducedMotion } from '../../internal/use-reduced-motion';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ToastTone = 'neutral' | 'success' | 'destructive';

export type ToastOptions = {
  message: string;
  /** 기본 'neutral' */
  tone?: ToastTone;
  /** ms. 기본 2500, action이 있으면 4000 */
  duration?: number;
  /** 메시지 오른쪽 텍스트 버튼 (예: 실행 취소). 누르면 Toast가 닫힌다 */
  action?: ToastAction;
};

export type ToastAction = { label: string; onPress: () => void };

type Current = {
  id: number;
  message: string;
  tone: ToastTone;
  action?: ToastAction;
};

/** Provider 하나가 가진 상태. show를 불러도 Provider 아래 화면은 다시 렌더링되지 않는다. */
function createToastStore() {
  let current: Current | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let seq = 0;
  let hosts: string[] = [];
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());

  const hide = () => {
    clearTimeout(timer);
    current = null;
    emit();
  };

  return {
    bottomInset: 0,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getCurrent: () => current,
    /** 가장 나중에 붙은 host(가장 위의 Modal)만 그린다 */
    getTopHost: () => hosts[hosts.length - 1],
    addHost(id: string) {
      hosts = [...hosts, id];
      emit();
      return () => {
        hosts = hosts.filter((h) => h !== id);
        emit();
      };
    },
    show({ message, tone = 'neutral', duration, action }: ToastOptions) {
      clearTimeout(timer);
      current = { id: ++seq, message, tone, action };
      timer = setTimeout(hide, duration ?? (action ? 4000 : 2500));
      emit();
      if (Platform.OS === 'ios')
        AccessibilityInfo.announceForAccessibility(message);
    },
    hide,
  };
}

type ToastStore = ReturnType<typeof createToastStore>;

const StoreContext = createContext<ToastStore | null>(null);

export type ToastProviderProps = {
  /** 하단 안전 영역 높이. 앱의 safe-area 값을 넘긴다 */
  bottomInset?: number;
  children: ReactNode;
};

export function ToastProvider({
  bottomInset = 0,
  children,
}: ToastProviderProps) {
  const [store] = useState(createToastStore);
  store.bottomInset = bottomInset;
  useEffect(() => () => store.hide(), [store]);
  return (
    <StoreContext.Provider value={store}>
      {children}
      <ToastHost />
    </StoreContext.Provider>
  );
}

export function useToast(): { show: (options: ToastOptions) => void } {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useToast must be used inside <ToastProvider>.');
  return store;
}

const useStyles = makeStyles((t) => ({
  layer: {
    position: 'absolute',
    left: t.space[4],
    right: t.space[4],
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 480,
    minHeight: 48,
    paddingHorizontal: t.space[4],
    paddingVertical: t.space[3],
    borderRadius: t.radius.md,
    boxShadow: t.shadow.md,
  },
  withAction: {
    alignSelf: 'stretch',
    paddingVertical: 0,
    paddingRight: t.space[2],
  },
  message: { ...t.typography.body, flexShrink: 1, fontFamily: t.fontFamily },
  messageFill: { flex: 1, fontSize: 14 },
  action: { paddingHorizontal: t.space[3], justifyContent: 'center' },
  actionLabel: {
    fontFamily: t.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
}));

/**
 * Toast를 그리는 자리. Provider가 하나 두고, Modal을 쓰는 컴포넌트(Sheet · Dialog)가
 * Modal 안에 하나씩 더 둔다. 가장 위의 host만 그린다.
 */
export function ToastHost() {
  const store = useContext(StoreContext);
  return store ? <ToastHostInner store={store} /> : null;
}

function ToastHostInner({ store }: { store: ToastStore }) {
  const t = useTheme();
  const s = useStyles();
  const id = useId();
  const reduced = useReducedMotion();
  const opacity = useRef(new Animated.Value(0)).current;
  const current = useSyncExternalStore(store.subscribe, store.getCurrent);
  const isTop = useSyncExternalStore(
    store.subscribe,
    () => store.getTopHost() === id
  );

  useEffect(() => store.addHost(id), [store, id]);

  useEffect(() => {
    if (!current) return;
    opacity.setValue(reduced ? 1 : 0);
    if (reduced) return;
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: t.motion.duration,
      useNativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [current, opacity, reduced, t.motion.duration]);

  if (!current || !isTop) return null;

  const [bg, fg] = {
    neutral: [t.colors.foreground, t.colors.background],
    success: [t.colors.success, t.colors.successForeground],
    destructive: [t.colors.destructive, t.colors.destructiveForeground],
  }[current.tone];
  // 어두운 바탕(light) 위에서는 밝은 파랑, 밝은 바탕(dark) 위에서는 진한 파랑
  const actionColor =
    current.tone !== 'neutral'
      ? fg
      : t.scheme === 'light'
        ? '#93c5fd'
        : '#1d4ed8';

  return (
    <View
      pointerEvents="box-none"
      style={[s.layer, { bottom: t.space[4] + store.bottomInset }]}
    >
      <Animated.View
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={[
          s.toast,
          !!current.action && s.withAction,
          { backgroundColor: bg, opacity },
        ]}
      >
        <Text
          maxFontSizeMultiplier={t.maxFontScale}
          style={[s.message, !!current.action && s.messageFill, { color: fg }]}
        >
          {current.message}
        </Text>
        {current.action ? (
          <PressableBase
            accessibilityRole="button"
            accessibilityLabel={current.action.label}
            touchHeight={44}
            style={s.action}
            onPress={() => {
              current.action?.onPress();
              store.hide();
            }}
          >
            <Text
              maxFontSizeMultiplier={t.maxFontScale}
              style={[s.actionLabel, { color: actionColor }]}
            >
              {current.action.label}
            </Text>
          </PressableBase>
        ) : null}
      </Animated.View>
    </View>
  );
}
