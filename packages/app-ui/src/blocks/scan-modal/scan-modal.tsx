import type { ReactNode } from 'react';
import { Modal, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { CloseGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ScanModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  topInset?: number;
  bottomInset?: number;
  children: (frame: { style: StyleProp<ViewStyle> }) => ReactNode;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: t.layout.screenX,
    paddingVertical: t.space[3],
  },
  frame: { flex: 1 },
}));

export function ScanModal({
  open,
  onClose,
  title,
  topInset = 0,
  bottomInset = 0,
  children,
}: ScanModalProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <Modal visible={open} animationType="slide" onRequestClose={onClose}>
      <View
        style={[s.root, { paddingTop: topInset, paddingBottom: bottomInset }]}
      >
        <View style={s.head}>
          <Text variant="title" weight="bold" accessibilityRole="header">
            {title}
          </Text>
          <PressableBase
            accessibilityRole="button"
            accessibilityLabel="닫기"
            onPress={onClose}
          >
            <CloseGlyph color={t.colors.foreground} size={t.iconSize.md} />
          </PressableBase>
        </View>
        {children({ style: s.frame })}
      </View>
    </Modal>
  );
}
