import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Divider } from '../../components/divider/divider';
import { sample, Section } from '../../__stories__/helpers';
import { HiddenReviewsRow, ReviewRow, ReviewSummary } from './review-row';

function Demo() {
  return (
    <>
      <Section title="별점 요약">
        <ReviewSummary average={4.6} distribution={[92, 24, 6, 2, 4]} />
      </Section>
      <Section title="답글 · 답글 없음 · 사진 · 숨긴 리뷰">
        <ReviewRow
          author="박*준"
          rating={4}
          content="배송이 하루 늦었지만 꽃은 싱싱했습니다."
          reply="불편을 드려 죄송해요. 다음엔 더 빨리 보내드릴게요."
          onMore={() => {}}
        />
        <Divider />
        <ReviewRow
          author="김*지"
          rating={5}
          content="사진보다 실물이 훨씬 예뻐요."
          onReply={() => {}}
        />
        <Divider />
        <ReviewRow
          author="최*린"
          rating={5}
          content="포장도 꼼꼼했고 향이 오래가요."
          photos={[sample(152, 200), sample(106, 200)]}
          onReply={() => {}}
          onMore={() => {}}
        />
        <HiddenReviewsRow count={1} onShow={() => {}} />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Orders/ReviewRow',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
