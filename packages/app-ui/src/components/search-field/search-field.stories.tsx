import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column } from '../../__stories__/helpers';
import { SearchField } from './search-field';

function Demo() {
  const [empty, setEmpty] = useState('');
  const [filled, setFilled] = useState('머그컵');
  return (
    <Column>
      <SearchField
        value={empty}
        onChangeText={setEmpty}
        placeholder="주문번호, 받는 분 이름"
      />
      <SearchField
        value={filled}
        onChangeText={setFilled}
        placeholder="상품 검색"
      />
    </Column>
  );
}

const meta = {
  title: 'Components/SearchField',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
