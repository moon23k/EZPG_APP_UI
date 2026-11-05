import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Text } from '../components/text/text';
import { PressableBase } from '../internal/pressable-base';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';

export type DialItem = {
  key: string;
  label: string;
  value?: number;
  max?: number;
  color?: string;
  text?: string;
};

export type DialStripProps = {
  items: readonly DialItem[];
  selected: string;
  onSelect: (key: string) => void;
  style?: StyleProp<ViewStyle>;
};

const SIZE = 48;
const STROKE = 3;

const useStyles = makeStyles((t) => ({
  row: { gap: t.space[3], paddingHorizontal: t.layout.screenX },
  item: { alignItems: 'center', gap: t.space[1] },
  ring: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { position: 'absolute' },
}));

const signed = (v: number) => (v > 0 ? `+${v}` : String(v));

function Ring({ item, on }: { item: DialItem; on: boolean }) {
  const t = useTheme();
  const s = useStyles();
  const r = (SIZE - STROKE) / 2;
  const c = 2 * Math.PI * r;
  if (item.color) {
    return (
      <View style={s.ring}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={r}
            fill={item.color}
            stroke={on ? t.colors.primary : t.colors.border}
            strokeWidth={STROKE}
          />
        </Svg>
      </View>
    );
  }
  const v = item.value ?? 0;
  const frac = Math.min(1, Math.abs(v) / (item.max ?? 2));
  return (
    <View style={s.ring}>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={r}
          fill={on ? t.colors.primaryTint : t.colors.muted}
          stroke={t.colors.border}
          strokeWidth={STROKE}
        />
        {v ? (
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={r}
            fill="none"
            stroke={on ? t.colors.primary : t.colors.primaryEdge}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${c * frac} ${c}`}
            transform={`${v < 0 ? `translate(${SIZE},0) scale(-1,1) ` : ''}rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        ) : null}
      </Svg>
      <Text
        variant="caption"
        weight={on ? 'bold' : 'medium'}
        tone={on ? 'primary' : 'muted'}
        style={s.value}
      >
        {item.text ?? (v ? signed(v) : '0')}
      </Text>
    </View>
  );
}

export function DialStrip({
  items,
  selected,
  onSelect,
  style,
}: DialStripProps) {
  const s = useStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.row}
      style={style}
    >
      {items.map((item) => {
        const on = item.key === selected;
        return (
          <PressableBase
            key={item.key}
            onPress={() => onSelect(item.key)}
            accessibilityRole="button"
            accessibilityLabel={
              item.color || item.text
                ? item.label
                : `${item.label} ${signed(item.value ?? 0)}`
            }
            accessibilityState={{ selected: on }}
            style={s.item}
          >
            <Ring item={item} on={on} />
            <Text
              variant="caption"
              weight={on ? 'bold' : 'regular'}
              tone={on ? 'primary' : 'muted'}
            >
              {item.label}
            </Text>
          </PressableBase>
        );
      })}
    </ScrollView>
  );
}
