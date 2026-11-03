import { fireEvent, render, screen } from '@testing-library/react-native';
import { cleanCode, CodeInput, ConsentList, InviteCard } from '../index';

describe('CodeInput', () => {
  it('cleans pasted text and completes at full length', async () => {
    const onChangeText = jest.fn();
    const onComplete = jest.fn();
    await render(
      <CodeInput
        value=""
        onChangeText={onChangeText}
        onComplete={onComplete}
        accessibilityLabel="초대 코드"
      />
    );
    await fireEvent.changeText(
      screen.getByLabelText('초대 코드'),
      ' vwbx-mune '
    );
    expect(onChangeText).toHaveBeenCalledWith('VWBXMUNE');
    expect(onComplete).toHaveBeenCalledWith('VWBXMUNE');
    expect(cleanCode('ab', 8)).toBe('AB');
  });
});

describe('ConsentList', () => {
  it('lists required first and toggles all', async () => {
    const onChangeAll = jest.fn();
    const onView = jest.fn();
    await render(
      <ConsentList
        items={[
          { key: 'm', label: '혜택 알림', required: false, checked: false },
          {
            key: 't',
            label: '이용약관',
            required: true,
            checked: true,
            onView,
          },
        ]}
        onChange={jest.fn()}
        onChangeAll={onChangeAll}
      />
    );
    const labels = screen
      .getAllByText(/^\[(필수|선택)\]/)
      .map((n) => n.props.children);
    expect(labels).toEqual(['[필수] 이용약관', '[선택] 혜택 알림']);
    await fireEvent.press(screen.getByText('약관 전체 동의'));
    expect(onChangeAll).toHaveBeenCalledWith(true);
    await fireEvent.press(screen.getByLabelText('이용약관 보기'));
    expect(onView).toHaveBeenCalled();
  });
});

describe('InviteCard', () => {
  it('shows store, tags and rows', async () => {
    await render(
      <InviteCard
        title="모먼트 스토어"
        tags={['직원으로 초대']}
        rows={[{ label: '초대한 사람', value: '김사장' }]}
      />
    );
    expect(screen.getByRole('header')).toBeTruthy();
    expect(screen.getByText('직원으로 초대')).toBeTruthy();
    expect(screen.getByText('김사장')).toBeTruthy();
  });
});
