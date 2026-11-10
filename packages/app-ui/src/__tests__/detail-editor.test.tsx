import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  CompareSlider,
  DetailCanvas,
  DetailComposer,
  DraftStrip,
  FontPicker,
  LayoutPicker,
  PhotoTray,
  type DetailDocValue,
  detailBlockSpace,
  detailLineHeight,
  detailTracking,
} from '../index';

const doc: DetailDocValue = {
  blocks: [
    {
      id: 'b1',
      layout: 'text',
      layers: [
        { id: 't1', type: 'text', text: '보이는 글' },
        { id: 't2', type: 'text', text: '숨긴 글', hidden: true },
      ],
    },
  ],
};

it('canvas hides hidden layers and reports block and layer taps', async () => {
  const onSelect = jest.fn();
  await render(<DetailCanvas doc={doc} onSelect={onSelect} />);
  expect(screen.queryByText('숨긴 글')).toBeNull();
  await fireEvent.press(screen.getByLabelText('보이는 글'));
  expect(onSelect).toHaveBeenLastCalledWith({ block: 'b1', layer: 't1' });
  await fireEvent.press(screen.getByLabelText('블록'));
  expect(onSelect).toHaveBeenLastCalledWith({ block: 'b1' });
});

it('pickers report the chosen value', async () => {
  const onLayout = jest.fn();
  const onFont = jest.fn();
  const onDraft = jest.fn();
  const onMore = jest.fn();
  await render(
    <>
      <LayoutPicker value="text" onValueChange={onLayout} />
      <FontPicker value="gothic" onValueChange={onFont} sample="Aa" />
      <DraftStrip
        items={[
          { key: 'd1', label: '초안 1', thumb: null },
          { key: 'd2', label: '초안 2', thumb: null },
        ]}
        value="d1"
        onValueChange={onDraft}
        onMore={onMore}
      />
    </>
  );
  await fireEvent.press(screen.getByLabelText('카드'));
  await fireEvent.press(screen.getByLabelText('명조'));
  await fireEvent.press(screen.getByLabelText('초안 2'));
  await fireEvent.press(screen.getByLabelText('더 만들기'));
  expect(onLayout).toHaveBeenCalledWith('card');
  expect(onFont).toHaveBeenCalledWith('serif');
  expect(onDraft).toHaveBeenCalledWith('d2');
  expect(onMore).toHaveBeenCalled();
});

it('composer sends, attaches and removes', async () => {
  const onSend = jest.fn();
  const onAttach = jest.fn();
  const onRemove = jest.fn();
  await render(
    <DetailComposer
      value="선물용"
      onChangeText={() => {}}
      placeholder="요청"
      onSend={onSend}
      attachments={[{ key: 'a1', kind: 'link', label: 'x.test' }]}
      onRemove={onRemove}
      onAttach={onAttach}
      menuOpen
      onMenuOpenChange={() => {}}
    />
  );
  await fireEvent.press(screen.getByLabelText('링크'));
  await fireEvent.press(screen.getByLabelText('빼기'));
  await fireEvent.press(screen.getByLabelText('만들기'));
  expect(onAttach).toHaveBeenCalledWith('link');
  expect(onRemove).toHaveBeenCalledWith('a1');
  expect(onSend).toHaveBeenCalled();
});

it('photo tray adds and removes photos', async () => {
  const onAdd = jest.fn();
  const onRemove = jest.fn();
  await render(
    <PhotoTray
      photos={[
        { key: 'a', uri: 'https://x.test/a.jpg' },
        { key: 'b', uri: 'https://x.test/b.jpg', reference: true },
      ]}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  );
  expect(screen.getByText('대표')).toBeTruthy();
  expect(screen.getByText('참고')).toBeTruthy();
  await fireEvent.press(screen.getByLabelText('참고 캡처'));
  await fireEvent.press(screen.getAllByLabelText('빼기')[1]!);
  expect(onAdd).toHaveBeenCalledWith('capture');
  expect(onRemove).toHaveBeenCalledWith('b');
  await render(
    <CompareSlider before="https://x.test/a.jpg" after="https://x.test/b.jpg" />
  );
  expect(screen.getByLabelText('원본과 비교')).toBeTruthy();
});

describe('detail spacing', () => {
  it('keeps the old look by default and clamps slider values', () => {
    expect(detailLineHeight()).toBeCloseTo(1.45, 5);
    expect(detailTracking()).toBe(0);
    expect(detailBlockSpace()).toBe(0);
    expect(detailLineHeight(12)).toBeCloseTo(1.85, 5);
    expect(detailTracking(-9)).toBeCloseTo(-0.05, 5);
    expect(detailBlockSpace(2.5)).toBe(20);
  });
});
