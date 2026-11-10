import { act, fireEvent, render, screen } from '@testing-library/react-native';
import {
  Button,
  Calendar,
  Checkbox,
  Dialog,
  EmptyState,
  FloatingTabBar,
  formatPrice,
  SegmentedTabs,
  Switch,
  ToastProvider,
  useToast,
  Field,
  ListRow,
  ScanGlyph,
} from '../index';

describe('Button', () => {
  it('does not fire onPress while loading or disabled', async () => {
    const onPress = jest.fn();
    await render(
      <>
        <Button onPress={onPress} loading>
          로딩
        </Button>
        <Button onPress={onPress} disabled>
          비활성
        </Button>
      </>
    );
    await fireEvent.press(screen.getByText('로딩'));
    await fireEvent.press(screen.getByText('비활성'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('Checkbox', () => {
  it('reports the toggled value', async () => {
    const onValueChange = jest.fn();
    await render(
      <Checkbox value={false} onValueChange={onValueChange} label="약관 동의" />
    );
    await fireEvent.press(screen.getByRole('checkbox'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });
});

describe('Switch', () => {
  it('reports the new value', async () => {
    const onValueChange = jest.fn();
    await render(
      <Switch
        value={false}
        onValueChange={onValueChange}
        accessibilityLabel="알림"
      />
    );
    await fireEvent(screen.getByLabelText('알림'), 'valueChange', true);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });
});

describe('formatPrice', () => {
  it.each([
    [0, '0원'],
    [999, '999원'],
    [35000, '35,000원'],
    [1280000.4, '1,280,000원'],
    [-4500, '-4,500원'],
  ])('%p → %s', (value, expected) => {
    expect(formatPrice(value)).toBe(expected);
  });
});

describe('Dialog', () => {
  it('calls onConfirm and closes on cancel', async () => {
    const onConfirm = jest.fn();
    const onOpenChange = jest.fn();
    await render(
      <Dialog
        open
        onOpenChange={onOpenChange}
        title="삭제할까요?"
        onConfirm={onConfirm}
        confirmLabel="삭제"
      />
    );
    await fireEvent.press(screen.getByText('삭제'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('취소'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('SegmentedTabs', () => {
  it('reports the pressed tab only when it changes', async () => {
    const onValueChange = jest.fn();
    await render(
      <SegmentedTabs
        items={[
          { value: 'day', label: '오늘' },
          { value: 'week', label: '이번 주' },
        ]}
        value="day"
        onValueChange={onValueChange}
      />
    );
    await fireEvent.press(screen.getByText('오늘'));
    await fireEvent.press(screen.getByText('이번 주'));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('week');
  });
});

describe('FloatingTabBar', () => {
  const items = [
    { key: 'home', label: '홈', icon: 'home' },
    { key: 'orders', label: '주문', icon: 'orders', badge: '신규 주문 1건' },
  ] as const;

  it('reports the pressed tab only when it changes', async () => {
    const onValueChange = jest.fn();
    await render(
      <FloatingTabBar
        items={items}
        value="home"
        onValueChange={onValueChange}
      />
    );
    await fireEvent.press(screen.getByLabelText('홈'));
    await fireEvent.press(screen.getByLabelText('주문, 신규 주문 1건'));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('orders');
  });

  it('marks the selected tab and shows a dot only for badged tabs', async () => {
    await render(
      <FloatingTabBar items={items} value="home" onValueChange={() => {}} />
    );
    expect(screen.getByLabelText('홈').props.accessibilityState).toMatchObject({
      selected: true,
    });
    expect(screen.getAllByTestId('tab-badge')).toHaveLength(1);
  });
});

describe('Toast', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  function Trigger() {
    const toast = useToast();
    return (
      <Button onPress={() => toast.show({ message: '저장했어요' })}>
        저장
      </Button>
    );
  }

  it('shows a message and hides it after the duration', async () => {
    await render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    await fireEvent.press(screen.getByText('저장'));
    expect(screen.getByText('저장했어요')).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(2500);
    });
    expect(screen.queryByText('저장했어요')).toBeNull();
  });
});

describe('EmptyState', () => {
  it('announces errors and shows one action', async () => {
    const onPress = jest.fn();
    await render(
      <EmptyState
        variant="error"
        title="리뷰를 불러오지 못했어요"
        action={{ label: '다시 불러오기', onPress }}
      />
    );
    expect(screen.toJSON()).toMatchObject({
      props: { accessibilityRole: 'alert' },
    });
    await fireEvent.press(screen.getByText('다시 불러오기'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the section variant action as a link', async () => {
    await render(
      <EmptyState
        variant="section"
        title="아직 없어요"
        action={{ label: '링크 공유', onPress: () => {} }}
      />
    );
    expect(screen.getByRole('link')).toBeTruthy();
  });
});

describe('Calendar', () => {
  const days = ['2026-11-06', '2026-11-07', '2026-11-08', '2026-11-09'].map(
    (date, i) => ({
      date,
      label: '12만',
      disabled: i === 2,
    })
  );

  it('ends a range on a closed night but not across one', async () => {
    const onValueChange = jest.fn();
    const view = await render(
      <Calendar
        days={days}
        mode="range"
        value={{ start: '2026-11-06' }}
        onValueChange={onValueChange}
      />
    );
    await fireEvent.press(screen.getByLabelText('11월 8일 일요일 12만'));
    expect(onValueChange).toHaveBeenLastCalledWith({
      start: '2026-11-06',
      end: '2026-11-08',
    });
    await view.rerender(
      <Calendar
        days={days}
        mode="range"
        value={{ start: '2026-11-06' }}
        onValueChange={onValueChange}
      />
    );
    await fireEvent.press(screen.getByLabelText('11월 9일 월요일 12만'));
    expect(onValueChange).toHaveBeenLastCalledWith({ start: '2026-11-09' });
  });

  it('clears a lone start when it is pressed again', async () => {
    const onValueChange = jest.fn();
    await render(
      <Calendar
        days={days}
        mode="range"
        value={{ start: '2026-11-06' }}
        onValueChange={onValueChange}
      />
    );
    await fireEvent.press(screen.getByLabelText('11월 6일 금요일 12만'));
    expect(onValueChange).toHaveBeenLastCalledWith({});
  });
});

describe('selection and trailing action', () => {
  it('marks list rows as radio or checkbox', async () => {
    const onPress = jest.fn();
    await render(
      <>
        <ListRow
          title="상품 품절"
          selection="radio"
          selected
          onPress={onPress}
        />
        <ListRow title="전체 선택" selection="check" onPress={onPress} />
      </>
    );
    expect(screen.getByRole('radio', { checked: true })).toBeTruthy();
    expect(screen.getByRole('checkbox', { checked: false })).toBeTruthy();
    await fireEvent.press(screen.getByText('상품 품절'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('keeps the trailing action available beside an error', async () => {
    const onScan = jest.fn();
    await render(
      <Field
        label="송장 번호"
        error="숫자만 입력해 주세요"
        trailing={ScanGlyph}
        onTrailingPress={onScan}
        trailingLabel="송장 스캔"
      />
    );
    await fireEvent.press(screen.getByLabelText('송장 스캔'));
    expect(onScan).toHaveBeenCalledTimes(1);
  });

  it('shows the dialog description', async () => {
    await render(
      <Dialog
        open
        onOpenChange={() => {}}
        title="주문을 취소할까요?"
        description="취소하면 되돌릴 수 없어요."
        onConfirm={() => {}}
      />
    );
    expect(screen.getByText('취소하면 되돌릴 수 없어요.')).toBeTruthy();
  });
});
