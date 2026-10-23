import { Divider } from '@ezpg/native-ui';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../__stories__/helpers';
import { InvoiceRow } from './invoice-row';

function Demo() {
  return (
    <Section title="완료 · 재시도 · 실패 · 부분 환불">
      <InvoiceRow
        kind="subscription"
        title="베이직 · 11월"
        amount={19900}
        date="10월 23일"
        status="paid"
        cardLast4="1234"
        onPress={() => {}}
      />
      <Divider inset={16} />
      <InvoiceRow
        kind="subscription"
        title="베이직 · 10월"
        amount={19900}
        date="9월 23일"
        status="retrying"
        failure="soft"
        nextRetry="10월 26일"
        graceDaysLeft={11}
        onPress={() => {}}
      />
      <Divider inset={16} />
      <InvoiceRow
        kind="credits"
        title="크레딧 100개"
        amount={11000}
        date="9월 2일"
        status="failed"
        failure="hard"
        cardLast4="9876"
        onPress={() => {}}
      />
      <Divider inset={16} />
      <InvoiceRow
        kind="proration"
        title="프로로 변경"
        amount={18700}
        date="8월 14일"
        status="partiallyRefunded"
        refundedAmount={6200}
        onPress={() => {}}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Billing/InvoiceRow',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
