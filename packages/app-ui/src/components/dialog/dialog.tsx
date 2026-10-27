import { Animated, Modal, Text, View } from 'react-native';
import { Backdrop, useOverlayTransition } from '../../internal/overlay';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Button } from '../button/button';
import { ToastHost } from '../toast/toast';

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  dismissible?: boolean;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, justifyContent: 'center', padding: t.space[6] },
  panel: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 360,
    paddingTop: 28,
    paddingHorizontal: t.space[5],
    paddingBottom: t.space[5],
    gap: t.space[5],
    borderRadius: 16,
    backgroundColor: t.colors.background,
    boxShadow: t.shadow.md,
  },
  title: {
    fontFamily: t.fontFamily,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: t.colors.foreground,
  },
  actions: { flexDirection: 'row', gap: t.space[2] },
  action: { flex: 1, borderRadius: t.radius.lg },
}));

export function Dialog({
  open,
  onOpenChange,
  title,
  onConfirm,
  confirmLabel = '확인',
  cancelLabel = '취소',
  danger = false,
  loading = false,
  dismissible = true,
}: DialogProps) {
  const t = useTheme();
  const s = useStyles();
  const { mounted, progress } = useOverlayTransition(open);

  const close = () => {
    if (dismissible && !loading) onOpenChange(false);
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
      <Backdrop progress={progress} onPress={close} label={cancelLabel} />
      <View pointerEvents="box-none" style={s.root}>
        <Animated.View
          accessibilityViewIsModal
          accessibilityRole="alert"
          style={[
            s.panel,
            {
              opacity: progress,
              transform: [
                {
                  scale: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.96, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            accessibilityRole="header"
            maxFontSizeMultiplier={t.maxFontScale}
            style={s.title}
          >
            {title}
          </Text>
          <View style={s.actions}>
            <Button
              variant="secondary"
              style={s.action}
              disabled={loading}
              onPress={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={danger ? 'danger' : 'solid'}
              style={s.action}
              loading={loading}
              onPress={onConfirm}
            >
              {confirmLabel}
            </Button>
          </View>
        </Animated.View>
      </View>
      <ToastHost />
    </Modal>
  );
}
