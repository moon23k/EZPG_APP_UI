import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { ClaimRow } from './claim-row';

function Demo() {
  return (
    <>
      <Section title="요청 · 기한 임박">
        <ClaimRow
          type="return"
          amount={38000}
          reason="상품 파손"
          dueInDays={1}
          onReject={() => {}}
          onApprove={() => {}}
          onPress={() => {}}
        />
        <ClaimRow
          type="exchange"
          amount={42000}
          reason="색상 변경"
          dueInDays={4}
          onReject={() => {}}
          onApprove={() => {}}
          onPress={() => {}}
        />
      </Section>
      <Section title="회수 중 · 완료">
        <ClaimRow
          type="return"
          status="collecting"
          amount={35000}
          reason="단순 변심"
          dueInDays={0}
          onPress={() => {}}
        />
        <ClaimRow
          type="cancel"
          status="completed"
          amount={58000}
          reason="단순 변심"
          onPress={() => {}}
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Orders/ClaimRow',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
