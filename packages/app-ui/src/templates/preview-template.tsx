import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../components/text/text';
import { renderIcon, type IconSlot } from '../internal/icon';
import { PressableBase } from '../internal/pressable-base';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import { BottomBar, type TemplateAction } from './parts';

export type PreviewTemplateAction = {
  key: string;
  label: string;
  icon: IconSlot;
  onPress: () => void;
};

export type PreviewTemplateProps = {
  preview: ReactNode;
  head?: ReactNode;
  actions: readonly PreviewTemplateAction[];
  primaryAction?: TemplateAction;
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  stage: {
    flex: 1,
    margin: t.layout.groupGap,
    overflow: 'hidden',
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.surface,
  },
  actions: {
    flexDirection: 'row',
    gap: t.layout.itemGap,
    paddingHorizontal: t.layout.groupGap,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    gap: t.space[1],
    paddingVertical: t.space[3],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.surface,
  },
  pressed: { backgroundColor: t.colors.border },
}));

export function PreviewTemplate({
  preview,
  head,
  actions,
  primaryAction,
  bottomInset = 0,
}: PreviewTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      {head}
      <View style={s.stage}>{preview}</View>
      <View style={s.actions}>
        {actions.map((item) => (
          <PressableBase
            key={item.key}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={item.onPress}
            pressedStyle={s.pressed}
            style={s.action}
          >
            {renderIcon(item.icon, {
              color: t.colors.primary,
              size: t.iconSize.md,
            })}
            <Text variant="caption" numberOfLines={1}>
              {item.label}
            </Text>
          </PressableBase>
        ))}
      </View>
      {primaryAction ? (
        <BottomBar primaryAction={primaryAction} bottomInset={bottomInset} />
      ) : null}
    </View>
  );
}
