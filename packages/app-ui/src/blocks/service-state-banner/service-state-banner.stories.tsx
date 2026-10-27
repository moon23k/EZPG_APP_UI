import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { ServiceStateBanner } from './service-state-banner';

function Demo() {
  return (
    <Section title="결제 실패 · 유예 · 정지 · 해지">
      <ServiceStateBanner state="paymentFailed" onAction={() => {}} />
      <ServiceStateBanner state="grace" daysLeft={3} onAction={() => {}} />
      <ServiceStateBanner state="suspended" onAction={() => {}} />
      <ServiceStateBanner state="closed" onAction={() => {}} />
      <ServiceStateBanner
        state="stopped"
        reason="상품 정보와 실제 판매 상품이 달라 확인이 필요해요. 상세 내용은 알림함에서 볼 수 있어요"
        onAction={() => {}}
      />
      <ServiceStateBanner state="stopped" />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Dashboard/ServiceStateBanner',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
