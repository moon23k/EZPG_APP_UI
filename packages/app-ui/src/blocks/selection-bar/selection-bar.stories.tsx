import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { SelectionBar } from './selection-bar';

function Demo() {
  return (
    <>
      <Section title="선택 중">
        <SelectionBar
          count={3}
          max={50}
          actionLabel="송장 입력"
          onAction={() => {}}
          onClear={() => {}}
        />
      </Section>
      <Section title="최대 건수 · 0건 · 비활성">
        <SelectionBar
          count={50}
          max={50}
          actionLabel="송장 입력"
          onAction={() => {}}
          onClear={() => {}}
        />
        <SelectionBar
          count={0}
          actionLabel="배송 준비"
          onAction={() => {}}
          onClear={() => {}}
        />
        <SelectionBar
          count={12}
          actionLabel="배송 준비"
          disabled
          onAction={() => {}}
          onClear={() => {}}
        />
      </Section>
      <Section title="긴 동작 이름">
        <SelectionBar
          count={1280}
          max={1000}
          actionLabel="선택한 주문 한 번에 배송 준비"
          onAction={() => {}}
          onClear={() => {}}
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Orders/SelectionBar',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
