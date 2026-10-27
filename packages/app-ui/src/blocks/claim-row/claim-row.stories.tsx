import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { ClaimRow } from './claim-row';

const inDays = (n: number) => new Date(Date.now() + n * 86400000);

function Demo() {
  return (
    <>
      <Section title="진행 중 · 기한">
        <ClaimRow
          type="return"
          amount={38000}
          reason="상품 파손"
          dueAt={inDays(0)}
          onPress={() => {}}
        />
        <ClaimRow
          type="exchange"
          amount={42000}
          reason="색상 변경"
          dueAt={inDays(4)}
          onPress={() => {}}
        />
        <ClaimRow
          type="return"
          status="collecting"
          amount={35000}
          reason="단순 변심"
          dueAt={inDays(1)}
          onPress={() => {}}
        />
        <ClaimRow
          type="return"
          status="collected"
          amount={35000}
          dueAt={inDays(2)}
          onPress={() => {}}
        />
        <ClaimRow
          type="exchange"
          status="held"
          amount={42000}
          reason="회수 상품 확인 필요"
          dueAt={inDays(-1)}
          onPress={() => {}}
        />
      </Section>
      <Section title="종료">
        <ClaimRow
          type="cancel"
          status="completed"
          amount={58000}
          reason="단순 변심"
          onPress={() => {}}
        />
        <ClaimRow
          type="return"
          status="rejected"
          amount={21000}
          reason="사용 흔적"
          onPress={() => {}}
        />
        <ClaimRow type="cancel" status="withdrawn" amount={12000} />
      </Section>
      <Section title="긴 사유">
        <ClaimRow
          type="return"
          amount={1280000}
          reason="받은 상품의 색상이 상세 페이지 사진과 많이 달라서 반품을 요청합니다 포장도 일부 찢어져 있었어요"
          dueAt={inDays(3)}
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
