import type { ReactNode } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Text,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Backdrop, useOverlayTransition } from '../../internal/overlay';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { ToastHost } from '../toast/toast';

export type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  bottomInset?: number;
  dismissible?: boolean;
  closeLabel?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, justifyContent: 'flex-end' },
  panel: {
    maxHeight: '90%',
    paddingTop: t.space[2],
    paddingHorizontal: t.space[4],
    gap: t.space[3],
    borderTopLeftRadius: t.radius.lg,
    borderTopRightRadius: t.radius.lg,
    backgroundColor: t.colors.background,
    boxShadow: t.shadow.md,
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
  const { mounted, progress } = useOverlayTransition(open);

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
        <Backdrop progress={progress} onPress={close} label={closeLabel} />
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
      <ToastHost />
    </Modal>
  );
}
