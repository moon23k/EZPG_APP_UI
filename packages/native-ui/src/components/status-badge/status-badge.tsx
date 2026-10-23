import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type StatusBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'destructive';

export type StatusBadgeProps = {
  /** 기본 'neutral' */
  tone?: StatusBadgeTone;
  children: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: t.space[2],
    paddingVertical: 2,
    borderRadius: t.radius.full,
  },
  label: {
    ...t.typography.caption,
    fontFamily: t.fontFamily,
    fontWeight: '600',
  },
}));

export function StatusBadge({
  tone = 'neutral',
  children,
  style,
}: StatusBadgeProps) {
  const t = useTheme();
  const s = useStyles();
  const [bg, fg] = {
    neutral: [t.colors.muted, t.colors.mutedForeground],
    info: [t.colors.info, t.colors.infoForeground],
    success: [t.colors.success, t.colors.successForeground],
    warning: [t.colors.warning, t.colors.warningForeground],
    destructive: [t.colors.destructive, t.colors.destructiveForeground],
  }[tone];
  return (
    <View style={[s.base, { backgroundColor: bg }, style]}>
      <Text
        numberOfLines={1}
        maxFontSizeMultiplier={t.maxFontScale}
        style={[s.label, { color: fg }]}
      >
        {children}
      </Text>
    </View>
  );
}
