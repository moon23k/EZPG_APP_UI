import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { Text } from '../../components/text/text';
import type { IconSlot } from '../../internal/icon';
import { makeStyles } from '../../utils/styles';

export type SiteSummaryAction = {
  label: string;
  icon?: IconSlot;
  onPress: () => void;
};

export type SiteSummaryProps = {
  preview: ReactNode;
  overline?: string;
  title: string;
  caption?: string;
  actions?: readonly SiteSummaryAction[];
  style?: StyleProp<ViewStyle>;
};

const FRAME = 4;

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: t.space[4],
    paddingHorizontal: t.layout.screenX,
    paddingVertical: t.space[2],
  },
  frame: {
    width: t.space[16] + t.space[8],
    aspectRatio: 1 / 2,
    borderWidth: FRAME,
    borderColor: t.colors.foreground,
    borderRadius: t.radius.lg,
    overflow: 'hidden',
    backgroundColor: t.colors.background,
  },
  body: { flex: 1, gap: t.space[1], paddingTop: t.space[2] },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.space[2],
    paddingTop: t.space[2],
  },
}));

export function SiteSummary({
  preview,
  overline,
  title,
  caption,
  actions = [],
  style,
}: SiteSummaryProps) {
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      <View style={s.frame}>{preview}</View>
      <View style={s.body}>
        {overline ? (
          <Text variant="caption" tone="muted">
            {overline}
          </Text>
        ) : null}
        <Text variant="title" weight="bold" numberOfLines={2}>
          {title}
        </Text>
        {caption ? (
          <Text variant="caption" tone="muted" numberOfLines={2}>
            {caption}
          </Text>
        ) : null}
        {actions.length ? (
          <View style={s.actions}>
            {actions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                leftIcon={action.icon}
                onPress={action.onPress}
              >
                {action.label}
              </Button>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}
