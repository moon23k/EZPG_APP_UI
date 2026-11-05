import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { MessageGlyph } from '../../internal/glyphs';
import { InboxRow } from './inbox-row';

function Demo() {
  return (
    <Section title="상품 문의 · 일반 문의 · 답변 끝남">
      <InboxRow
        title="린넨 테이블 매트"
        body="이 매트 세탁기에 돌려도 되나요?"
        meta="11일 지남"
        urgent
        unread
        onPress={() => {}}
      />
      <InboxRow
        title="일반 문의"
        icon={MessageGlyph}
        body="단체 주문하면 할인되나요? 50개 정도 생각 중이에요."
        meta="오늘까지"
        urgent
        unread
        onPress={() => {}}
      />
      <InboxRow
        title="세라믹 머그컵"
        body="머그컵 용량이 몇 ml인가요?"
        meta="답변 완료"
        onPress={() => {}}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Desk/InboxRow',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
