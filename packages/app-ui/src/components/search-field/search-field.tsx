import { CloseGlyph, SearchGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { Field, type FieldProps } from '../field/field';

export type SearchFieldProps = Omit<
  FieldProps,
  'leading' | 'trailing' | 'value' | 'onChangeText' | 'defaultValue'
> & {
  value: string;
  onChangeText: (text: string) => void;
  clearLabel?: string;
};

export function SearchField({
  value,
  onChangeText,
  clearLabel = '검색어 지우기',
  ...rest
}: SearchFieldProps) {
  const t = useTheme();
  return (
    <Field
      returnKeyType="search"
      accessibilityRole="search"
      autoCorrect={false}
      {...rest}
      value={value}
      onChangeText={onChangeText}
      leading={SearchGlyph}
      trailing={
        value ? (
          <PressableBase
            accessibilityLabel={clearLabel}
            touchHeight={t.iconSize.md}
            hitSlop={12}
            onPress={() => onChangeText('')}
          >
            <CloseGlyph color={t.colors.mutedForeground} size={t.iconSize.sm} />
          </PressableBase>
        ) : undefined
      }
    />
  );
}
