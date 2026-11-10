import { Text as RNText, View } from 'react-native';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { DETAIL_FONT_FAMILY, type DetailFont } from './detail-types';

export type FontPickerProps = {
  value: DetailFont;
  onValueChange: (font: DetailFont) => void;
  sample: string;
};

const NAMES: Record<DetailFont, string> = {
  gothic: '고딕',
  serif: '명조',
  display: '굵은 제목',
  hand: '손글씨',
};

const ORDER: DetailFont[] = ['gothic', 'serif', 'display', 'hand'];

const useStyles = makeStyles((t) => ({
  list: { gap: t.space[1] },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: t.controlSize.sm,
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.md,
  },
  on: { backgroundColor: t.colors.primaryTint },
  sample: { flexShrink: 1 },
}));

export function FontPicker({ value, onValueChange, sample }: FontPickerProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.list} accessibilityRole="radiogroup">
      {ORDER.map((font) => {
        const on = font === value;
        return (
          <PressableBase
            key={font}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            accessibilityLabel={NAMES[font]}
            onPress={() => onValueChange(font)}
            style={[s.row, on && s.on]}
          >
            <RNText
              numberOfLines={1}
              maxFontSizeMultiplier={t.maxFontScale}
              style={[
                s.sample,
                {
                  fontFamily: DETAIL_FONT_FAMILY[font].regular,
                  fontSize: t.typography.bodyLg.fontSize,
                  color: t.colors.foreground,
                },
              ]}
            >
              {sample}
            </RNText>
            <Text variant="caption" tone="muted">
              {NAMES[font]}
            </Text>
          </PressableBase>
        );
      })}
    </View>
  );
}
