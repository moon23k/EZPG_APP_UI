import { useState, type ComponentRef, type Ref } from 'react';
import {
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { AlertGlyph } from '../../internal/glyphs';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type FieldProps = Omit<TextInputProps, 'style'> & {
  ref?: Ref<ComponentRef<typeof TextInput>>;
  label?: string;
  error?: string;
  hint?: string;
  warning?: string;
  leading?: IconSlot;
  trailing?: IconSlot;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  label: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    fontWeight: '600',
    color: t.colors.foreground,
  },
  frame: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    height: t.controlSize.lg,
    paddingHorizontal: t.space[4],
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.input,
    backgroundColor: t.colors.background,
  },
  focused: {
    borderWidth: 2,
    paddingHorizontal: t.space[4] - 1,
    borderColor: t.colors.primary,
  },
  invalid: {
    borderWidth: 2,
    paddingHorizontal: t.space[4] - 1,
    borderColor: t.colors.danger,
  },
  disabled: { opacity: t.opacity.disabled, backgroundColor: t.colors.muted },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 0,
    fontFamily: t.fontFamily,
    fontSize: t.typography.bodyLg.fontSize,
    color: t.colors.foreground,
  },
  error: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    paddingLeft: t.space[1],
    color: t.colors.danger,
  },
  errorLabel: { color: t.colors.danger },
  warned: {
    borderWidth: 2,
    paddingHorizontal: t.space[4] - 1,
    borderColor: t.colors.warning,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: t.space[1],
    paddingLeft: t.space[1],
  },
  grow: { flex: 1, paddingLeft: 0 },
  hint: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    paddingLeft: t.space[1],
    color: t.colors.mutedForeground,
  },
  warning: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    paddingLeft: t.space[1],
    color: t.colors.foreground,
  },
}));

export function Field({
  label,
  error,
  hint,
  warning,
  leading,
  trailing,
  style,
  editable = true,
  onFocus,
  onBlur,
  ...input
}: FieldProps) {
  const t = useTheme();
  const s = useStyles();
  const [focused, setFocused] = useState(false);
  const icon = { color: t.colors.mutedForeground, size: t.iconSize.md };
  const warn = error ? undefined : warning;
  const note = error ?? warn ?? hint;

  return (
    <View style={[s.root, style]}>
      {label ? (
        <Text
          maxFontSizeMultiplier={t.maxFontScale}
          style={[s.label, !!error && s.errorLabel]}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          s.frame,
          focused && s.focused,
          !!error && s.invalid,
          !!warn && s.warned,
          !editable && s.disabled,
        ]}
      >
        {leading ? renderIcon(leading, icon) : null}
        <TextInput
          placeholderTextColor={t.colors.mutedForeground}
          selectionColor={t.colors.ring}
          maxFontSizeMultiplier={t.maxFontScale}
          accessibilityLabel={label}
          accessibilityHint={note}
          {...input}
          editable={editable}
          style={s.input}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
        {error ? (
          <AlertGlyph
            filled
            color={t.colors.danger}
            onColor={t.colors.dangerForeground}
            size={t.iconSize.md}
          />
        ) : trailing ? (
          renderIcon(trailing, icon)
        ) : null}
      </View>
      {error ? (
        <Text
          maxFontSizeMultiplier={t.maxFontScale}
          accessibilityLiveRegion="polite"
          style={s.error}
        >
          {error}
        </Text>
      ) : warn ? (
        <View style={s.noteRow}>
          <AlertGlyph
            filled
            color={t.colors.warning}
            onColor={t.colors.warningForeground}
            size={t.iconSize.sm}
          />
          <Text
            maxFontSizeMultiplier={t.maxFontScale}
            accessibilityLiveRegion="polite"
            style={[s.warning, s.grow]}
          >
            {warn}
          </Text>
        </View>
      ) : hint ? (
        <Text maxFontSizeMultiplier={t.maxFontScale} style={s.hint}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
