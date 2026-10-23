import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Section } from '../__stories__/helpers';
import { ProductListEmpty, type SampleProduct } from './product-list-empty';

const draft: SampleProduct = { name: '계절 꽃다발 (중)', price: 35000 };

function Demo() {
  const [sample, setSample] = useState<SampleProduct | undefined>(draft);
  return (
    <>
      <Section title="예시 초안이 있을 때 (✕를 누르면 등록 타일로)">
        <ProductListEmpty
          sample={sample}
          onAdd={() => setSample(draft)}
          onEditSample={() => {}}
          onDismissSample={() => setSample(undefined)}
        />
      </Section>
      <Section title="초안이 없을 때">
        <ProductListEmpty onAdd={() => {}} />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Product/ProductListEmpty',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
