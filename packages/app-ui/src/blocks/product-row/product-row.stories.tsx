import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Divider } from '../../components/divider/divider';
import { Switch } from '../../components/switch/switch';
import { Section } from '../../__stories__/helpers';
import { ProductRow } from './product-row';

function Demo() {
  const [selling, setSelling] = useState(true);
  return (
    <Section title="상품 목록 행">
      <ProductRow
        title="린넨 쿠션 커버"
        price={24000}
        originalPrice={32000}
        status={
          selling
            ? { label: '판매 중', tone: 'success' }
            : { label: '품절', tone: 'warning' }
        }
        trailing={<Switch value={selling} onValueChange={setSelling} />}
        onPress={() => {}}
      />
      <Divider inset={16} />
      <ProductRow
        title="원목 트레이"
        price={52000}
        status={{ label: '판매 전', tone: 'info' }}
        onPress={() => {}}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Catalog/ProductRow',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
