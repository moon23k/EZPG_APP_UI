import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Section } from '../../__stories__/helpers';
import { OptionEditor, type ProductOption } from './option-editor';

const initial: ProductOption[] = [
  { id: 's', name: 'S (85)', priceDelta: 0, active: true },
  { id: 'm', name: 'M (95)', priceDelta: 0, active: true },
  { id: 'l', name: 'L (105)', priceDelta: 3000, active: false },
  { id: 'wrap', name: '선물 포장 추가', priceDelta: 2000, active: true },
];

const withNotes: ProductOption[] = [
  {
    id: 'basic',
    name: '기본 구성',
    priceDelta: 0,
    active: true,
    note: '재고 24개',
  },
  {
    id: 'mini',
    name: '미니 사이즈',
    priceDelta: -1000,
    active: true,
    note: '재고 3개 · 곧 품절',
  },
  {
    id: 'set',
    name: '아주 긴 옵션 이름이 들어가면 한 줄에서 말줄임으로 잘립니다 세트 구성',
    priceDelta: 12000,
    active: false,
    note: '품절 · 입고 예정일이 정해지면 다시 판매할 수 있어요. 입고 알림 신청 12명',
  },
];

function Demo() {
  const [options, setOptions] = useState(initial);
  const [noted, setNoted] = useState(withNotes);
  return (
    <GestureHandlerRootView>
      <Section title="판매 중 · 품절(판매 중지)">
        <OptionEditor
          options={options}
          onOptionsChange={setOptions}
          onEdit={() => {}}
          onAdd={() => {}}
        />
      </Section>
      <Section title="보조 문구 · 할인 옵션 · 서버 반영">
        <OptionEditor
          options={noted}
          onOptionsChange={setNoted}
          onActiveChange={(id, active) =>
            setNoted((list) =>
              list.map((o) => (o.id === id ? { ...o, active } : o))
            )
          }
        />
      </Section>
    </GestureHandlerRootView>
  );
}

const meta = {
  title: 'Blocks/Product/OptionEditor',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
