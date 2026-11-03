import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column, Section } from '../../__stories__/helpers';
import { ChipGroup } from '../chip-group/chip-group';
import { FieldGroup } from './field-group';

const items = [
  { value: 'dream', label: '꿈이 있는' },
  { value: 'new', label: '새로운' },
  { value: 'old', label: '전통 있는' },
];

function Demo() {
  const [first, setFirst] = useState<string[]>(['new']);
  const [second, setSecond] = useState<string[]>([]);
  return (
    <Section title="required · optional">
      <Column>
        <FieldGroup label="어떻게 시작했나요?" required>
          <ChipGroup
            multiple
            size="lg"
            variant="outline"
            items={items}
            value={first}
            onValueChange={setFirst}
          />
        </FieldGroup>
        <FieldGroup label="어떤 가게로 기억되고 싶나요?">
          <ChipGroup
            multiple
            size="lg"
            variant="outline"
            items={items}
            value={second}
            onValueChange={setSecond}
          />
        </FieldGroup>
      </Column>
    </Section>
  );
}

const meta = {
  title: 'Components/FieldGroup',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
