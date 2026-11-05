import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { StatusSteps } from './status-steps';

const STEPS = ['결제', '상품 준비', '배송 중', '배송 완료'];

function Demo() {
  return (
    <Section title="주문 진행 · 처음 · 중간 · 끝">
      <StatusSteps steps={STEPS} current={0} />
      <StatusSteps steps={STEPS} current={1} />
      <StatusSteps steps={STEPS} current={3} />
    </Section>
  );
}

const meta = {
  title: 'Components/StatusSteps',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
