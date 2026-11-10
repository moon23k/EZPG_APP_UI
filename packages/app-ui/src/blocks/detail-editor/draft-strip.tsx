import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '../../components/text/text';
import { SparklesGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type DraftStripItem = { key: string; label: string; thumb: ReactNode };

export type DraftStripProps = {
  items: readonly DraftStripItem[];
  value: string;
  onValueChange: (key: string) => void;
  onMore?: () => void;
  moreLabel?: string;
};

const W = 64;
const H = 100;

const useStyles = makeStyles((t) => ({
  row: { gap: t.space[2], paddingHorizontal: t.space[3] },
  item: { gap: t.space[1], alignItems: 'center' },
  frame: {
    width: W,
    height: H,
    overflow: 'hidden',
    borderRadius: t.radius.sm,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
  },
  on: { borderWidth: 3, borderColor: t.colors.primary },
  more: {
    width: W,
    height: H,
    borderRadius: t.radius.sm,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: t.colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export function DraftStrip({
  items,
  value,
  onValueChange,
  onMore,
  moreLabel = '더 만들기',
}: DraftStripProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.row}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const on = item.key === value;
        return (
          <PressableBase
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={item.label}
            onPress={() => onValueChange(item.key)}
            style={s.item}
          >
            <View style={[s.frame, on && s.on]}>{item.thumb}</View>
            <Text variant="caption" tone={on ? 'default' : 'muted'}>
              {item.label}
            </Text>
          </PressableBase>
        );
      })}
      {onMore ? (
        <PressableBase
          onPress={onMore}
          accessibilityLabel={moreLabel}
          style={s.item}
        >
          <View style={s.more}>
            <SparklesGlyph
              color={t.colors.mutedForeground}
              size={t.iconSize.md}
            />
          </View>
          <Text variant="caption" tone="muted">
            {moreLabel}
          </Text>
        </PressableBase>
      ) : null}
    </ScrollView>
  );
}

export const DRAFT_THUMB_WIDTH = W;
