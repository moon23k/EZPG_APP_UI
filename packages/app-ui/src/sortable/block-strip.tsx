import type { ReactNode } from 'react';
import { ScrollView, Text as RNText, View } from 'react-native';
import Sortable from 'react-native-sortables';
import { PressableBase } from '../internal/pressable-base';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';

export type BlockStripItem = { key: string; thumb: ReactNode };

export type BlockStripProps = {
  items: readonly BlockStripItem[];
  value: string | null;
  onValueChange: (key: string) => void;
  onReorder: (keys: string[]) => void;
  onAdd?: () => void;
};

const W = 54;
const H = 70;

const useStyles = makeStyles((t) => ({
  row: {
    paddingHorizontal: t.space[3],
    paddingVertical: t.space[2],
    flexDirection: 'row',
    gap: t.space[2],
    alignItems: 'center',
  },
  chip: {
    width: W,
    height: H,
    overflow: 'hidden',
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
  },
  on: { borderWidth: 2.5, borderColor: t.colors.primary },
  num: {
    position: 'absolute',
    left: t.space[1],
    top: t.space[1],
    minWidth: t.space[4] + 2,
    height: t.space[4] + 2,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    fontSize: t.typography.caption.fontSize - 1,
    fontWeight: '700',
    color: t.colors.primaryForeground,
  },
  add: {
    width: W,
    height: H,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: t.colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: t.typography.title.fontSize,
    color: t.colors.mutedForeground,
  },
}));

export function BlockStrip({
  items,
  value,
  onValueChange,
  onReorder,
  onAdd,
}: BlockStripProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.row}
    >
      <View style={{ width: items.length * (W + t.space[2]) - t.space[2] }}>
        <Sortable.Grid
          data={[...items]}
          keyExtractor={(item) => item.key}
          rows={1}
          rowHeight={H}
          columnGap={t.space[2]}
          activeItemScale={1.12}
          inactiveItemOpacity={1}
          onDragEnd={({ data }) => onReorder(data.map((item) => item.key))}
          renderItem={({ item, index }) => {
            const on = item.key === value;
            return (
              <PressableBase
                onPress={() => onValueChange(item.key)}
                accessibilityLabel={`블록 ${index + 1}`}
                accessibilityState={{ selected: on }}
                pressedStyle={{}}
                style={[s.chip, on && s.on]}
              >
                {item.thumb}
                <View
                  style={[
                    s.num,
                    {
                      backgroundColor: on
                        ? t.colors.primary
                        : t.colors.foreground,
                    },
                  ]}
                >
                  <RNText style={s.numText}>{index + 1}</RNText>
                </View>
              </PressableBase>
            );
          }}
        />
      </View>
      {onAdd ? (
        <PressableBase
          onPress={onAdd}
          accessibilityLabel="블록 추가"
          style={s.add}
        >
          <RNText style={s.plus}>+</RNText>
        </PressableBase>
      ) : null}
    </ScrollView>
  );
}
