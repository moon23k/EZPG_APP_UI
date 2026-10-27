import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { AlertGlyph, SearchGlyph } from '../../internal/glyphs';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Button } from '../button/button';

export type EmptyStateVariant = 'default' | 'search' | 'error' | 'section';

export type EmptyStateProps = {
  title: string;
  variant?: EmptyStateVariant;
  icon?: IconSlot;
  action?: { label: string; onPress: () => void; icon?: IconSlot };
  style?: StyleProp<ViewStyle>;
};

const ICON = { screen: 40, section: 20 };

const useStyles = makeStyles((t) => ({
  screen: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: t.space[8],
    paddingTop: t.space[8],
    paddingBottom: t.space[8] + t.space[12] * 2,
  },
  title: {
    ...t.typography.bodyLg,
    marginTop: t.space[4],
    fontFamily: t.fontFamily,
    fontWeight: '600',
    color: t.colors.foreground,
    textAlign: 'center',
  },
  button: { marginTop: t.space[5], height: 48, paddingHorizontal: t.space[5] },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    minHeight: 52,
    paddingLeft: t.space[4],
    paddingRight: t.space[1],
  },
  sectionTitle: {
    ...t.typography.body,
    flex: 1,
    fontSize: 14,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
  },
  link: {
    minHeight: t.minTouchSize,
    justifyContent: 'center',
    paddingHorizontal: t.space[3],
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: t.fontFamily,
    color: t.colors.foreground,
  },
}));

export function EmptyState({
  title,
  variant = 'default',
  icon,
  action,
  style,
}: EmptyStateProps) {
  const t = useTheme();
  const s = useStyles();
  const slot =
    icon ??
    (variant === 'search'
      ? SearchGlyph
      : variant === 'error'
        ? AlertGlyph
        : undefined);

  if (variant === 'section') {
    return (
      <View style={[s.section, style]}>
        {slot
          ? renderIcon(slot, {
              color: t.colors.mutedForeground,
              size: ICON.section,
            })
          : null}
        <Text maxFontSizeMultiplier={t.maxFontScale} style={s.sectionTitle}>
          {title}
        </Text>
        {action ? (
          <PressableBase
            accessibilityRole="link"
            onPress={action.onPress}
            style={s.link}
          >
            <Text maxFontSizeMultiplier={t.maxFontScale} style={s.linkLabel}>
              {action.label}
            </Text>
          </PressableBase>
        ) : null}
      </View>
    );
  }

  return (
    <View
      accessibilityRole={variant === 'error' ? 'alert' : undefined}
      accessibilityLiveRegion={variant === 'default' ? 'none' : 'polite'}
      style={[s.screen, style]}
    >
      {slot
        ? renderIcon(slot, {
            color: t.colors.mutedForeground,
            size: ICON.screen,
          })
        : null}
      <Text
        accessibilityRole="header"
        maxFontSizeMultiplier={t.maxFontScale}
        style={s.title}
      >
        {title}
      </Text>
      {action ? (
        <Button
          leftIcon={action.icon}
          style={s.button}
          onPress={action.onPress}
        >
          {action.label}
        </Button>
      ) : null}
    </View>
  );
}
