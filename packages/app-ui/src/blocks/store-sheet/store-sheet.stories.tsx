import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Button } from '../../components/button/button';
import {
  StoreHeader,
  StoreMark,
} from '../../components/page-header/store-header';
import { Section } from '../../__stories__/helpers';
import { BellGlyph } from '../../internal/glyphs';
import { StoreSheet } from './store-sheet';

const STORES = [
  { value: 'sto_1', name: '반품 많은 리빙샵', description: '대표 · f7-claims' },
  { value: 'sto_2', name: '바닷가 펜션', description: '대표 · f9-stay' },
  {
    value: 'sto_3',
    name: '팀으로 운영하는 스토어',
    description: '매니저 · f15-team',
  },
];

function Demo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('sto_1');
  const current = STORES.find((store) => store.value === value)!;
  return (
    <Section title="홈 머리 스토어 이름 ▾ → 전환 시트">
      <StoreHeader
        name={current.name}
        onPress={() => setOpen(true)}
        action={{
          icon: BellGlyph,
          label: '알림',
          badge: true,
          onPress: () => {},
        }}
      />
      <StoreHeader
        name="스토어 하나"
        action={{ icon: BellGlyph, label: '알림', onPress: () => {} }}
      />
      <StoreMark name="바닷가 펜션" size="lg" />
      <Button onPress={() => setOpen(true)}>시트 열기</Button>
      <StoreSheet
        open={open}
        onOpenChange={setOpen}
        stores={STORES}
        value={value}
        onValueChange={setValue}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Navigation/StoreSheet',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
