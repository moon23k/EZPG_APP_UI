import type { ComponentRef, Ref } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import type { TypographyVariant } from '../../types';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type TextTone = 'default' | 'muted' | 'destructive' | 'success';

export type TextProps = RNTextProps & {
  ref?: Ref<ComponentRef<typeof RNText>>;
  /** 기본 'body' */
  variant?: TypographyVariant;
  /** 기본 'default' */
  tone?: TextTone;
};

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
}));

export function Text({
  variant = 'body',
  tone = 'default',
  style,
  ...rest
}: TextProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <RNText
      maxFontSizeMultiplier={t.maxFontScale}
      {...rest}
      style={[s.font, s[variant], s[tone], style]}
    />
  );
}
