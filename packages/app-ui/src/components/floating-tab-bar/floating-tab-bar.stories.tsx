import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column, Section } from '../../__stories__/helpers';
import { FloatingTabBar, type FloatingTabBarItem } from './floating-tab-bar';

type Key = 'home' | 'orders' | 'products' | 'desk' | 'menu';

const items: FloatingTabBarItem<Key>[] = [
  { key: 'home', label: '홈', icon: 'home' },
  { key: 'orders', label: '주문', icon: 'orders', badge: '신규 주문 1건' },
  { key: 'products', label: '상품', icon: 'products' },
  { key: 'desk', label: '응대', icon: 'desk' },
  { key: 'menu', label: '메뉴', icon: 'menu' },
];

const inline = { position: 'relative', left: 0, right: 0, bottom: 0 } as const;

function Demo() {
  const [home, setHome] = useState<Key>('home');
  const [orders, setOrders] = useState<Key>('orders');
  return (
    <Column>
      <Section title="홈 선택 · 주문 배지">
        <FloatingTabBar
          items={items}
          value={home}
          onValueChange={setHome}
          style={inline}
        />
      </Section>
      <Section title="주문 선택">
        <FloatingTabBar
          items={items}
          value={orders}
          onValueChange={setOrders}
          style={inline}
        />
      </Section>
    </Column>
  );
}

const meta = {
  title: 'Components/FloatingTabBar',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
