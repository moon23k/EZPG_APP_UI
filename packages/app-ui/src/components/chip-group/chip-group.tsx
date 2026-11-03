import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { makeStyles } from '../../utils/styles';
import { Chip, type ChipSize, type ChipVariant } from '../chip/chip';

export type ChipGroupItem<T extends string> = {
  value: T;
  label: string;
  count?: number;
  disabled?: boolean;
};

type Single<T extends string> = {
  multiple?: false;
  value: T | null;
  onValueChange: (value: T | null) => void;
  deselectable?: boolean;
};

type Multiple<T extends string> = {
  multiple: true;
  value: readonly T[];
  onValueChange: (value: T[]) => void;
  max?: number;
};

export type ChipGroupProps<T extends string> = (Single<T> | Multiple<T>) & {
  items: readonly ChipGroupItem<T>[];
  size?: ChipSize;
  variant?: ChipVariant;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[2] },
  scroll: { marginHorizontal: -t.layout.screenX, flexGrow: 0 },
  track: {
    flexDirection: 'row',
    gap: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
}));

export function ChipGroup<T extends string>(props: ChipGroupProps<T>) {
  const s = useStyles();
  const { items, size, variant, scroll, style } = props;

  const isSelected = (v: T) =>
    props.multiple ? props.value.includes(v) : props.value === v;

  const press = (v: T) => {
    if (props.multiple) {
      if (props.value.includes(v)) {
        props.onValueChange(props.value.filter((x) => x !== v));
      } else if (props.max === undefined || props.value.length < props.max) {
        props.onValueChange([...props.value, v]);
      }
    } else if (props.value === v) {
      if (props.deselectable) props.onValueChange(null);
    } else {
      props.onValueChange(v);
    }
  };

  const full =
    props.multiple &&
    props.max !== undefined &&
    props.value.length >= props.max;

  const chips = items.map((item) => {
    const selected = isSelected(item.value);
    return (
      <Chip
        key={item.value}
        selected={selected}
        size={size}
        variant={variant}
        count={item.count}
        disabled={item.disabled || (full && !selected)}
        accessibilityRole={props.multiple ? 'checkbox' : 'radio'}
        accessibilityState={
          props.multiple ? { checked: selected } : { selected }
        }
        onPress={() => press(item.value)}
      >
        {item.label}
      </Chip>
    );
  });

  if (scroll) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityRole={props.multiple ? undefined : 'radiogroup'}
        style={[s.scroll, style]}
        contentContainerStyle={s.track}
      >
        {chips}
      </ScrollView>
    );
  }

  return (
    <View
      accessibilityRole={props.multiple ? undefined : 'radiogroup'}
      style={[s.root, style]}
    >
      {chips}
    </View>
  );
}
