import { Fragment } from 'react';
import { View } from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type TextLink = { label: string; onPress: () => void };

export type TextLinksProps = { items: readonly TextLink[] };

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[3],
    paddingVertical: t.space[6],
  },
  bar: { width: 1, height: t.space[3], backgroundColor: t.colors.border },
  link: { paddingVertical: t.space[1] },
}));

export function TextLinks({ items }: TextLinksProps) {
  const s = useStyles();
  return (
    <View style={s.root}>
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index ? <View style={s.bar} /> : null}
          <PressableBase
            style={s.link}
            accessibilityRole="button"
            onPress={item.onPress}
          >
            <Text variant="caption" tone="muted">
              {item.label}
            </Text>
          </PressableBase>
        </Fragment>
      ))}
    </View>
  );
}
