import { useId, useState, type ComponentRef, type Ref } from 'react';
import {
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type FieldProps = Omit<TextInputProps, 'style'> & {
  ref?: Ref<ComponentRef<typeof TextInput>>;
  label?: string;
  description?: string;
  /** 있으면 오류 상태로 표시하고 description 대신 보여준다 */
  error?: string;
  leading?: IconSlot;
  trailing?: IconSlot;
  /** maxLength와 함께 쓰면 글자 수를 표시한다 */
  showCount?: boolean;
  /** 바깥 컨테이너 스타일 */
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  label: {
    ...t.typography.body,
    fontFamily: t.fontFamily,
    fontWeight: '500',
    color: t.colors.foreground,
  },
  frame: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    height: 44,
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  focused: { borderColor: t.colors.ring },
  invalid: { borderColor: t.colors.destructive },
  disabled: { opacity: t.opacity.disabled, backgroundColor: t.colors.muted },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 0,
    fontFamily: t.fontFamily,
    fontSize: t.typography.body.fontSize,
    color: t.colors.foreground,
  },
  footer: { flexDirection: 'row', gap: t.space[2] },
  hint: {
    ...t.typography.caption,
    fontFamily: t.fontFamily,
    flex: 1,
    color: t.colors.mutedForeground,
  },
  error: { color: t.colors.destructive },
  count: {
    ...t.typography.caption,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
  },
}));

export function Field({
  label,
  description,
  error,
  leading,
  trailing,
  showCount,
  style,
  editable = true,
  onFocus,
  onBlur,
  onChangeText,
  ...input
}: FieldProps) {
  const t = useTheme();
  const s = useStyles();
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [typed, setTyped] = useState((input.defaultValue ?? '').length);
  const length = input.value !== undefined ? input.value.length : typed;
  const hint = error ?? description;
  const icon = { color: t.colors.mutedForeground, size: t.iconSize.md };

  return (
    <View style={[s.root, style]}>
      {label ? (
        <Text
          nativeID={`${id}-label`}
          maxFontSizeMultiplier={t.maxFontScale}
          style={s.label}
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
          accessibilityLabelledBy={label ? `${id}-label` : undefined}
          accessibilityHint={hint}
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
          onChangeText={(text) => {
            setTyped(text.length);
            onChangeText?.(text);
          }}
        />
        {trailing ? renderIcon(trailing, icon) : null}
      </View>
      {hint || (showCount && input.maxLength) ? (
        <View style={s.footer}>
          <Text
            maxFontSizeMultiplier={t.maxFontScale}
            accessibilityLiveRegion={error ? 'polite' : 'none'}
            style={[s.hint, !!error && s.error]}
          >
            {hint}
          </Text>
          {showCount && input.maxLength ? (
            <Text maxFontSizeMultiplier={t.maxFontScale} style={s.count}>
              {length}/{input.maxLength}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
