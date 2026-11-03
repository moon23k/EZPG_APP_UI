import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { SetupGuide } from './setup-guide';

function Demo() {
  return (
    <Section title="2 / 5">
      <SetupGuide
        title="개점 준비"
        steps={[
          { key: 'business', label: '사업자 정보', done: true },
          { key: 'shipping', label: '배송비', done: true },
          {
            key: 'payment',
            label: '결제 연동',
            done: false,
            onPress: () => {},
          },
          { key: 'cash', label: '현금영수증', done: false, onPress: () => {} },
          { key: 'plan', label: '구독', done: false, onPress: () => {} },
        ]}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/SetupGuide',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
