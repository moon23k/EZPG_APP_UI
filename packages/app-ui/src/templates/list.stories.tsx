import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Chip } from '../components/chip/chip';
import { OrderCard } from '../blocks/order-card/order-card';
import { SegmentedTabs } from '../components/segmented-tabs/segmented-tabs';
import { SearchGlyph } from '../internal/glyphs';
import { useTheme } from '../theme/theme-provider';
import { Phone, useStoryStyles } from '../__stories__/phone';
import { ListTemplate, type ListTemplateStatus } from './list-template';

type Order = {
  id: string;
  items: { name: string; option?: string; quantity: number }[];
  total: number;
  dueInDays?: number;
};

const orders: Order[] = [
  {
    id: '2026102800012',
    items: [
      { name: '린넨 오버핏 셔츠', option: 'L', quantity: 1 },
      { name: '패브릭 코스터 세트', quantity: 1 },
    ],
    total: 35000,
    dueInDays: 0,
  },
  {
    id: '2026102800011',
    items: [{ name: '머그컵', quantity: 2 }],
    total: 18000,
    dueInDays: 1,
  },
  {
    id: '2026102700009',
    items: [{ name: '원목 트레이', quantity: 1 }],
    total: 52000,
  },
  {
    id: '2026102700008',
    items: [{ name: '말차 원데이 클래스', option: '11/2 14시', quantity: 1 }],
    total: 45000,
  },
  {
    id: '2026102700007',
    items: [
      { name: '라탄 바구니', quantity: 1 },
      { name: '리넨 앞치마', quantity: 1 },
      { name: '코튼 행주', quantity: 1 },
    ],
    total: 41000,
  },
];

function Screen({
  status = 'ready',
  data = orders,
}: {
  status?: ListTemplateStatus;
  data?: Order[];
}) {
  const t = useTheme();
  const s = useStoryStyles();
  const [tab, setTab] = useState<'orders' | 'claims'>('orders');
  const pinned = data.filter((o) => o.dueInDays !== undefined);
  return (
    <Phone
      title="주문"
      tab="orders"
      action={<SearchGlyph color={t.colors.foreground} size={t.iconSize.md} />}
    >
      <ListTemplate
        status={status}
        data={data.filter((o) => o.dueInDays === undefined)}
        keyExtractor={(o) => o.id}
        filters={
          <>
            <SegmentedTabs
              items={[
                { value: 'orders', label: '주문' },
                { value: 'claims', label: '클레임 2' },
              ]}
              value={tab}
              onValueChange={setTab}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={s.row}>
                <Chip selected count={3}>
                  발송 대기
                </Chip>
                <Chip count={4}>배송 중</Chip>
                <Chip count={1}>입금 대기</Chip>
                <Chip>완료</Chip>
              </View>
            </ScrollView>
          </>
        }
        pinned={
          pinned.length ? (
            <View style={s.cards}>
              {pinned.map((o) => (
                <OrderCard
                  key={o.id}
                  items={o.items}
                  total={o.total}
                  dueInDays={o.dueInDays}
                  onPress={() => {}}
                />
              ))}
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={s.card}>
            <OrderCard
              items={item.items}
              total={item.total}
              onPress={() => {}}
            />
          </View>
        )}
        empty={{
          title: '발송할 주문이 없어요',
          action: { label: '상품 등록하기', onPress: () => {} },
        }}
        error={{ title: '주문을 불러오지 못했어요', onRetry: () => {} }}
      />
    </Phone>
  );
}

function Demo() {
  return <Screen />;
}

const meta = { title: 'Templates/3 목록', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
