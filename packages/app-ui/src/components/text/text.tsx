import type { ComponentRef, Ref } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import type { TypographyVariant } from '../../types';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type TextTone = 'default' | 'muted' | 'warning' | 'danger' | 'success';

export type TextProps = RNTextProps & {
  ref?: Ref<ComponentRef<typeof RNText>>;
  variant?: TypographyVariant;
  tone?: TextTone;
  weight?: TextWeight;
};

export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

const useStyles = makeStyles((t) => ({
  caption: t.typography.caption,
  label: t.typography.label,
  body: t.typography.body,
  bodyLg: t.typography.bodyLg,
  title: t.typography.title,
  screenTitle: t.typography.screenTitle,
  display: t.typography.display,
  default: { color: t.colors.foreground },
  muted: { color: t.colors.mutedForeground },
  warning: { color: t.colors.warningText },
  danger: { color: t.colors.danger },
  success: { color: t.colors.success },
  font: { fontFamily: t.fontFamily },
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
}));

export function Text({
  variant = 'body',
  tone = 'default',
  weight,
  style,
  ...rest
}: TextProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <RNText
      maxFontSizeMultiplier={t.maxFontScale}
      {...rest}
      style={[s.font, s[variant], s[tone], weight && s[weight], style]}
    />
  );
}
