import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Chip } from '../components/chip/chip';
import {
  ChipGroup,
  type ChipGroupItem,
} from '../components/chip-group/chip-group';
import { Text } from '../components/text/text';
import { makeStyles } from '../utils/styles';

export type FontLevel<L extends string> = {
  key: L;
  label: string;
  bold: boolean;
  italic: boolean;
};

export type FontControlsProps<S extends string, L extends string> = {
  sets: readonly ChipGroupItem<S>[];
  selected: S;
  onSelect: (set: S) => void;
  levels: readonly FontLevel<L>[];
  italicAvailable?: boolean;
  onToggle: (level: L, style: 'bold' | 'italic') => void;
  boldLabel?: string;
  italicLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[3] },
  sets: { paddingHorizontal: t.layout.screenX },
  levels: { gap: t.space[2], paddingHorizontal: t.layout.screenX },
  level: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  name: { flex: 1 },
}));

export function FontControls<S extends string, L extends string>({
  sets,
  selected,
  onSelect,
  levels,
  italicAvailable = true,
  onToggle,
  boldLabel = '굵게',
  italicLabel = '기울임',
  style,
}: FontControlsProps<S, L>) {
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      <View style={s.sets}>
        <ChipGroup
          items={sets}
          value={selected}
          onValueChange={(set) => set && onSelect(set)}
        />
      </View>
      <View style={s.levels}>
        {levels.map((level) => (
          <View key={level.key} style={s.level}>
            <Text variant="label" style={s.name}>
              {level.label}
            </Text>
            <Chip
              size="sm"
              selected={level.bold}
              onPress={() => onToggle(level.key, 'bold')}
              accessibilityLabel={`${level.label} ${boldLabel}`}
            >
              {boldLabel}
            </Chip>
            <Chip
              size="sm"
              selected={level.italic}
              disabled={!italicAvailable}
              onPress={() => onToggle(level.key, 'italic')}
              accessibilityLabel={`${level.label} ${italicLabel}`}
            >
              {italicLabel}
            </Chip>
          </View>
        ))}
      </View>
    </View>
  );
}
