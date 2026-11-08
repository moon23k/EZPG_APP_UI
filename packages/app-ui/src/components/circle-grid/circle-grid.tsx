import { useState } from 'react';
import {
  Image,
  type ImageSourcePropType,
  Text as RNText,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { CheckGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type CircleGridItem<T extends string> = {
  value: T;
  label: string;
  uri?: string | null;
  source?: ImageSourcePropType;
  glyph?: string;
};

type Single<T extends string> = {
  multiple?: false;
  value: T | null;
  onValueChange: (value: T) => void;
};

type Multiple<T extends string> = {
  multiple: true;
  value: readonly T[];
  onValueChange: (value: T[]) => void;
  max?: number;
};

export type CircleGridProps<T extends string> = (Single<T> | Multiple<T>) & {
  items: readonly CircleGridItem<T>[];
  columns?: number;
  style?: StyleProp<ViewStyle>;
};

const RING = 3;
const BADGE = 26;
const GLYPH = 40;

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: t.space[5],
  },
  cell: {
    alignItems: 'center',
    gap: t.space[2],
    paddingHorizontal: t.space[1],
  },
  ring: {
    width: '100%',
    aspectRatio: 1,
    padding: RING,
    borderWidth: RING,
    borderRadius: t.radius.full,
    borderColor: 'transparent',
  },
  ringOn: { borderColor: t.colors.primary },
  circle: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.full,
    backgroundColor: t.colors.muted,
  },
  image: { width: '100%', height: '100%' },
  glyph: { fontSize: GLYPH, lineHeight: GLYPH * 1.25 },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: BADGE,
    height: BADGE,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: t.colors.background,
    backgroundColor: t.colors.primary,
  },
  label: { textAlign: 'center' },
}));

function Circle({
  uri,
  source,
  glyph,
}: {
  uri?: string | null;
  source?: ImageSourcePropType;
  glyph?: string;
}) {
  const s = useStyles();
  const [failed, setFailed] = useState<string | null>(null);
  const image = uri && failed !== uri ? { uri } : source;
  return (
    <View style={s.circle}>
      {image ? (
        <Image
          source={image}
          style={s.image}
          resizeMode="cover"
          onError={() => uri && setFailed(uri)}
        />
      ) : glyph ? (
        <RNText style={s.glyph}>{glyph}</RNText>
      ) : null}
    </View>
  );
}

export function CircleGrid<T extends string>(props: CircleGridProps<T>) {
  const { items, columns = 3, style } = props;
  const t = useTheme();
  const s = useStyles();
  const width = `${100 / columns}%` as const;
  const isOn = (v: T) =>
    props.multiple ? props.value.includes(v) : props.value === v;
  const press = (v: T) => {
    if (!props.multiple) {
      props.onValueChange(v);
      return;
    }
    if (props.value.includes(v)) {
      props.onValueChange(props.value.filter((x) => x !== v));
    } else if (props.max === undefined || props.value.length < props.max) {
      props.onValueChange([...props.value, v]);
    }
  };
  return (
    <View
      accessibilityRole={props.multiple ? undefined : 'radiogroup'}
      style={[s.root, style]}
    >
      {items.map((item) => {
        const on = isOn(item.value);
        return (
          <PressableBase
            key={item.value}
            accessibilityRole={props.multiple ? 'checkbox' : 'radio'}
            accessibilityState={
              props.multiple ? { checked: on } : { selected: on }
            }
            accessibilityLabel={item.label}
            onPress={() => press(item.value)}
            style={[s.cell, { width }]}
          >
            <View style={[s.ring, on && s.ringOn]}>
              <Circle uri={item.uri} source={item.source} glyph={item.glyph} />
              {on ? (
                <View style={s.badge}>
                  <CheckGlyph color={t.colors.primaryForeground} size={14} />
                </View>
              ) : null}
            </View>
            <Text
              variant="label"
              weight={on ? 'bold' : 'regular'}
              style={s.label}
              numberOfLines={2}
            >
              {item.label}
            </Text>
          </PressableBase>
        );
      })}
    </View>
  );
}
