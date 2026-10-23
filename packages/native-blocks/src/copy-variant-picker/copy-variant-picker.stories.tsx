import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Section } from '../__stories__/helpers';
import { CopyVariantPicker, type CopyVariant } from './copy-variant-picker';

const initial = [
  { id: '1', text: '오늘의 계절을 한 다발에 담아요' },
  { id: '2', text: '성수동 골목, 매일 새로 들어오는 꽃', locked: true },
  { id: '3', text: '마음을 전하는 가장 쉬운 방법, 꽃 한 송이' },
] satisfies CopyVariant[];

function Demo() {
  const [variants, setVariants] = useState<CopyVariant[]>(initial);
  const [selected, setSelected] = useState<string | null>('1');
  const toggle = (id: string) =>
    setVariants((list) =>
      list.map((v) => (v.id === id ? { ...v, locked: !v.locked } : v))
    );
  return (
    <>
      <Section title="기본">
        <CopyVariantPicker
          label="한 줄 소개"
          variants={variants}
          selectedId={selected}
          onSelect={setSelected}
          onToggleLock={toggle}
        />
      </Section>
      <Section title="동시 수정 충돌">
        <CopyVariantPicker
          label="한 줄 소개"
          variants={variants}
          selectedId={selected}
          onSelect={setSelected}
          conflict
          onReload={() => {}}
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Onboarding/CopyVariantPicker',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
