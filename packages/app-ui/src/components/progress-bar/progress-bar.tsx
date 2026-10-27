import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ProgressBarProps = {
  done: number;
  total: number;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  head: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: t.space[2],
  },
  label: {
    ...t.typography.body,
    flex: 1,
    fontFamily: t.fontFamily,
    fontWeight: '600',
    color: t.colors.foreground,
  },
  count: {
    ...t.typography.body,
    marginLeft: 'auto',
    fontFamily: t.fontFamily,
    fontVariant: ['tabular-nums'],
    color: t.colors.mutedForeground,
  },
  strong: { fontWeight: '700', color: t.colors.foreground },
  track: {
    height: 6,
    borderRadius: t.radius.full,
    overflow: 'hidden',
    backgroundColor: t.colors.muted,
  },
  fill: {
    height: '100%',
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
  },
}));

export function ProgressBar({ done, total, label, style }: ProgressBarProps) {
  const t = useTheme();
  const s = useStyles();
  const max = Math.max(0, total);
  const now = Math.min(Math.max(0, done), max);
  const ratio = max > 0 ? now / max : 0;
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`${label ? `${label}, ` : ''}${max}건 중 ${now}건`}
      accessibilityValue={{ min: 0, max, now }}
      style={[s.root, style]}
    >
      <View style={s.head}>
        {label ? (
          <Text
            numberOfLines={2}
            maxFontSizeMultiplier={t.maxFontScale}
            style={s.label}
          >
            {label}
          </Text>
        ) : null}
        <Text maxFontSizeMultiplier={t.maxFontScale} style={s.count}>
          <Text style={s.strong}>{now}</Text>/{max}
        </Text>
      </View>
      <View style={s.track}>
        <View style={[s.fill, { width: `${ratio * 100}%` }]} />
      </View>
    </View>
  );
}
