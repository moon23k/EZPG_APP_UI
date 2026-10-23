import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text } from 'react-native';
import { Column } from '../../__stories__/helpers';
import { Field } from './field';

const meta = {
  title: 'Components/Field',
  component: Field,
  args: { label: '상품명', placeholder: '예) 장미 꽃다발' },
} satisfies Meta<typeof Field>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Column>
      <Field label="상품명" placeholder="예) 장미 꽃다발" />
      <Field
        label="상호"
        description="사이트 상단에 표시돼요."
        defaultValue="꽃집 모먼트"
      />
      <Field
        label="연락처"
        defaultValue="010-12"
        error="휴대폰 번호 형식이 아니에요."
      />
      <Field
        label="한 줄 소개"
        placeholder="최대 40자"
        maxLength={40}
        showCount
        defaultValue="계절 꽃으로 만드는 작은 꽃다발"
      />
      <Field
        label="가격"
        keyboardType="number-pad"
        defaultValue="35000"
        trailing={({ color }) => <Text style={{ color }}>원</Text>}
      />
      <Field label="사업자 번호" defaultValue="123-45-67890" editable={false} />
    </Column>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
