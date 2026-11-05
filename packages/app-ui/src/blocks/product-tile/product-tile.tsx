import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Photo } from '../../components/photo/photo';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';

export type ProductTileProps = {
  name: string;
  price: string;
  state?: string;
  image?: string | null;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, gap: t.space[1] },
  body: { gap: t.space[1] / 2, paddingTop: t.space[1] },
}));

export function ProductTile({
  name,
  price,
  state,
  image,
  onPress,
  style,
}: ProductTileProps) {
  const s = useStyles();
  return (
    <PressableBase
      onPress={onPress}
      disabled={!onPress}
      accessibilityLabel={[name, price, state].filter(Boolean).join(' ')}
      style={[s.root, style]}
    >
      <Photo source={{ uri: image ?? '' }} seed={name} />
      <View style={s.body}>
        <Text numberOfLines={1}>{name}</Text>
        <Text weight="bold">{price}</Text>
        {state ? (
          <Text variant="caption" tone="muted">
            {state}
          </Text>
        ) : null}
      </View>
    </PressableBase>
  );
}

export function ProductTileSpacer() {
  const s = useStyles();
  return <View style={s.root} />;
}
