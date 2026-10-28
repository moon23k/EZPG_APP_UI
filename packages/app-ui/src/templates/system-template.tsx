import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../components/text/text';
import { renderIcon, type IconSlot } from '../internal/icon';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import { BottomBar, type TemplateAction } from './parts';

export type SystemTemplateProps = {
  icon?: IconSlot;
  title: string;
  primaryAction?: TemplateAction;
  actions?: ReactNode;
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.layout.titleGap,
    paddingHorizontal: t.layout.screenX,
  },
  title: { textAlign: 'center' },
  actions: {
    gap: t.layout.itemGap,
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.layout.footerTop,
  },
}));

export function SystemTemplate({
  icon,
  title,
  primaryAction,
  actions,
  bottomInset = 0,
}: SystemTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      <View style={s.center}>
        {icon
          ? renderIcon(icon, {
              color: t.colors.foreground,
              size: t.controlSize.lg,
            })
          : null}
        <Text variant="screenTitle" accessibilityRole="header" style={s.title}>
          {title}
        </Text>
      </View>
      {actions ? (
        <View
          style={[
            s.actions,
            { paddingBottom: t.layout.footerBottom + bottomInset },
          ]}
        >
          {actions}
        </View>
      ) : primaryAction ? (
        <BottomBar primaryAction={primaryAction} bottomInset={bottomInset} />
      ) : null}
    </View>
  );
}
