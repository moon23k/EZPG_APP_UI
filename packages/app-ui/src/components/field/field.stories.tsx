import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text } from 'react-native';
import { Column, demoProducts, demoStore } from '../../__stories__/helpers';
import { Field } from './field';

const meta = {
  title: 'Components/Field',
  component: Field,
  args: { label: '상품명', placeholder: `예) ${demoProducts.shirt}` },
} satisfies Meta<typeof Field>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Column>
      <Field label="상품명" placeholder={`예) ${demoProducts.shirt}`} />
      <Field label="상호" defaultValue={demoStore.name} />
      <Field
        label="연락처"
        defaultValue="010-12"
        error="번호를 끝까지 입력해 주세요"
      />
      <Field
        label="한 줄 소개"
        maxLength={40}
        defaultValue={demoStore.tagline}
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
