import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Divider } from '../../components/divider/divider';
import { Slider } from '../../components/slider/slider';
import { Text } from '../../components/text/text';
import { makeStyles } from '../../utils/styles';

export type SliderListItem = {
  key: string;
  label: string;
  startLabel: string;
  endLabel: string;
};

export type SliderListProps = {
  items: readonly SliderListItem[];
  values: Readonly<Record<string, number>>;
  min?: number;
  max?: number;
  onChange: (key: string, value: number) => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: { paddingTop: t.space[2], gap: t.space[1] },
}));

export function SliderList({
  items,
  values,
  min = 0,
  max = 1,
  onChange,
  style,
}: SliderListProps) {
  const s = useStyles();
  return (
    <View style={style}>
      {items.map((item) => (
        <View key={item.key}>
          <Divider />
          <View style={s.row}>
            <Text weight="medium">{item.label}</Text>
            <Slider
              value={values[item.key] ?? min}
              min={min}
              max={max}
              onChange={(value) => onChange(item.key, value)}
              startLabel={item.startLabel}
              endLabel={item.endLabel}
              accessibilityLabel={item.label}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
