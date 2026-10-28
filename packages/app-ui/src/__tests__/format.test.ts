import {
  changeRate,
  deadlineTone,
  formatDeadline,
  formatManwon,
} from '../blocks/internal/format';
import { orderStatusText } from '../blocks/order-card/order-card';

describe('format', () => {
  it.each([
    [0, '0'],
    [9000, '9,000'],
    [12345, '1.2만'],
    [420000, '42만'],
    [-35000, '-3.5만'],
  ])('formatManwon(%p) → %s', (v, expected) => {
    expect(formatManwon(v)).toBe(expected);
  });

  it('formats an imminent deadline only', () => {
    expect(formatDeadline(0)).toBe('오늘 마감');
    expect(formatDeadline(1)).toBe('내일 마감');
    expect(formatDeadline(2)).toBe('모레 마감');
    expect(formatDeadline(3)).toBeNull();
    expect(formatDeadline(-1)).toBe('기한 지남');
  });

  it('computes change rate', () => {
    expect(changeRate(110, 100)).toBeCloseTo(10);
    expect(changeRate(5, 0)).toBeNull();
  });
});

describe('deadlineTone', () => {
  it('colors only today and overdue', () => {
    expect(deadlineTone(-1)).toBe('danger');
    expect(deadlineTone(0)).toBe('warning');
    expect(deadlineTone(1)).toBe('muted');
  });
});

describe('orderStatusText', () => {
  it('uses the same words as the customer web by fulfillment', () => {
    expect(orderStatusText({ status: 'preparing' })).toBe('상품 준비 중');
    expect(
      orderStatusText({
        status: 'preparing',
        fulfillment: 'pickup',
        readyAt: '2026-10-28T05:00:00Z',
      })
    ).toBe('픽업 준비 완료');
    expect(
      orderStatusText({ status: 'delivered', fulfillment: 'pickup' })
    ).toBe('수령 완료');
    expect(orderStatusText({ status: 'delivered', fulfillment: 'local' })).toBe(
      '배송 완료'
    );
    expect(
      orderStatusText({ status: 'pending_payment', awaitingDeposit: true })
    ).toBe('입금 대기');
    expect(orderStatusText({ status: 'canceled' })).toBe('주문 취소');
  });
});
