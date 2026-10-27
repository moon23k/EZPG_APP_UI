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
      <Field
        label="송장 번호"
        keyboardType="number-pad"
        placeholder="숫자만 입력"
        hint="택배사 송장의 숫자 8~20자리"
      />
      <Field
        label="송장 번호"
        keyboardType="number-pad"
        defaultValue="123456789012"
        warning="같은 송장 번호가 다른 주문에도 있어요"
      />
      <Field
        label="송장 번호"
        defaultValue="12ab"
        warning="같은 송장 번호가 다른 주문에도 있어요"
        error="숫자와 -만 8~20자리로 입력해 주세요"
      />
      <Field
        label="할인가"
        keyboardType="number-pad"
        defaultValue="1000"
        hint="판매가보다 낮게 정하면 상품 상세에 할인율이 함께 보이고, 주문 화면에서는 할인가 기준으로 결제 금액이 계산돼요"
      />
    </Column>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
