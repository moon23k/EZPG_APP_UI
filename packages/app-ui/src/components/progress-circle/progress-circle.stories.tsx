import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Row, Section } from '../../__stories__/helpers';
import { ProgressCircle } from './progress-circle';

function Demo() {
  return (
    <Section title="size">
      <Row>
        <ProgressCircle size={24} />
        <ProgressCircle size={40} />
      </Row>
    </Section>
  );
}

const meta = {
  title: 'Components/ProgressCircle',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
