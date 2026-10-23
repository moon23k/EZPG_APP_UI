import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column, Section } from '../../__stories__/helpers';
import { Text } from '../text/text';
import { ChipGroup } from './chip-group';

const status = [
  { value: 'all', label: '전체' },
  { value: 'paid', label: '결제완료' },
  { value: 'shipping', label: '배송중' },
  { value: 'done', label: '배송완료' },
] as const;

const moods = [
  { value: 'warm', label: '따뜻한' },
  { value: 'calm', label: '차분한' },
  { value: 'bold', label: '대담한' },
  { value: 'cute', label: '귀여운' },
  { value: 'premium', label: '고급스러운' },
  { value: 'natural', label: '자연스러운' },
] as const;

type Status = (typeof status)[number]['value'];
type Mood = (typeof moods)[number]['value'];

function Demo() {
  const [one, setOne] = useState<(typeof status)[number]['value'] | null>(
    'all'
  );
  const [many, setMany] = useState<Mood[]>(['warm']);
  return (
    <Column>
      <Section title="단일 선택">
        <ChipGroup<Status> items={status} value={one} onValueChange={setOne} />
      </Section>
      <Section title="다중 선택 · 최대 3개">
        <ChipGroup<Mood>
          multiple
          max={3}
          items={moods}
          value={many}
          onValueChange={setMany}
        />
        <Text variant="caption" tone="muted">
          {many.length}/3 선택
        </Text>
      </Section>
    </Column>
  );
}

const meta = { title: 'Components/ChipGroup', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
