import { useRef, type ComponentRef } from 'react';
import { TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';

export type CodeInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  length?: number;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  accessibilityLabel: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  row: { flexDirection: 'row', gap: t.space[1] },
  cell: {
    flex: 1,
    height: t.controlSize.md,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filled: { borderColor: t.colors.primaryEdge },
  active: { borderColor: t.colors.primary },
  wrong: { borderColor: t.colors.danger },
  hidden: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 1,
    height: 1,
    opacity: 0.01,
    color: 'transparent',
  },
}));

export const cleanCode = (raw: string, length: number) =>
  raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, length);

export function CodeInput({
  value,
  onChangeText,
  length = 8,
  onComplete,
  autoFocus,
  accessibilityLabel,
  error,
  style,
}: CodeInputProps) {
  const s = useStyles();
  const input = useRef<ComponentRef<typeof TextInput>>(null);
  const change = (raw: string) => {
    const next = cleanCode(raw, length);
    onChangeText(next);
    if (next.length === length) onComplete?.(next);
  };
  return (
    <View style={[s.root, style]}>
      <PressableBase onPress={() => input.current?.focus()} accessible={false}>
        <View style={s.row}>
          {Array.from({ length }, (_, i) => (
            <View
              key={i}
              style={[
                s.cell,
                i < value.length && s.filled,
                i === Math.min(value.length, length - 1) && s.active,
                error ? s.wrong : null,
              ]}
            >
              <Text variant="bodyLg" weight="bold">
                {value[i] ?? ''}
              </Text>
            </View>
          ))}
        </View>
        <TextInput
          ref={input}
          value={value}
          onChangeText={change}
          autoFocus={autoFocus}
          autoCapitalize="characters"
          autoCorrect={false}
          autoComplete="one-time-code"
          textContentType="oneTimeCode"
          maxLength={length * 2}
          caretHidden
          selectionColor="transparent"
          underlineColorAndroid="transparent"
          accessibilityLabel={accessibilityLabel}
          style={s.hidden}
        />
      </PressableBase>
      {error ? (
        <Text variant="caption" tone="danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
