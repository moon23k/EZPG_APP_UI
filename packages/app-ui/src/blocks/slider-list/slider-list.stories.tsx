import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Section } from '../../__stories__/helpers';
import { SliderList } from './slider-list';

const axes = [
  {
    key: 'temperature',
    label: '온도',
    startLabel: '차가운',
    endLabel: '따뜻한',
  },
  { key: 'energy', label: '리듬', startLabel: '정적인', endLabel: '동적인' },
  {
    key: 'softness',
    label: '질감',
    startLabel: '단단한',
    endLabel: '부드러운',
  },
  { key: 'era', label: '시대감', startLabel: '클래식한', endLabel: '모던한' },
  { key: 'intensity', label: '강도', startLabel: '은은한', endLabel: '강렬한' },
];

function Demo() {
  const [values, setValues] = useState<Record<string, number>>({});
  return (
    <Section title="느낌 축">
      <SliderList
        items={axes}
        values={values}
        min={-2}
        max={2}
        onChange={(key, value) =>
          setValues((current) => ({ ...current, [key]: value }))
        }
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Onboarding/SliderList',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
