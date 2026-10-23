import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

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

const useNativeDriver = Platform.OS !== 'web';

const useStyles = makeStyles((t) => ({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  panel: {
    maxHeight: '90%',
    paddingTop: t.space[2],
    paddingHorizontal: t.space[4],
    gap: t.space[3],
    borderTopLeftRadius: t.radius.lg,
    borderTopRightRadius: t.radius.lg,
    backgroundColor: t.colors.background,
    boxShadow: t.shadow,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.border,
  },
  title: {
    ...t.typography.title,
    fontFamily: t.fontFamily,
    color: t.colors.foreground,
  },
}));

export function Sheet({
  open,
  onOpenChange,
  title,
  bottomInset = 0,
  dismissible = true,
  closeLabel = '닫기',
  children,
  style,
}: SheetProps) {
  const t = useTheme();
  const s = useStyles();
  const { height } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
    const animation = Animated.timing(progress, {
      toValue: open ? 1 : 0,
      duration: t.motion.duration,
      useNativeDriver,
    });
    animation.start(({ finished }) => {
      if (finished && !open) setMounted(false);
    });
    return () => animation.stop();
  }, [open, progress, t.motion.duration]);

  const close = () => {
    if (dismissible) onOpenChange(false);
  };

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={close}
    >
      <KeyboardAvoidingView behavior="padding" style={s.root}>
        <Animated.View
          style={[StyleSheet.absoluteFill, s.backdrop, { opacity: progress }]}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={close}
            accessibilityRole="button"
            accessibilityLabel={closeLabel}
          />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          style={[
            s.panel,
            { paddingBottom: t.space[4] + bottomInset },
            {
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
            style,
          ]}
        >
          <View style={s.handle} />
          {title ? (
            <Text
              accessibilityRole="header"
              maxFontSizeMultiplier={t.maxFontScale}
              style={s.title}
            >
              {title}
            </Text>
          ) : null}
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
