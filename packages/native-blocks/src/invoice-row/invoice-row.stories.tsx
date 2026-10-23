import { Divider } from '@ezpg/native-ui';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../__stories__/helpers';
import { InvoiceRow } from './invoice-row';

function Demo() {
  return (
    <>
      <Section title="결제 실패">
        <InvoiceRow
          title="베이직 · 10월"
          amount={19900}
          status="failed"
          onChangePaymentMethod={() => {}}
          onRetry={() => {}}
          onPress={() => {}}
        />
        <InvoiceRow
          title="크레딧 100개"
          amount={11000}
          status="failed"
          onChangePaymentMethod={() => {}}
          onRetry={() => {}}
          retrying
        />
      </Section>
      <Section title="결제 완료 · 환불 · 부분 환불">
        <InvoiceRow title="베이직 · 11월" amount={19900} onPress={() => {}} />
        <Divider inset={16} />
        <InvoiceRow
          title="크레딧 50개"
          amount={6000}
          status="refunded"
          onPress={() => {}}
        />
        <Divider inset={16} />
        <InvoiceRow
          title="프로로 변경"
          amount={18700}
          status="refunded"
          refundedAmount={6200}
          onPress={() => {}}
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Billing/InvoiceRow',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
