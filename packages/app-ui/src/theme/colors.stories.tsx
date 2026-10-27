import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text, View } from 'react-native';
import type { ThemeColors } from '../types';
import { contrastRatio } from '../utils/color';
import { makeStyles } from '../utils/styles';
import { useTheme } from './theme-provider';

const pairs: [keyof ThemeColors, keyof ThemeColors][] = [
  ['background', 'foreground'],
  ['muted', 'mutedForeground'],
  ['primary', 'primaryForeground'],
  ['danger', 'dangerForeground'],
  ['success', 'successForeground'],
  ['warning', 'warningForeground'],
];

const useStyles = makeStyles((t) => ({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[3] },
  swatch: {
    width: 168,
    padding: t.space[3],
    gap: t.space[1],
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  name: { ...t.typography.body, fontWeight: '600' },
  meta: t.typography.caption,
  line: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  chip: {
    width: 16,
    height: 16,
    borderRadius: t.radius.sm,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  label: { ...t.typography.caption, color: t.colors.mutedForeground },
}));

function Colors() {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={{ gap: t.space[6] }}>
      <View style={s.grid}>
        {pairs.map(([bg, fg]) => (
          <View key={bg} style={[s.swatch, { backgroundColor: t.colors[bg] }]}>
            <Text style={[s.name, { color: t.colors[fg] }]}>{bg}</Text>
            <Text style={[s.meta, { color: t.colors[fg] }]}>
              {t.colors[bg]} / {t.colors[fg]}
            </Text>
            <Text style={[s.meta, { color: t.colors[fg] }]}>
              대비 {contrastRatio(t.colors[bg], t.colors[fg]).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      <View style={s.grid}>
        {(['border', 'ring'] as const).map((key) => (
          <View key={key} style={s.line}>
            <View style={[s.chip, { backgroundColor: t.colors[key] }]} />
            <Text style={s.label}>
              {key} {t.colors[key]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const meta = { title: 'Foundations/Colors', component: Colors } satisfies Meta<
  typeof Colors
>;
export default meta;

export const Palette: StoryObj<typeof meta> = {};
