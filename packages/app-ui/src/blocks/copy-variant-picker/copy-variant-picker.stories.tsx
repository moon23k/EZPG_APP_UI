import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { demoStore, Section } from '../../__stories__/helpers';
import { CopyVariantPicker, type CopyVariant } from './copy-variant-picker';

const initial = [
  { id: '1', text: demoStore.tagline },
  { id: '2', text: '성수동 골목, 오래 머물고 싶은 작은 카페', locked: true },
  { id: '3', text: '천천히 내린 커피 한 잔의 여유' },
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
