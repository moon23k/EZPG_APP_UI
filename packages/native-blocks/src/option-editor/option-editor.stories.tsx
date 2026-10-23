import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Section } from '../__stories__/helpers';
import { OptionEditor, type ProductOption } from './option-editor';

const initial: ProductOption[] = [
  { id: 's', name: '소 (장미 10송이)', priceDelta: 0, active: true },
  { id: 'm', name: '중 (장미 20송이)', priceDelta: 15000, active: true },
  { id: 'l', name: '대 (장미 30송이)', priceDelta: 28000, active: false },
  { id: 'card', name: '메시지 카드 추가', priceDelta: 2000, active: true },
];

function Demo() {
  const [options, setOptions] = useState(initial);
  return (
    <GestureHandlerRootView>
      <Section title="판매 중 · 품절(판매 중지)">
        <OptionEditor
          options={options}
          onOptionsChange={setOptions}
          onEdit={() => {}}
          onAdd={() => {}}
        />
      </Section>
    </GestureHandlerRootView>
  );
}

const meta = {
  title: 'Blocks/Product/OptionEditor',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
