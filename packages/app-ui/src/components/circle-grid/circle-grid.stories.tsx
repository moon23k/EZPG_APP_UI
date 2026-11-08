import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { demoPhotoIds, sample, Section } from '../../__stories__/helpers';
import { CircleGrid } from './circle-grid';

const items = [
  {
    value: 'roastery',
    label: '로스터리 카페',
    uri: sample(demoPhotoIds.latte).uri,
  },
  {
    value: 'bakery',
    label: '베이커리 카페',
    uri: sample(demoPhotoIds.cafe).uri,
  },
  { value: 'bread', label: '빵집', source: sample(demoPhotoIds.mug) },
  { value: 'dessert', label: '디저트 가게', glyph: '🧁' },
  { value: 'cake', label: '케이크 전문점', glyph: '🎂' },
  {
    value: 'clothes',
    label: '캐주얼 의류',
    uri: sample(demoPhotoIds.clothes).uri,
  },
];

function Demo() {
  const [value, setValue] = useState<string | null>('bread');
  const [many, setMany] = useState<string[]>(['roastery', 'clothes']);
  return (
    <>
      <Section title="3열 · 하나 선택">
        <CircleGrid items={items} value={value} onValueChange={setValue} />
      </Section>
      <Section title="4열 · 여러 개 선택">
        <CircleGrid
          multiple
          max={10}
          items={items}
          value={many}
          onValueChange={setMany}
          columns={4}
        />
      </Section>
    </>
  );
}

const meta = { title: 'Components/CircleGrid', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
