import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { sample, Section } from '../__stories__/helpers';
import { SupplyItemCard } from './supply-item-card';

const options = [
  { id: 's', label: '소 (10×15cm)', unitPrice: 180 },
  { id: 'm', label: '중 (20×25cm)', unitPrice: 260 },
  { id: 'l', label: '대 (30×40cm)', unitPrice: 390 },
];

function Demo() {
  const [option, setOption] = useState('m');
  return (
    <>
      <Section title="옵션 선택 · 무료배송까지">
        <SupplyItemCard
          name="종이 쇼핑백"
          description="로고 1도 인쇄 · 최소 100장"
          image={sample(250)}
          options={options}
          selectedOptionId={option}
          onSelectOption={setOption}
          cartSubtotal={32000}
        />
      </Section>
      <Section title="옵션 1개 · 무료배송 충족">
        <SupplyItemCard
          name="로고 스티커"
          description="원형 40mm · 최소 500장"
          image={sample(225)}
          options={[{ id: 'one', label: '기본', unitPrice: 45 }]}
          selectedOptionId="one"
          onSelectOption={() => {}}
          cartSubtotal={61000}
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Supply/SupplyItemCard',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
