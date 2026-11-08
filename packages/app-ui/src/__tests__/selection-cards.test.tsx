import { fireEvent, render, screen } from '@testing-library/react-native';
import { useState } from 'react';
import { CircleGrid, SummaryHeader } from '../index';

const items = [
  { value: 'a', label: '화병' },
  { value: 'b', label: '포스터' },
  { value: 'c', label: '쿠션' },
] as const;

function Many({ max }: { max?: number }) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <CircleGrid
      multiple
      max={max}
      columns={4}
      items={items}
      value={value}
      onValueChange={setValue}
    />
  );
}

describe('CircleGrid multiple', () => {
  it('toggles several items as checkboxes', async () => {
    await render(<Many />);
    await fireEvent.press(screen.getByLabelText('화병'));
    await fireEvent.press(screen.getByLabelText('쿠션'));
    expect(
      screen.getByLabelText('화병').props.accessibilityState
    ).toMatchObject({
      checked: true,
    });
    expect(
      screen.getByLabelText('쿠션').props.accessibilityState
    ).toMatchObject({
      checked: true,
    });
    await fireEvent.press(screen.getByLabelText('화병'));
    expect(
      screen.getByLabelText('화병').props.accessibilityState
    ).toMatchObject({
      checked: false,
    });
  });

  it('stops adding at max', async () => {
    await render(<Many max={2} />);
    await fireEvent.press(screen.getByLabelText('화병'));
    await fireEvent.press(screen.getByLabelText('포스터'));
    await fireEvent.press(screen.getByLabelText('쿠션'));
    expect(
      screen.getByLabelText('쿠션').props.accessibilityState
    ).toMatchObject({
      checked: false,
    });
  });

  it('keeps single selection as radio', async () => {
    const onValueChange = jest.fn();
    await render(
      <CircleGrid items={items} value="a" onValueChange={onValueChange} />
    );
    expect(
      screen.getByLabelText('화병').props.accessibilityState
    ).toMatchObject({
      selected: true,
    });
    await fireEvent.press(screen.getByLabelText('포스터'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });
});

describe('SummaryHeader press', () => {
  it('becomes a button when onPress is given', async () => {
    const onPress = jest.fn();
    await render(
      <SummaryHeader title="바닷가 펜션" badge="영업 중" onPress={onPress} />
    );
    await fireEvent.press(screen.getByRole('button', { name: '바닷가 펜션' }));
    expect(onPress).toHaveBeenCalled();
  });

  it('stays static without onPress', async () => {
    await render(<SummaryHeader title="바닷가 펜션" />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
