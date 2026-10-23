import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { OrderCard, OrderSection, orderStatusLabel } from './order-card';

const list = { gap: 24, maxWidth: 420 } as const;

function Demo() {
  return (
    <View style={list}>
      <OrderSection title={orderStatusLabel.paid} count={1}>
        <OrderCard
          items={[
            { name: '장미 꽃다발', option: '중', quantity: 1 },
            { name: '메시지 카드', quantity: 1 },
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
            { name: '꽃바구니', quantity: 1 },
            { name: '화병', quantity: 1 },
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
          items={[{ name: '튤립 다발', option: '대', quantity: 1 }]}
          total={38000}
          onPress={() => {}}
        />
        <OrderCard
          items={[{ name: '드라이플라워 리스', quantity: 2 }]}
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
