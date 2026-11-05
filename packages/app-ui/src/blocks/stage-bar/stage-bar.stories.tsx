import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Section } from '../../__stories__/helpers';
import { StageBar } from './stage-bar';

type Stage = 'paid' | 'preparing' | 'shipped' | 'claims';

function Demo() {
  const [value, setValue] = useState<Stage | null>(null);
  return (
    <Section title="주문 단계 · 누르면 그 단계만 · 다시 누르면 전체">
      <StageBar<Stage>
        items={[
          { value: 'paid', label: '신규', count: 1 },
          { value: 'preparing', label: '준비 중', count: 2 },
          { value: 'shipped', label: '배송 중', count: 0 },
          { value: 'claims', label: '클레임', count: 8, flow: false },
        ]}
        value={value}
        onValueChange={setValue}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Orders/StageBar',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
