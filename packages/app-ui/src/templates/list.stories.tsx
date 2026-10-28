import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Chip } from '../components/chip/chip';
import { ListRow } from '../components/list-row/list-row';
import { SegmentedTabs } from '../components/segmented-tabs/segmented-tabs';
import { Text } from '../components/text/text';
import { SearchGlyph } from '../internal/glyphs';
import { useTheme } from '../theme/theme-provider';
import { Phone, useStoryStyles } from '../__stories__/phone';
import { ListTemplate, type ListTemplateStatus } from './list-template';

type Order = {
  id: string;
  title: string;
  meta: string;
  amount: string;
  deadline?: string;
};

const orders: Order[] = [
  {
    id: '2026102800012',
    title: '린넨 오버핏 셔츠 외 1건',
    meta: '2026102800012 · 김*지',
    amount: '35,000원',
    deadline: '오늘 발송 마감 14:00',
  },
  {
    id: '2026102800011',
    title: '머그컵 2개',
    meta: '2026102800011 · 박*준',
    amount: '18,000원',
  },
  {
    id: '2026102700009',
    title: '원목 트레이',
    meta: '2026102700009 · 최*린',
    amount: '52,000원',
  },
  {
    id: '2026102700008',
    title: '말차 원데이 클래스 · 11/2 14시',
    meta: '2026102700008 · 이*호 · 픽업',
    amount: '45,000원',
  },
  {
    id: '2026102700007',
    title: '라탄 바구니 외 2건',
    meta: '2026102700007 · 정*윤',
    amount: '41,000원',
  },
  {
    id: '2026102700006',
    title: '리넨 앞치마',
    meta: '2026102700006 · 한*수',
    amount: '27,500원',
  },
];

function Amount({ value }: { value: string }) {
  return (
    <Text variant="body" weight="semibold" style={useStoryStyles().tabular}>
      {value}
    </Text>
  );
}

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
  const pinned = data.filter((o) => o.deadline);
  return (
    <Phone
      title="주문"
      tab="orders"
      action={<SearchGlyph color={t.colors.foreground} size={t.iconSize.md} />}
    >
      <ListTemplate
        status={status}
        data={data.filter((o) => !o.deadline)}
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
        pinned={pinned.map((o) => (
          <ListRow
            key={o.id}
            overline={o.deadline}
            overlineTone="warning"
            title={o.title}
            description={o.meta}
            trailing={<Amount value={o.amount} />}
            chevron={false}
            onPress={() => {}}
            style={s.pinned}
          />
        ))}
        renderItem={({ item }) => (
          <ListRow
            title={item.title}
            description={item.meta}
            trailing={<Amount value={item.amount} />}
            chevron={false}
            onPress={() => {}}
          />
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
