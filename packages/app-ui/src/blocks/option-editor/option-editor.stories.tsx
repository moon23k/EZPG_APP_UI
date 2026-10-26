import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Section } from '../../__stories__/helpers';
import { OptionEditor, type ProductOption } from './option-editor';

const initial: ProductOption[] = [
  { id: 's', name: 'S (85)', priceDelta: 0, active: true },
  { id: 'm', name: 'M (95)', priceDelta: 0, active: true },
  { id: 'l', name: 'L (105)', priceDelta: 3000, active: false },
  { id: 'wrap', name: '선물 포장 추가', priceDelta: 2000, active: true },
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
