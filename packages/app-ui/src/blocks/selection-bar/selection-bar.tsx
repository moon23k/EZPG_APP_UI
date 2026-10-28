import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { Text } from '../../components/text/text';
import { makeStyles } from '../../utils/styles';

export type SelectionBarProps = {
  count: number;
  max?: number;
  actionLabel: string;
  onAction: () => void;
  onClear: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    paddingVertical: t.space[3],
    paddingHorizontal: t.space[4],
    borderTopWidth: 1,
    borderTopColor: t.colors.border,
    backgroundColor: t.colors.background,
    boxShadow: t.shadow.md,
  },
  info: { flex: 1, gap: t.space[1] },
  count: { fontVariant: ['tabular-nums'] },
}));

export function SelectionBar({
  count,
  max,
  actionLabel,
  onAction,
  onClear,
  disabled,
  style,
}: SelectionBarProps) {
  const s = useStyles();
  const full = max !== undefined && count >= max;
  return (
    <View accessibilityRole="toolbar" style={[s.root, style]}>
      <View style={s.info} accessibilityLiveRegion="polite">
        <Text weight="bold" style={s.count} numberOfLines={1}>
          {count}건 선택
        </Text>
        {full ? (
          <Text variant="caption" tone="muted" numberOfLines={2}>
            최대 {max}건까지 선택할 수 있어요
          </Text>
        ) : null}
      </View>
      <Button variant="ghost" size="sm" onPress={onClear}>
        선택 해제
      </Button>
      <Button size="sm" onPress={onAction} disabled={disabled || count === 0}>
        {actionLabel}
      </Button>
    </View>
  );
}
