import { fireEvent, render, screen } from '@testing-library/react-native';
import { ProductListEmpty } from '../blocks/product-list-empty';

describe('ProductListEmpty', () => {
  it('shows the add tile without a sample', async () => {
    const onAdd = jest.fn();
    await render(<ProductListEmpty onAdd={onAdd} />);
    await fireEvent.press(
      screen.getByLabelText('등록된 상품이 없어요. 첫 상품 등록')
    );
    expect(onAdd).toHaveBeenCalled();
  });

  it('shows the sample card and lets the owner dismiss it', async () => {
    const onDismiss = jest.fn();
    await render(
      <ProductListEmpty
        onAdd={() => {}}
        sample={{ name: '린넨 오버핏 셔츠', price: 35000 }}
        onDismissSample={onDismiss}
      />
    );
    expect(screen.getByText('예시 · 손님에게 안 보여요')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('예시 지우고 새로 등록'));
    expect(onDismiss).toHaveBeenCalled();
  });
});
