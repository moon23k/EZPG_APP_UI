import { formatPrice, StatusBadge } from '@ezpg/native-ui';
import type { StyleProp, ViewStyle } from 'react-native';

export type StockBadgeProps = {
  /** null이면 재고를 관리하지 않는 상품 */
  stock: number | null;
  /** 이 수 이하면 '부족'. 기본 5 */
  lowThreshold?: number;
  style?: StyleProp<ViewStyle>;
};

export function StockBadge({
  stock,
  lowThreshold = 5,
  style,
}: StockBadgeProps) {
  if (stock === null)
    return <StatusBadge style={style}>재고 관리 안 함</StatusBadge>;
  if (stock <= 0)
    return (
      <StatusBadge tone="destructive" style={style}>
        품절
      </StatusBadge>
    );
  return (
    <StatusBadge
      tone={stock <= lowThreshold ? 'warning' : 'neutral'}
      style={style}
    >
      {`재고 ${formatPrice(stock, '')}`}
    </StatusBadge>
  );
}
