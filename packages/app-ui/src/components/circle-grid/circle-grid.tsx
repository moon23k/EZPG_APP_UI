import { useState } from 'react';
import {
  Image,
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
  glyph?: string;
};

export type CircleGridProps<T extends string> = {
  items: readonly CircleGridItem<T>[];
  value: T | null;
  onValueChange: (value: T) => void;
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

function Circle({ uri, glyph }: { uri?: string | null; glyph?: string }) {
  const s = useStyles();
  const [failed, setFailed] = useState<string | null>(null);
  const show = uri && failed !== uri;
  return (
    <View style={s.circle}>
      {show ? (
        <Image
          source={{ uri }}
          style={s.image}
          resizeMode="cover"
          onError={() => setFailed(uri)}
        />
      ) : glyph ? (
        <RNText style={s.glyph}>{glyph}</RNText>
      ) : null}
    </View>
  );
}

export function CircleGrid<T extends string>({
  items,
  value,
  onValueChange,
  columns = 3,
  style,
}: CircleGridProps<T>) {
  const t = useTheme();
  const s = useStyles();
  const width = `${100 / columns}%` as const;
  return (
    <View accessibilityRole="radiogroup" style={[s.root, style]}>
      {items.map((item) => {
        const on = item.value === value;
        return (
          <PressableBase
            key={item.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            accessibilityLabel={item.label}
            onPress={() => onValueChange(item.value)}
            style={[s.cell, { width }]}
          >
            <View style={[s.ring, on && s.ringOn]}>
              <Circle uri={item.uri} glyph={item.glyph} />
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
