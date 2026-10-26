import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { demoProducts } from '../../__stories__/helpers';
import { OrderCard, OrderSection, orderStatusLabel } from './order-card';

const list = { gap: 24, maxWidth: 420 } as const;

function Demo() {
  return (
    <View style={list}>
      <OrderSection title={orderStatusLabel.paid} count={1}>
        <OrderCard
          items={[
            { name: demoProducts.shirt, option: 'M', quantity: 1 },
            { name: demoProducts.card, quantity: 1 },
          ]}
          total={42000}
          dueInDays={3}
          onPress={() => {}}
          actions={[
            { label: '거부', onPress: () => {} },
            { label: '접수', onPress: () => {}, variant: 'solid' },
          ]}
        />
      </OrderSection>
      <OrderSection title={orderStatusLabel.cancelRequested} count={1}>
        <OrderCard
          items={[
            { name: demoProducts.mug, quantity: 1 },
            { name: demoProducts.beans, quantity: 1 },
          ]}
          total={58000}
          dueInDays={0}
          onPress={() => {}}
          actions={[
            { label: '취소 거부', onPress: () => {} },
            { label: '취소 승인', onPress: () => {}, variant: 'solid' },
          ]}
        />
      </OrderSection>
      <OrderSection title={orderStatusLabel.shipping} count={2}>
        <OrderCard
          items={[{ name: demoProducts.notebook, option: '무지', quantity: 1 }]}
          total={38000}
          onPress={() => {}}
        />
        <OrderCard
          items={[{ name: demoProducts.towel, quantity: 2 }]}
          total={70000}
          onPress={() => {}}
        />
      </OrderSection>
    </View>
  );
}

const meta = {
  title: 'Blocks/Orders/OrderCard',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
