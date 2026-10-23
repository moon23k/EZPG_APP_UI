import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../__stories__/helpers';
import { OrderCard } from './order-card';

function Demo() {
  return (
    <>
      <Section title="새 주문 · 판매자 확인">
        <OrderCard
          orderNo="20261023-0012"
          status="paid"
          orderedAt="10월 23일 14:02"
          buyer="김민지"
          items={[
            { name: '장미 꽃다발', option: '중', quantity: 1 },
            { name: '메시지 카드', quantity: 1 },
          ]}
          total={42000}
          dueInDays={2}
          onPress={() => {}}
          actions={[
            { label: '주문 거절', onPress: () => {}, variant: 'ghost' },
            { label: '주문 확인', onPress: () => {}, variant: 'solid' },
          ]}
        />
      </Section>
      <Section title="부분 취소 · 반품 요청(기한 임박) · 구매 확정">
        <OrderCard
          orderNo="20261021-0007"
          status="partiallyCanceled"
          orderedAt="10월 21일 09:15"
          buyer="박서준"
          items={[
            { name: '꽃바구니', quantity: 1 },
            { name: '화병', quantity: 1 },
          ]}
          total={58000}
          canceledAmount={12000}
        />
        <OrderCard
          orderNo="20261019-0031"
          status="returnRequested"
          orderedAt="10월 19일 18:40"
          buyer="이하늘"
          items={[{ name: '튤립 다발', option: '대', quantity: 2 }]}
          total={76000}
          dueInDays={1}
        />
        <OrderCard
          orderNo="20261012-0002"
          status="confirmed"
          orderedAt="10월 12일 11:00"
          buyer="최유진"
          items={[{ name: '드라이플라워 리스', quantity: 1 }]}
          total={35000}
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Orders/OrderCard',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
