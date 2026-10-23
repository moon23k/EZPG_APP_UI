import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { sample, Section } from '../__stories__/helpers';
import { SupplyItemCard } from './supply-item-card';

const options = [
  { id: 's', label: '소 10×15cm' },
  { id: 'm', label: '중 20×25cm' },
  { id: 'l', label: '대 30×40cm' },
];

const prices: Record<string, [number, number, number]> = {
  s: [18000, 72000, 125000],
  m: [26000, 105000, 180000],
  l: [39000, 160000, 275000],
};

function Demo() {
  const [option, setOption] = useState('m');
  const [quantity, setQuantity] = useState<number | null>(100);
  const [sticker, setSticker] = useState<number | null>(null);
  return (
    <>
      <Section title="사이즈 · 수량 선택">
        <SupplyItemCard
          name="종이 쇼핑백"
          image={sample(250)}
          options={options}
          selectedOptionId={option}
          onSelectOption={setOption}
          quantities={[100, 500, 1000].map((q, i) => ({
            quantity: q,
            price: prices[option]![i]!,
          }))}
          selectedQuantity={quantity}
          onSelectQuantity={setQuantity}
          onAdd={() => {}}
        />
      </Section>
      <Section title="옵션 없음 · 수량 고르기 전">
        <SupplyItemCard
          name="로고 스티커"
          image={sample(225)}
          quantities={[
            { quantity: 500, price: 22500 },
            { quantity: 1000, price: 39000 },
          ]}
          selectedQuantity={sticker}
          onSelectQuantity={setSticker}
          onAdd={() => {}}
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
