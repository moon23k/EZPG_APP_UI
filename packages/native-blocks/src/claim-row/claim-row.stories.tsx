import { Divider } from '@ezpg/native-ui';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../__stories__/helpers';
import { ClaimRow } from './claim-row';

function Demo() {
  return (
    <Section title="요청 · 회수 중 · 완료">
      <ClaimRow
        type="return"
        status="requested"
        orderNo="20261019-0031"
        reason="상품 파손"
        dueInDays={1}
        onPress={() => {}}
      />
      <Divider inset={16} />
      <ClaimRow
        type="exchange"
        status="collecting"
        orderNo="20261018-0004"
        reason="색상 변경"
        dueInDays={3}
        returnTracking={{ carrier: 'CJ대한통운', number: '6234-1029-8812' }}
        onPress={() => {}}
      />
      <Divider inset={16} />
      <ClaimRow
        type="cancel"
        status="completed"
        orderNo="20261017-0020"
        reason="단순 변심"
        onPress={() => {}}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Orders/ClaimRow',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
