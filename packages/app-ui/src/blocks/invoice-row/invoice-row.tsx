import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { ListRow } from '../../components/list-row/list-row';
import { formatPrice } from '../../components/price/price';
import { Text } from '../../components/text/text';
import { AlertGlyph } from '../../internal/glyphs';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Card } from '../internal/card';

export type InvoiceStatus = 'paid' | 'failed' | 'refunded';

export type InvoiceRowProps = {
  title: string;
  amount: number;
  status?: InvoiceStatus;
  refundedAmount?: number;
  onChangePaymentMethod?: () => void;
  onRetry?: () => void;
  retrying?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  grow: { flex: 1 },
  head: {
    fontSize: t.typography.bodyLg.fontSize,
    lineHeight: t.typography.bodyLg.lineHeight,
    fontVariant: ['tabular-nums'],
  },
  action: { flex: 1 },
}));

export function InvoiceRow({
  title,
  amount,
  status = 'paid',
  refundedAmount,
  onChangePaymentMethod,
  onRetry,
  retrying,
  onPress,
  style,
}: InvoiceRowProps) {
  const t = useTheme();
  const s = useStyles();

  if (status !== 'failed') {
    const value =
      status === 'refunded'
        ? `환불 ${formatPrice(refundedAmount ?? amount)}`
        : formatPrice(amount);
    return (
      <ListRow
        title={title}
        onPress={onPress}
        style={style}
        trailing={
          <Text
            weight="semibold"
            tone={status === 'refunded' ? 'muted' : 'default'}
          >
            {value}
          </Text>
        }
      />
    );
  }

  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`결제 실패, ${formatPrice(amount)}, ${title}`}
      style={style}
    >
      <View style={s.row}>
        <AlertGlyph
          filled
          color={t.colors.danger}
          onColor={t.colors.dangerForeground}
          size={t.iconSize.md}
        />
        <Text weight="bold" tone="danger" style={[s.head, s.grow]}>
          결제 실패
        </Text>
        <Text weight="bold" style={s.head}>
          {formatPrice(amount)}
        </Text>
      </View>
      <Text numberOfLines={1}>{title}</Text>
      {onChangePaymentMethod || onRetry ? (
        <View style={s.row}>
          {onChangePaymentMethod ? (
            <Button
              size="sm"
              variant="outline"
              style={s.action}
              onPress={onChangePaymentMethod}
            >
              결제수단 변경
            </Button>
          ) : null}
          {onRetry ? (
            <Button
              size="sm"
              loading={retrying}
              style={s.action}
              onPress={onRetry}
            >
              다시 결제
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
