import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column, Section } from '../../__stories__/helpers';
import { FieldGroup } from '../field-group/field-group';
import { Slider } from './slider';

const axes = [
  { key: 'temp', label: '온도', start: '차가운', end: '따뜻한' },
  { key: 'energy', label: '활기', start: '정적인', end: '동적인' },
  { key: 'size', label: '크기', start: '작게', end: '크게' },
];

function Demo() {
  const [values, setValues] = useState<Record<string, number>>({
    temp: 0.7,
    energy: -1.3,
    size: 5.4,
  });
  return (
    <Section title="interactive">
      <Column>
        {axes.map((axis) => (
          <FieldGroup key={axis.key} label={axis.label}>
            <Slider
              value={values[axis.key] ?? 0}
              min={axis.key === 'size' ? 1 : -2}
              max={axis.key === 'size' ? 10 : 2}
              onChange={(v) => setValues({ ...values, [axis.key]: v })}
              startLabel={axis.start}
              endLabel={axis.end}
              accessibilityLabel={axis.label}
            />
          </FieldGroup>
        ))}
      </Column>
    </Section>
  );
}

const meta = {
  title: 'Components/Slider',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
