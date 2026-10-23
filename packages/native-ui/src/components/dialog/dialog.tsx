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

const useStyles = makeStyles((t) => ({
  root: { flex: 1, justifyContent: 'center', padding: t.space[6] },
  panel: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
    padding: t.space[5],
    gap: t.space[2],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.background,
    boxShadow: t.shadow.md,
  },
  title: {
    ...t.typography.title,
    fontFamily: t.fontFamily,
    color: t.colors.foreground,
  },
  description: {
    ...t.typography.body,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
  },
  actions: { flexDirection: 'row', gap: t.space[2], marginTop: t.space[4] },
  action: { flex: 1 },
}));

/** 확인 · 취소를 묻는 대화상자 */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = '확인',
  cancelLabel = '취소',
  destructive = false,
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
          {description ? (
            <Text maxFontSizeMultiplier={t.maxFontScale} style={s.description}>
              {description}
            </Text>
          ) : null}
          <View style={s.actions}>
            <Button
              variant="outline"
              style={s.action}
              disabled={loading}
              onPress={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={destructive ? 'destructive' : 'solid'}
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
