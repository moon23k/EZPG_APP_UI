import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Row, Section } from '../../__stories__/helpers';
import { Switch } from './switch';

function Demo() {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  return (
    <>
      <Section title="interactive">
        <Row>
          <Switch
            value={on}
            onValueChange={setOn}
            accessibilityLabel="주문 알림"
          />
          <Switch
            value={off}
            onValueChange={setOff}
            accessibilityLabel="마케팅 알림"
          />
        </Row>
      </Section>
      <Section title="disabled">
        <Row>
          <Switch value onValueChange={() => {}} disabled />
          <Switch value={false} onValueChange={() => {}} disabled />
        </Row>
      </Section>
    </>
  );
}

const meta = { title: 'Components/Switch', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
