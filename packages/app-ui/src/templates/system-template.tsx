import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../components/text/text';
import { renderIcon, type IconSlot } from '../internal/icon';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import { BottomBar, type TemplateAction } from './parts';

export type SystemTemplateProps = {
  icon?: IconSlot;
  asset?: ReactNode;
  title: string;
  note?: string;
  primaryAction?: TemplateAction;
  secondaryAction?: TemplateAction;
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
  note: {
    textAlign: 'center',
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.layout.footerTop,
  },
  actions: {
    gap: t.layout.itemGap,
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.layout.footerTop,
  },
}));

export function SystemTemplate({
  icon,
  asset,
  title,
  note,
  primaryAction,
  secondaryAction,
  actions,
  bottomInset = 0,
}: SystemTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      <View style={s.center}>
        {asset}
        {!asset && icon
          ? renderIcon(icon, {
              color: t.colors.foreground,
              size: t.controlSize.lg,
            })
          : null}
        <Text variant="screenTitle" accessibilityRole="header" style={s.title}>
          {title}
        </Text>
      </View>
      {note ? (
        <Text
          variant="label"
          tone="muted"
          style={[
            s.note,
            !actions &&
              !primaryAction && {
                paddingBottom: t.layout.footerBottom + bottomInset,
              },
          ]}
        >
          {note}
        </Text>
      ) : null}
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
        <BottomBar
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          bottomInset={bottomInset}
        />
      ) : null}
    </View>
  );
}
