import { fireEvent, render, screen } from '@testing-library/react-native';
import { useState } from 'react';
import {
  BulkShipList,
  Chip,
  ChipGroup,
  ClaimRow,
  CreditWallet,
  Field,
  GenerationProgress,
  OrderCard,
  orderStatusLabel,
  PlanCard,
  ProductRow,
  ProgressBar,
  SelectionBar,
  ServiceStateBanner,
  SitePreviewFrame,
  trackingIssues,
  type BulkShipRow,
} from '../index';
import { OptionEditor, type ProductOption } from '../sortable';
import { estimateLabelWidth } from '../charts/line-chart';

const DAY = 86400000;

describe('ClaimRow', () => {
  it('only opens detail on press and has no approve or reject buttons', async () => {
    const onPress = jest.fn();
    await render(
      <ClaimRow
        type="return"
        amount={38000}
        reason="상품 파손"
        onPress={onPress}
      />
    );
    expect(screen.queryByText('승인')).toBeNull();
    expect(screen.queryByText('거부')).toBeNull();
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['collected', '반품 회수 완료'],
    ['held', '반품 보류'],
    ['withdrawn', '반품 철회'],
    ['rejected', '반품 거절'],
  ] as const)('labels %s', async (status, label) => {
    await render(<ClaimRow type="return" status={status} amount={1000} />);
    expect(screen.getByText(label)).toBeTruthy();
  });

  it('shows D-n for open claims and hides it when closed', async () => {
    const dueAt = new Date(Date.now() + 3 * DAY);
    const { rerender } = await render(
      <ClaimRow type="exchange" amount={1000} dueAt={dueAt} />
    );
    expect(screen.getByText('D-3')).toBeTruthy();
    await rerender(
      <ClaimRow
        type="exchange"
        status="completed"
        amount={1000}
        dueAt={dueAt}
      />
    );
    expect(screen.queryByText('D-3')).toBeNull();
  });

  it('shows D-day and overdue', async () => {
    await render(
      <>
        <ClaimRow type="cancel" amount={1000} dueAt={new Date()} />
        <ClaimRow
          type="cancel"
          amount={1000}
          dueAt={new Date(Date.now() - 2 * DAY)}
        />
      </>
    );
    expect(screen.getByText('D-day')).toBeTruthy();
    expect(screen.getByText('기한 지남')).toBeTruthy();
  });
});

describe('OrderCard', () => {
  it('uses API status keys', () => {
    expect(Object.keys(orderStatusLabel)).toEqual([
      'pending_payment',
      'paid',
      'preparing',
      'shipped',
      'delivered',
      'completed',
      'canceled',
    ]);
  });

  it('reports long press and selected state', async () => {
    const onLongPress = jest.fn();
    await render(
      <OrderCard
        items={[{ name: '머그컵', quantity: 1 }]}
        total={12000}
        selected
        onPress={() => {}}
        onLongPress={onLongPress}
      />
    );
    const card = screen.getByRole('button');
    expect(card.props.accessibilityState.selected).toBe(true);
    expect(screen.getByTestId('card-selected-mark')).toBeTruthy();
    await fireEvent(card, 'longPress');
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });
});

describe('Chip count', () => {
  it('shows the count and reads it in the label', async () => {
    await render(<Chip count={12}>신규</Chip>);
    expect(screen.getByText('12')).toBeTruthy();
    expect(screen.getByLabelText('신규, 12건')).toBeTruthy();
  });

  it('passes count through ChipGroup', async () => {
    await render(
      <ChipGroup
        items={[{ value: 'a', label: '배송 준비', count: 3 }]}
        value={null}
        onValueChange={() => {}}
      />
    );
    expect(screen.getByLabelText('배송 준비, 3건')).toBeTruthy();
  });
});

describe('Field', () => {
  it('shows hint, warning, and lets error win', async () => {
    const { rerender } = await render(<Field label="송장" hint="숫자만" />);
    expect(screen.getByText('숫자만')).toBeTruthy();
    await rerender(<Field label="송장" hint="숫자만" warning="중복이에요" />);
    expect(screen.getByText('중복이에요')).toBeTruthy();
    expect(screen.queryByText('숫자만')).toBeNull();
    await rerender(
      <Field
        label="송장"
        hint="숫자만"
        warning="중복이에요"
        error="형식 오류"
      />
    );
    expect(screen.getByText('형식 오류')).toBeTruthy();
    expect(screen.queryByText('중복이에요')).toBeNull();
  });
});

describe('OptionEditor', () => {
  const options: ProductOption[] = [
    {
      id: 'a',
      name: '미니',
      priceDelta: -1000,
      active: true,
      note: '재고 3개',
    },
    { id: 'b', name: '큰 사이즈', priceDelta: 3000, active: true },
  ];

  it('formats negative price without +-', async () => {
    await render(<OptionEditor options={options} onOptionsChange={() => {}} />);
    expect(screen.getByText(/^[-−]1,000원$/)).toBeTruthy();
    expect(screen.queryByText(/\+-/)).toBeNull();
    expect(screen.getByText('+3,000원')).toBeTruthy();
    expect(screen.getByText('재고 3개')).toBeTruthy();
  });

  it('calls onActiveChange instead of onOptionsChange', async () => {
    const onActiveChange = jest.fn();
    const onOptionsChange = jest.fn();
    await render(
      <OptionEditor
        options={options}
        onOptionsChange={onOptionsChange}
        onActiveChange={onActiveChange}
      />
    );
    await fireEvent(screen.getByLabelText('미니 판매'), 'valueChange', false);
    expect(onActiveChange).toHaveBeenCalledWith('a', false);
    expect(onOptionsChange).not.toHaveBeenCalled();
  });
});

describe('BulkShipList', () => {
  const carriers = [
    { code: 'cj', name: 'CJ대한통운' },
    { code: 'post', name: '우체국택배' },
  ];

  it('finds invalid and duplicate tracking numbers', () => {
    expect(
      trackingIssues([
        { id: '1', title: 'a', trackingNo: '' },
        { id: '2', title: 'b', trackingNo: '12ab' },
        { id: '3', title: 'c', trackingNo: '1234-5678-90' },
        { id: '4', title: 'd', trackingNo: '1234567890' },
        { id: '5', title: 'e', trackingNo: '1234567' },
        { id: '6', title: 'f', trackingNo: '99998888777' },
      ])
    ).toEqual({ 2: 'invalid', 3: 'duplicate', 4: 'duplicate', 5: 'invalid' });
  });

  it('shows row errors and warnings and reports input', async () => {
    const onTrackingChange = jest.fn();
    const onScan = jest.fn();
    const onCarrierChange = jest.fn();
    const rows: BulkShipRow[] = [
      { id: '1', title: '머그컵', trackingNo: '12ab' },
      { id: '2', title: '원두', trackingNo: '601234567890' },
      { id: '3', title: '수건', trackingNo: '6012-3456-7890' },
    ];
    await render(
      <BulkShipList
        carriers={carriers}
        carrier="cj"
        onCarrierChange={onCarrierChange}
        rows={rows}
        onTrackingChange={onTrackingChange}
        onScan={onScan}
      />
    );
    expect(
      screen.getAllByText('숫자와 -만 8~20자리로 입력해 주세요')
    ).toHaveLength(1);
    expect(
      screen.getAllByText('같은 송장 번호가 다른 주문에도 있어요')
    ).toHaveLength(2);
    const input = screen.getByLabelText('머그컵 송장 번호');
    expect(input.props.keyboardType).toBe('number-pad');
    await fireEvent.changeText(input, '123456789');
    expect(onTrackingChange).toHaveBeenCalledWith('1', '123456789');
    await fireEvent.press(screen.getByLabelText('원두 송장 스캔'));
    expect(onScan).toHaveBeenCalledWith('2');
    await fireEvent.press(screen.getByText('우체국택배'));
    expect(onCarrierChange).toHaveBeenCalledWith('post');
  });

  it('hides the scan slot without onScan', async () => {
    await render(
      <BulkShipList
        carriers={carriers}
        carrier={null}
        onCarrierChange={() => {}}
        rows={[{ id: '1', title: '머그컵', trackingNo: '' }]}
        onTrackingChange={() => {}}
      />
    );
    expect(screen.queryByLabelText('머그컵 송장 스캔')).toBeNull();
  });
});

describe('SelectionBar', () => {
  it('shows count, max notice, and fires actions', async () => {
    const onAction = jest.fn();
    const onClear = jest.fn();
    const { rerender } = await render(
      <SelectionBar
        count={3}
        max={50}
        actionLabel="송장 입력"
        onAction={onAction}
        onClear={onClear}
      />
    );
    expect(screen.getByText('3건 선택')).toBeTruthy();
    expect(screen.queryByText(/최대 50건/)).toBeNull();
    await fireEvent.press(screen.getByText('송장 입력'));
    await fireEvent.press(screen.getByText('선택 해제'));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onClear).toHaveBeenCalledTimes(1);
    await rerender(
      <SelectionBar
        count={50}
        max={50}
        actionLabel="송장 입력"
        onAction={onAction}
        onClear={onClear}
      />
    );
    expect(screen.getByText(/최대 50건/)).toBeTruthy();
  });

  it('disables the action at zero', async () => {
    const onAction = jest.fn();
    await render(
      <SelectionBar
        count={0}
        actionLabel="배송 준비"
        onAction={onAction}
        onClear={() => {}}
      />
    );
    await fireEvent.press(screen.getByText('배송 준비'));
    expect(onAction).not.toHaveBeenCalled();
  });
});

describe('GenerationProgress', () => {
  const steps = [
    { key: 'a', label: '접수' },
    { key: 'b', label: '작성' },
    { key: 'c', label: '검사' },
  ];

  it('marks steps around the current one', async () => {
    await render(
      <GenerationProgress steps={steps} current="b" status="running" />
    );
    expect(screen.getByLabelText('접수, 완료')).toBeTruthy();
    expect(screen.getByLabelText('작성, 진행 중')).toBeTruthy();
    expect(screen.getByLabelText('검사, 대기')).toBeTruthy();
    expect(screen.queryByText('다시 시도')).toBeNull();
  });

  it('shows error and retry when failed', async () => {
    const onRetry = jest.fn();
    await render(
      <GenerationProgress
        steps={steps}
        current="c"
        status="failed"
        errorText="검사에서 멈췄어요"
        onRetry={onRetry}
        creditNote="크레딧은 차감되지 않아요"
      />
    );
    expect(screen.getByLabelText('검사, 실패')).toBeTruthy();
    expect(screen.getByText('검사에서 멈췄어요')).toBeTruthy();
    expect(screen.getByText('크레딧은 차감되지 않아요')).toBeTruthy();
    await fireEvent.press(screen.getByText('다시 시도'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

describe('ProgressBar', () => {
  it('shows done/total and progress value', async () => {
    await render(<ProgressBar done={5} total={12} label="송장 등록" />);
    const bar = screen.getByRole('progressbar');
    expect(bar.props.accessibilityValue).toEqual({ min: 0, max: 12, now: 5 });
    expect(screen.getByText('5')).toBeTruthy();
  });
});

describe('limits and states', () => {
  it('shows unlimited daily limit', async () => {
    await render(
      <>
        <PlanCard
          name="프로"
          price={1000}
          monthlyCredits={10}
          dailyLimit={null}
        />
        <CreditWallet balance={10} todayUsed={4} dailyLimit={null} />
      </>
    );
    expect(screen.getByText('하루 생성 무제한')).toBeTruthy();
    expect(screen.getByText(/\/ 무제한$/)).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('shows none and trial plan states', async () => {
    await render(
      <>
        <PlanCard
          name="A"
          price={1}
          monthlyCredits={1}
          dailyLimit={1}
          state="none"
        />
        <PlanCard
          name="B"
          price={1}
          monthlyCredits={1}
          dailyLimit={1}
          current
          state="trial"
        />
      </>
    );
    expect(screen.getByText('구독 전')).toBeTruthy();
    expect(screen.getByText('체험 중')).toBeTruthy();
  });

  it('shows stopped banner with reason', async () => {
    await render(
      <ServiceStateBanner state="stopped" reason="상품 정보 불일치" />
    );
    expect(screen.getByText('운영 정책에 따라 판매가 중지됐어요')).toBeTruthy();
    expect(screen.getByText('사유: 상품 정보 불일치')).toBeTruthy();
  });

  it('blocks publishing with a reason', async () => {
    const onPublish = jest.fn();
    await render(
      <SitePreviewFrame
        status="draft"
        onPublish={onPublish}
        publishDisabled
        blockedReason="사업자 확인 중이에요"
      />
    );
    expect(screen.getByText('사업자 확인 중이에요')).toBeTruthy();
    await fireEvent.press(screen.getByText('사이트 게시하기'));
    expect(onPublish).not.toHaveBeenCalled();
  });
});

describe('LineChart label width', () => {
  it('leaves room for Korean units and long numbers', () => {
    expect(estimateLabelWidth('300만', 11)).toBeGreaterThanOrEqual(3 * 7 + 11);
    expect(estimateLabelWidth('1,200,000', 11)).toBeGreaterThanOrEqual(
      7 * 6.8 + 2 * 3
    );
  });
});

function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <Chip selected={on} onPress={() => setOn(!on)}>
      필터
    </Chip>
  );
}

describe('Chip selection', () => {
  it('toggles', async () => {
    await render(<Toggle />);
    await fireEvent.press(screen.getByText('필터'));
    expect(screen.getByRole('button').props.accessibilityState.selected).toBe(
      true
    );
  });
});

describe('ProductRow', () => {
  it('reads name, price, and status and opens on press', async () => {
    const onPress = jest.fn();
    await render(
      <ProductRow
        title="린넨 쿠션 커버"
        price={24000}
        status={{ label: '품절', tone: 'warning' }}
        onPress={onPress}
      />
    );
    const row = screen.getByLabelText('린넨 쿠션 커버, 24,000원, 품절');
    await fireEvent.press(row);
    expect(onPress).toHaveBeenCalled();
    expect(screen.getByText('품절')).toBeTruthy();
  });
});
