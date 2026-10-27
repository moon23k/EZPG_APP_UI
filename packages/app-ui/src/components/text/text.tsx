import type { ComponentRef, Ref } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import type { TypographyVariant } from '../../types';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type TextTone = 'default' | 'muted' | 'destructive' | 'success';

export type TextProps = RNTextProps & {
  ref?: Ref<ComponentRef<typeof RNText>>;
  variant?: TypographyVariant;
  tone?: TextTone;
  weight?: TextWeight;
};

export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

const useStyles = makeStyles((t) => ({
  caption: t.typography.caption,
  body: t.typography.body,
  bodyLg: t.typography.bodyLg,
  title: t.typography.title,
  display: t.typography.display,
  default: { color: t.colors.foreground },
  muted: { color: t.colors.mutedForeground },
  destructive: { color: t.colors.destructive },
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
