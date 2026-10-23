import { act, fireEvent, render, screen } from '@testing-library/react-native';
import {
  Button,
  Checkbox,
  Dialog,
  EmptyState,
  formatPrice,
  SegmentedTabs,
  Switch,
  ToastProvider,
  useToast,
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
    // 컨테이너는 버튼을 품고 있어 accessible로 묶지 않는다. 역할만 확인한다.
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
