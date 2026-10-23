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
  /** 있으면 오류 상태로 표시하고 입력칸 아래에 보여준다 */
  error?: string;
  leading?: IconSlot;
  trailing?: IconSlot;
  /** 바깥 컨테이너 스타일 */
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  label: {
    fontFamily: t.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: t.colors.foreground,
  },
  frame: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    height: 52,
    paddingHorizontal: t.space[4],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: t.colors.input,
    backgroundColor: t.colors.background,
  },
  // 테두리가 두꺼워져도 글자가 밀리지 않게 padding을 줄인다
  focused: {
    borderWidth: 2,
    paddingHorizontal: t.space[4] - 1,
    borderColor: t.colors.primary,
  },
  invalid: {
    borderWidth: 2,
    paddingHorizontal: t.space[4] - 1,
    borderColor: t.colors.destructive,
  },
  disabled: { opacity: t.opacity.disabled, backgroundColor: t.colors.muted },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 0,
    fontFamily: t.fontFamily,
    fontSize: 16,
    color: t.colors.foreground,
  },
  error: {
    fontFamily: t.fontFamily,
    fontSize: 13,
    lineHeight: 18,
    paddingLeft: t.space[1],
    color: t.colors.destructive,
  },
  errorLabel: { color: t.colors.destructive },
}));

export function Field({
  label,
  error,
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
          !editable && s.disabled,
        ]}
      >
        {leading ? renderIcon(leading, icon) : null}
        <TextInput
          placeholderTextColor={t.colors.mutedForeground}
          selectionColor={t.colors.ring}
          maxFontSizeMultiplier={t.maxFontScale}
          accessibilityLabel={label}
          accessibilityHint={error}
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
            color={t.colors.destructive}
            onColor={t.colors.destructiveForeground}
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
      ) : null}
    </View>
  );
}
