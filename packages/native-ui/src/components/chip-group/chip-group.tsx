import { View, type StyleProp, type ViewStyle } from 'react-native';
import { makeStyles } from '../../utils/styles';
import { Chip } from '../chip/chip';

export type ChipGroupItem<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type Single<T extends string> = {
  multiple?: false;
  value: T | null;
  onValueChange: (value: T | null) => void;
  /** 선택된 칩을 다시 누르면 해제. 기본 false */
  deselectable?: boolean;
};

type Multiple<T extends string> = {
  multiple: true;
  value: readonly T[];
  onValueChange: (value: T[]) => void;
  /** 최대 선택 개수 */
  max?: number;
};

export type ChipGroupProps<T extends string> = (Single<T> | Multiple<T>) & {
  items: readonly ChipGroupItem<T>[];
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[2] },
}));

export function ChipGroup<T extends string>(props: ChipGroupProps<T>) {
  const s = useStyles();
  const { items, style } = props;

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

  return (
    <View
      accessibilityRole={props.multiple ? undefined : 'radiogroup'}
      style={[s.root, style]}
    >
      {items.map((item) => {
        const selected = isSelected(item.value);
        return (
          <Chip
            key={item.value}
            selected={selected}
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
      })}
    </View>
  );
}
