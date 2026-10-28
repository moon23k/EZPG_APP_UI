import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
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
            { label: '판매 취소', onPress: () => {} },
            { label: '배송 준비', onPress: () => {}, variant: 'primary' },
          ]}
        />
      </OrderSection>
      <OrderSection title={orderStatusLabel.preparing} count={1}>
        <OrderCard
          items={[
            { name: demoProducts.mug, quantity: 1 },
            { name: demoProducts.beans, quantity: 1 },
          ]}
          total={58000}
          dueInDays={0}
          onPress={() => {}}
          actions={[
            { label: '송장 입력', onPress: () => {}, variant: 'primary' },
          ]}
        />
      </OrderSection>
      <OrderSection title={orderStatusLabel.shipped} count={2}>
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
      <OrderSection title={orderStatusLabel.completed}>
        <OrderCard
          items={[{ name: demoProducts.long, quantity: 1 }]}
          total={1280000}
          onPress={() => {}}
        />
      </OrderSection>
    </View>
  );
}

const orders = [
  { id: 'a', name: demoProducts.tumbler, total: 32000 },
  { id: 'b', name: demoProducts.dripBag, total: 15000 },
  { id: 'c', name: demoProducts.long, total: 89000 },
];

function SelectionDemo() {
  const [picked, setPicked] = useState<string[]>(['a']);
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  return (
    <View style={list}>
      <OrderSection title={orderStatusLabel.preparing} count={orders.length}>
        {orders.map((o) => (
          <OrderCard
            key={o.id}
            items={[{ name: o.name, quantity: 1 }]}
            total={o.total}
            selected={picked.includes(o.id)}
            onPress={() => toggle(o.id)}
            onLongPress={() => toggle(o.id)}
          />
        ))}
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

export const Selection: StoryObj<typeof meta> = {
  render: () => <SelectionDemo />,
};
