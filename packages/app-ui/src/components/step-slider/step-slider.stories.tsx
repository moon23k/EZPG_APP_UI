import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column, Section } from '../../__stories__/helpers';
import { FieldGroup } from '../field-group/field-group';
import { StepSlider } from './step-slider';

const axes = [
  { key: 'temp', label: '온도', start: '차가운', end: '따뜻한' },
  { key: 'energy', label: '활기', start: '정적인', end: '동적인' },
  { key: 'soft', label: '부드러움', start: '단단한', end: '부드러운' },
];

function Demo() {
  const [values, setValues] = useState<Record<string, number>>({
    temp: 1,
    energy: -1,
    soft: 0,
  });
  return (
    <Section title="interactive">
      <Column>
        {axes.map((axis) => (
          <FieldGroup key={axis.key} label={axis.label}>
            <StepSlider
              value={values[axis.key] ?? 0}
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
  title: 'Components/StepSlider',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
