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
  /** 예) '베이직 · 10월' */
  title: string;
  amount: number;
  /** 기본 'paid' */
  status?: InvoiceStatus;
  /** 환불된 금액. 없으면 전액 환불 */
  refundedAmount?: number;
  /** 실패일 때 [결제수단 변경] */
  onChangePaymentMethod?: () => void;
  /** 실패일 때 [다시 결제] */
  onRetry?: () => void;
  /** 다시 결제 진행 중 */
  retrying?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  grow: { flex: 1 },
  head: { fontSize: 16, lineHeight: 24, fontVariant: ['tabular-nums'] },
  action: { flex: 1 },
}));

/** 결제 내역 한 건. 실패한 결제는 해결 버튼이 있는 카드로 보여준다 */
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
          color={t.colors.destructive}
          onColor={t.colors.destructiveForeground}
          size={t.iconSize.md}
        />
        <Text weight="bold" tone="destructive" style={[s.head, s.grow]}>
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
