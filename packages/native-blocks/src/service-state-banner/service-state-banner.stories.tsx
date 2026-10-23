import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../__stories__/helpers';
import { ServiceStateBanner } from './service-state-banner';

function Demo() {
  return (
    <Section title="결제 실패 · 유예 · 정지 · 해지">
      <ServiceStateBanner
        state="paymentFailed"
        nextRetry="10월 26일"
        onAction={() => {}}
      />
      <ServiceStateBanner state="grace" daysLeft={3} onAction={() => {}} />
      <ServiceStateBanner state="suspended" onAction={() => {}} />
      <ServiceStateBanner state="closed" onAction={() => {}} />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Dashboard/ServiceStateBanner',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
