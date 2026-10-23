import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button, Checkbox, formatPrice, Switch } from '../index';

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
