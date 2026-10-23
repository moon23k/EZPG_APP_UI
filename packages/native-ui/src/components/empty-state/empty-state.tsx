import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Button } from '../button/button';

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: IconSlot;
  /** 예) { label: '다시 시도', onPress: refetch } */
  action?: { label: string; onPress: () => void };
  style?: StyleProp<ViewStyle>;
};

const ICON_SIZE = 40;

const useStyles = makeStyles((t) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[2],
    padding: t.space[8],
  },
  title: {
    ...t.typography.bodyLg,
    fontFamily: t.fontFamily,
    fontWeight: '600',
    color: t.colors.foreground,
    textAlign: 'center',
  },
  description: {
    ...t.typography.body,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
    textAlign: 'center',
  },
  action: { marginTop: t.space[3] },
}));

/** 비어 있거나 불러오지 못한 화면. 실패 화면은 action에 '다시 시도'를 넣는다 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  style,
}: EmptyStateProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      {icon
        ? renderIcon(icon, { color: t.colors.mutedForeground, size: ICON_SIZE })
        : null}
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
      {action ? (
        <Button
          variant="outline"
          size="sm"
          style={s.action}
          onPress={action.onPress}
        >
          {action.label}
        </Button>
      ) : null}
    </View>
  );
}
