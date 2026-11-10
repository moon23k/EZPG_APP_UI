import { View } from 'react-native';
import { Button } from '../../components/button/button';
import {
  CloseGlyph,
  EyeGlyph,
  MenuGlyph,
  ReturnGlyph,
} from '../../internal/glyphs';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type EditorBarProps = {
  topInset?: number;
  onClose: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onLayers?: () => void;
  onPreview?: () => void;
  layersOn?: boolean;
  previewOn?: boolean;
  action: {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
};

const useStyles = makeStyles((t) => ({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    paddingHorizontal: t.space[3],
    paddingBottom: t.space[2],
  },
  round: {
    width: t.space[10],
    height: t.space[10],
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[1],
    paddingHorizontal: t.space[1],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.surface,
  },
  fill: { flex: 1 },
  mirror: { transform: [{ scaleX: -1 }] },
  on: { backgroundColor: t.colors.primaryTint },
}));

export function EditorBar({
  topInset = 0,
  onClose,
  onUndo,
  onRedo,
  onLayers,
  onPreview,
  layersOn,
  previewOn,
  action,
}: EditorBarProps) {
  const t = useTheme();
  const s = useStyles();
  const tool = (
    key: string,
    icon: IconSlot,
    label: string,
    onPress?: () => void,
    on?: boolean,
    mirror?: boolean
  ) => (
    <PressableBase
      key={key}
      onPress={onPress}
      disabled={!onPress}
      accessibilityLabel={label}
      accessibilityState={{ disabled: !onPress, selected: !!on }}
      style={[s.round, on && s.on, mirror && s.mirror]}
    >
      {renderIcon(icon, {
        color: onPress ? t.colors.foreground : t.colors.input,
        size: t.iconSize.md,
      })}
    </PressableBase>
  );
  return (
    <View style={[s.bar, { paddingTop: topInset + t.space[2] }]}>
      <View style={[s.round, { backgroundColor: t.colors.surface }]}>
        {tool('close', CloseGlyph, '닫기', onClose)}
      </View>
      <View style={s.fill} />
      <View style={s.group}>
        {tool('undo', ReturnGlyph, '실행 취소', onUndo)}
        {tool('redo', ReturnGlyph, '다시 실행', onRedo, false, true)}
        {tool('layers', MenuGlyph, '레이어', onLayers, layersOn)}
        {tool('preview', EyeGlyph, '미리보기', onPreview, previewOn)}
      </View>
      <Button
        size="sm"
        onPress={action.onPress}
        disabled={action.disabled}
        loading={action.loading}
      >
        {action.label}
      </Button>
    </View>
  );
}
