import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Row, Section } from '../../__stories__/helpers';
import { ResultMark } from './result-mark';

function Demo() {
  return (
    <Section title="kind">
      <Row>
        <ResultMark kind="done" />
        <ResultMark kind="error" />
      </Row>
    </Section>
  );
}

const meta = {
  title: 'Components/ResultMark',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
