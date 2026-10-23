import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Column, Section } from '../../__stories__/helpers';
import { Price } from './price';

const meta = {
  title: 'Components/Price',
  component: Price,
  args: { value: 35000, originalValue: 42000 },
} satisfies Meta<typeof Price>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Column>
      <Section title="기본 · 할인">
        <Price value={35000} />
        <Price value={35000} originalValue={42000} />
      </Section>
      <Section title="variant">
        <Price value={1280000} variant="display" />
        <Price value={89000} variant="title" originalValue={99000} />
        <Price value={4500} variant="caption" />
      </Section>
    </Column>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
