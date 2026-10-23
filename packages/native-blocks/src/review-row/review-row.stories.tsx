import { Divider } from '@ezpg/native-ui';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { sample, Section } from '../__stories__/helpers';
import { ReviewRow } from './review-row';

function Demo() {
  return (
    <Section title="사진 · 답글 · 숨김 · 이의신청">
      <ReviewRow
        author="김*지"
        rating={5}
        writtenAt="10월 22일"
        option="장미 꽃다발 (중)"
        content="사진보다 실물이 훨씬 예뻐요. 포장도 꼼꼼했어요!"
        photos={[sample(152, 200), sample(106, 200)]}
        onReply={() => {}}
        onHide={() => {}}
      />
      <Divider />
      <ReviewRow
        author="박*준"
        rating={4}
        writtenAt="10월 20일"
        content="배송이 하루 늦었지만 꽃은 싱싱했습니다."
        reply="불편을 드려 죄송해요. 다음엔 더 빨리 보내드릴게요."
        onReply={() => {}}
      />
      <Divider />
      <ReviewRow
        author="이*늘"
        rating={1}
        writtenAt="10월 18일"
        content="상품과 관계없는 광고 문구가 포함된 리뷰"
        hidden={{ reason: '광고 · 홍보' }}
        appeal="received"
        reported
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Orders/ReviewRow',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
