import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../components/text/text';
import { PressableBase } from '../internal/pressable-base';
import { BottomBar, type TemplateAction } from '../templates/parts';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';

export type AdjustTemplateProps = {
  preview: ReactNode;
  label?: string;
  compareLabel?: string;
  onCompareChange?: (comparing: boolean) => void;
  controls: ReactNode;
  primaryAction: TemplateAction;
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  stage: {
    flex: 1,
    minHeight: 0,
    backgroundColor: t.colors.muted,
    overflow: 'hidden',
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: t.space[2],
    paddingHorizontal: t.space[2],
    paddingVertical: t.space[1],
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.foreground,
    opacity: 0.72,
  },
  compare: {
    position: 'absolute',
    top: t.space[2],
    right: t.space[3],
    paddingHorizontal: t.space[3],
    paddingVertical: t.space[1],
    borderRadius: t.radius.full,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  controls: { paddingTop: t.layout.groupGap, gap: t.layout.groupGap },
}));

export function AdjustTemplate({
  preview,
  label,
  compareLabel = '원래와 비교',
  onCompareChange,
  controls,
  primaryAction,
  bottomInset = 0,
}: AdjustTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      <View style={s.stage}>
        {preview}
        {label ? (
          <View style={s.label} pointerEvents="none">
            <Text variant="caption" style={{ color: t.colors.background }}>
              {label}
            </Text>
          </View>
        ) : null}
        {onCompareChange ? (
          <PressableBase
            onPressIn={() => onCompareChange(true)}
            onPressOut={() => onCompareChange(false)}
            accessibilityRole="button"
            accessibilityLabel={compareLabel}
            style={s.compare}
          >
            <Text variant="caption">{compareLabel}</Text>
          </PressableBase>
        ) : null}
      </View>
      <View style={s.controls}>{controls}</View>
      <BottomBar primaryAction={primaryAction} bottomInset={bottomInset} />
    </View>
  );
}
