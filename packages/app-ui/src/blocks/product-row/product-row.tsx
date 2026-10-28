import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Photo } from '../../components/photo/photo';
import { formatPrice, Price } from '../../components/price/price';
import {
  StatusBadge,
  type StatusBadgeTone,
} from '../../components/status-badge/status-badge';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';

export type ProductRowStatus = { label: string; tone?: StatusBadgeTone };

export type ProductRowProps = {
  title: string;
  price: number;
  originalPrice?: number;
  imageUri?: string | null;
  status?: ProductRowStatus;
  trailing?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    minHeight: t.listRow.threeLine,
    paddingVertical: t.space[2],
    paddingHorizontal: t.layout.screenX,
    backgroundColor: t.colors.background,
  },
  pressed: { backgroundColor: t.colors.muted },
  thumb: { width: t.listRow.oneLine },
  empty: {
    width: t.listRow.oneLine,
    height: t.listRow.oneLine,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.muted,
  },
  body: { flex: 1, gap: t.space[1] },
}));

export function ProductRow({
  title,
  price,
  originalPrice,
  imageUri,
  status,
  trailing,
  onPress,
  style,
}: ProductRowProps) {
  const s = useStyles();
  const label = [title, formatPrice(price), status?.label]
    .filter(Boolean)
    .join(', ');
  const content = (
    <>
      <View style={s.thumb}>
        {imageUri ? (
          <Photo source={{ uri: imageUri }} accessible={false} />
        ) : (
          <View style={s.empty} />
        )}
      </View>
      <View style={s.body}>
        <Text variant="bodyLg" numberOfLines={1}>
          {title}
        </Text>
        <Price value={price} originalValue={originalPrice} variant="label" />
        {status ? (
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
        ) : null}
      </View>
      {trailing}
    </>
  );
  if (!onPress) {
    return (
      <View style={[s.row, style]} accessibilityLabel={label}>
        {content}
      </View>
    );
  }
  return (
    <PressableBase
      onPress={onPress}
      accessibilityLabel={label}
      pressedStyle={s.pressed}
      style={[s.row, style]}
    >
      {content}
    </PressableBase>
  );
}
